<script setup>
import { onBeforeMount, onMounted, reactive, ref, computed } from "vue";
import { getOffSetInfo } from "@/data/offsetRecord";
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import chat from './chat.vue'

let showChat = ref(false)


const exportToExcel = () => {
  let wb = XLSX.utils.book_new();

  for (let key in tableData) {
    let ws = XLSX.utils.json_to_sheet(tableData[key].Array);
    XLSX.utils.book_append_sheet(wb, ws, tableData[key].date);
  }
  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' });
  try {
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), 'output.xlsx');
  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout); }
  return wbout;
}

const classObject = (num) => {
  if (num < 0) {
    return { color: "red" };
  } else if (num === 0) {
    return { color: "#000000" };
  } else if (num > 0) {
    return { color: "#13ce66" };
  }
}

const input = ref('')
const select = ref('1')
const searchbyinput = () => {
  tableData.splice(0, tableData.length, ...getOffSetInfo())
  var r = false;
  if (select.value === '1') {
    input.value = input.value.replace(/\//g, '')
    tableData.forEach((item) => {
      if (item.date === input.value) {
        tableData.splice(0, tableData.length, item)
        r = true;
      }
    })
    if (r === false) {
      alert('没有找到该数据')
    }
  }
}




const formatDate = (dateNumber) => {
  const dateStr = String(dateNumber);
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}/${month}/${day}`;
}

const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计 共' + data.length / 2 + '条';
      return;
    }
    if (column.property === 'price') {
      sums[index] = '';
      return;
    }
    const values = data.map(item => parseFloat(item[column.property]));
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = parseFloat(curr).toFixed(2);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
      if (column.property === 'Fee' || column.property === 'AccumPL' || column.property === 'MTMPL') {
        sums[index] = sums[index].toFixed(2);
      }
    } else {
      sums[index] = '';
    }
  });
  return sums;
}


const tableData = reactive(getOffSetInfo());


const DATA_MAP = [
  {
    name: "日期",
    value: "OpenDate"
  },
  {
    name: "交易所",
    value: "ExchangeNo"
  },
  {
    name: "合约",
    value: "Contract"
  },
  {
    name: "买入",
    value: "buy"
  },
  {
    name: "卖出",
    value: "sell"
  },
  {
    name: "手数",
    value: "Vol"
  },
  {
    name: "价格",
    value: "price"
  },
  {
    name: "逐笔平仓盈亏",
    value: "AccumPL"
  },
  {
    name: "盯市平仓盈亏",
    value: "MTMPL"
  },
  {
    name: "手续费",
    value: "Fee"
  },
  {
    name: "投保",
    value: "Hedge"
  },
  {
    name: "权利金收支",
    value: "PremiumIO"
  }
]




</script>

<template>
  <el-card class="card">
    <template #header>
      <span>平仓记录</span>
      <span style="float: right">
        <el-container>
                      <div class="searchbox">
                      <el-input
                        v-model="input"
                        placeholder="请输入内容"
                        class="input-with-select"
                      >
                        <template #prepend>
                          <el-select v-model="select" placeholder="选择" style="width: 75px">
                            <el-option label="日期" value="1" />
                          </el-select>
                        </template>
                        <template #append>
                          <el-button :icon="Search" @click="searchbyinput">搜</el-button>
                        </template>
                      </el-input>
                    </div>
          <el-button type="primary" class="button" @click="exportToExcel">导出excel</el-button>
        </el-container>

      </span>
    </template>


    <el-table :data="tableData" class="table">

      <el-table-column type="expand" class="expand-column">
        <template v-slot="props">
          <el-table class="tablelist" highlight-current-row :cell-style="cellStyle" :data="props.row.Array" stripe
            :show-header="false" show-summary :summary-method="getSummaries">
            <template v-for="item in DATA_MAP">
              <el-table-column :prop="item.value" :label="item.name" v-if="item.value === 'OpenDate'"></el-table-column>
              <el-table-column :prop="item.value" :label="item.name" align="center" v-else-if="item.value == 'AccumPL'">
                <template v-slot="scope">
                  <span :style="classObject(scope.row.AccumPL)"> 
                    <!-- <i
                      :class="scope.row.AccumPL < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                    ></i> -->
                    {{ scope.row.AccumPL }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :prop="item.value" :label="item.name" align="center" v-else-if="item.value == 'MTMPL'">
                <template v-slot="scope">
                  <span :style="classObject(scope.row.MTMPL)"> 
                    <!-- <i
                      :class="scope.row.AccumPL < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                    ></i> -->
                    {{ scope.row.MTMPL }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :prop="item.value" :label="item.name" align="center" v-else></el-table-column>
            </template>
          </el-table>

        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" sortable :formatter="row => formatDate(row.date)" class="date-column" width="fit-content"></el-table-column>
      <template v-for="item in DATA_MAP">
        <el-table-column :label="item.name" v-if="item.value !== 'OpenDate'"></el-table-column>
      </template>

    </el-table>
  </el-card>
  <div class="circle-button" @click="() => showChat = !showChat">
    <img src="https://s1.4sai.com/src/img/png/04/048c1fd1ae5f4bfc8dda0043764b7575.png?imageMogr2/auto-orient/thumbnail/!132x132r/gravity/Center/crop/132x132/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:gJE-zhd8HUMg8z8YpmTMtzThvrY=" alt="在线客服">
  </div>
  <chat class="chat-window" v-if="showChat"></chat>
</template>

<style>
.card {
  margin-left: 1%;
  margin-top: 20px;
  width: 98%;
}

.expand-column .cell {
  padding: 0;
  width: 10px;
}

.table .el-table__header th {
  font-size: small;
  /* 你的字体大小 */
  color: black;
  font-weight: 540;
  background-color: rgb(235, 240, 245);
}

.table {
  font-size: 14px;
  /* 你的字体大小 */
  color: rgb(12, 136, 218);
  /* 你的字体颜色 */
}

.table .el-table__body-wrapper .cell {
  height: 17px;
  /* 你的行高 */
}

.tablelist {
  margin-top: -8px !important;
  margin-bottom: -8px !important;
  padding-bottom: 0px !important;

  font-size: smaller;
}


.tablelist .el-table__footer-wrapper .cell {
  font-weight: bold;
  font-size: small;
  height: 17px;
  
}

.last-row {
  /* background-color: rgb(15, 33, 56); */
}

.tablelist .el-table__row .cell {
  height: 16px;
  /* 你的行高 */
}

.button {
  margin-top: -5px;
  margin-right: 10px;
}

.searchbox {
  display: inline-block;
  margin-right: 80px;
  margin-top: -5px;
}

.circle-button {
  position: fixed;
  right: 5%;
  bottom: 10%;
  display: flex;
  width: 50px;
  height: 50px;
  background-color: rgb(220, 229, 247);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  z-index: 9999;  
}

.chat-window {
  position: fixed;
  right: 10%;
  bottom: 10%;

  width: 300px;
  height: 500px;
  background-color: rgb(220, 229, 247);
  
  border: 1px solid black; 
  line-height: 20px;
  z-index: 9990;
}


</style>
