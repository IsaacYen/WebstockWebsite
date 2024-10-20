<script setup>
import { reactive, ref } from "vue";
import { getStaticsInfo } from "@/data/staticsInfo.js"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver";
import Echarts from "@/components/Echarts.vue";
//用户信息
const user = ref("jyz001")
//表格数据
const tableData = reactive({
  currentPage: 1,
  pageSize: 7,
  totalCount: 0,
  list: [

  ]
})
//从文件中获取数据
tableData.list = getStaticsInfo()
//数据对应关系
const DATA_MAP = ref([
  {
    name: "交易所",
    value: "ExchangeNo",
    isShow: true,
  },
  {
    isShow: true,
    name: "合约",
    value: "Contract"
  },
  {
    isShow: true,
    name: "多空",
    value: "BS"
  },
  {
    isShow: true,
    name: "手数",
    value: "Vol"
  },
  {
    isShow: true,
    name: "交易次数",
    value: "TradeNum"
  },
  {
    isShow: true,
    name: "盈利次数",
    value: "WinNum"
  },
  {
    isShow: true,
    name: "亏损次数",
    value: "LossNum"
  },
  {
    isShow: true,
    name: "最大盈利",
    value: "MaxWin"
  },
  {
    isShow: true,
    name: "最大亏损",
    value: "MaxLoss"
  },
  {
    isShow: true,
    name: "盈亏",
    value: "PL"
  },
  {
    isShow: true,
    name: "平均盈亏（单次）",
    value: "AVGPLPerCount"
  },
  {
    isShow: true,
    name: "平均盈亏（每手）",
    value: "AVGPLPerNum"
  },
])
const changeShow = (key) =>{
  DATA_MAP.value.forEach((item)=>{
    if(item.value==key){
      item.isShow = !item.isShow
    }
  })
}
//Top5 表头
const TOP_MAP = [
  {
    name: "编号",
    value: "NO"
  },
  // {
  //   name: "账号",
  //   value: "Name"
  // },
  {
    name: "手数",
    value: "Vol"
  },
  {
    name: "合约",
    value: "Contract"
  },
  {
    name: "盈亏",
    value: "PL"
  },
]
//top5信息
const topInfo = ref([
  [],
  [],
  [],
  [],
])
// top5 title
const topTitle = [
  "多头盈利TOP5",
  "空头盈利TOP5",
  "多头亏损TOP5",
  "空头亏损TOP5",
]
const computedData = ref([])
const getTopInfo = () => {

  computedData.value = getStaticsInfo()
  // computedData.value.forEach((item) => {
  //   item.Name = user.value
  // });
  computedData.value.sort((a, b) => b.PL - a.PL)
  for (let i = 0; i < computedData.value.length; i++) {
    if (computedData.value[i].BS == '多') {
      if (computedData.value[i].PL >= 0) {
        if (topInfo.value[0].length < 5) {
          computedData.value[i].NO = topInfo.value[0].length + 1
          topInfo.value[0].push(computedData.value[i])
        }
      }
    } else {
      if (computedData.value[i].PL >= 0) {
        if (topInfo.value[1].length < 5) {
          computedData.value[i].NO = topInfo.value[1].length + 1
          topInfo.value[1].push(computedData.value[i])
        }
      }
    }
  }
  for (let i = computedData.value.length - 1; i >= 0; i--) {
    if (computedData.value[i].BS == '多') {
      if (computedData.value[i].PL < 0) {
        if (topInfo.value[2].length < 5) {
          computedData.value[i].NO = topInfo.value[2].length + 1
          topInfo.value[2].push(computedData.value[i])
        }
      }
    } else {
      if (computedData.value[i].PL < 0) {
        if (topInfo.value[3].length < 5) {
          computedData.value[i].NO = topInfo.value[3].length + 1
          topInfo.value[3].push(computedData.value[i])
        }
      }
    }
  }
}
getTopInfo()
//TOP5 Echarts 图表信息 
const topOptions = ref([
  {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
         
          color: 'red',//字体颜色
          fontSize: 10//字体大小
        }
      }
    ],
    grid:{
      left:50,// 调整这个属性
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  },
  {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          color: 'red',//字体颜色
          fontSize: 10//字体大小
        }
      }
    ],
    grid:{
      left:50,// 调整这个属性
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  },
  {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          color: 'green',//字体颜色
          fontSize: 10//字体大小
        }
      }
    ],
    grid:{
      left:50,// 调整这个属性
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
    
  },
  {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          color: 'green',//字体颜色
          fontSize: 10//字体大小
        }
      }
    ],
    grid:{
      left:50,// 调整这个属性
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  },
])
const getTopOptions = () => {
  for (let i = 0; i <= 3; i++) {
    topOptions.value[i].xAxis.data = []
    topOptions.value[i].series[0].data = []
    topInfo.value[i].forEach((item) => {
      topOptions.value[i].xAxis.data.push(item.Contract)
      topOptions.value[i].series[0].data.push(item.PL)
    })
  }
}
getTopOptions()
//开关
const formSwitch = ref([])
//页码切换
const handleCurrentChange = (currentPage) => {
  tableData.currentPage = currentPage;
}
//导出excel表格
const exportExcel = (id) => {
  const wb = XLSX.utils.table_to_book(
    document.querySelector("#" + id)
  );
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "交易统计数据.xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
}
//根据交易所和合约种类筛选
const ExchangeNoFilter = ref([])
const ContractFilter = ref([])
const ExchangeNoFilterInfo = ref([])
const ContractFilterInfo = ref([])
const getFilterInfo = () => {
  ExchangeNoFilter.value = []
  ContractFilter.value = []
  tableData.list.forEach((item) => {
    if (!ExchangeNoFilter.value.includes(item.ExchangeNo)) {
      ExchangeNoFilter.value.push(item.ExchangeNo)
    }
    if (!ContractFilter.value.includes(item.Contract)) {
      ContractFilter.value.push(item.Contract)
    }
  })
  ExchangeNoFilterInfo.value = []
  ContractFilterInfo.value = []
  ExchangeNoFilter.value.forEach((item) => {
    const newItem = { text: item, value: item }
    ExchangeNoFilterInfo.value.push(newItem)
  })
  ContractFilter.value.forEach((item) => {
    const newItem = { text: item, value: item }
    ContractFilterInfo.value.push(newItem)
  })
}
getFilterInfo()
const filterExchangeNo = (value, row) => {
  return row.ExchangeNo == value
}
const filterContract = (value, row) => {
  return row.Contract == value
}

</script>

<template>
  <el-row>
    <template v-for="(item, index) in 4" :key="item">
      <el-col :span="6">
        <el-card class="small-card">
          <template #header>
            <div class="title">
              {{ topTitle[index] }}
              <el-switch v-model="formSwitch[index]" active-text="图表" inactive-text="列表" style="margin-left: auto;" />
            </div>
          </template>
          <template v-if="formSwitch[index]">
            <div style="margin-left: 10px;">
              <Echarts :chartStyle="{ width: '300px', height: '265px' }" :chartOption="topOptions[index]" />
            </div>
          </template>
          <template v-else>
            <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="topInfo[index]"
              style="width: 100%" highlight-current-row :max-height="700" :row-style="{ height: '45px' }">
              <template v-for="item in TOP_MAP">
                <el-table-column :prop="item.value" :label="item.name" v-if="item.value != 'PL'" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :prop="item.value" :label="item.name" v-else show-overflow-tooltip align="left">
                  <template #default="scope">
                    <span :style="{ color: (scope.row[item.value] >= 0 ? 'rgb(203,13,12)' : 'rgb(15,169,16)') }">
                      {{ scope.row[item.value].toFixed(2) }}
                    </span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </template>
        </el-card>
      </el-col>
    </template>
  </el-row>
  <el-card class="card">
    <template #header>
      <div class="title">
        <div class="front-title">
          <div>
            交易统计
          </div>
          <el-popover placement="right" trigger="click">
            <template #reference>
              <div class="new-button">
                可见选项
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </div>
            </template>
            <template #default>
              <template v-for="item in DATA_MAP">
                <div :class="{ show: item.isShow}" class="item" @click="changeShow(item.value)">
                  {{ item.name }}
                </div>
              </template>
            </template>
          </el-popover>
        </div>
        <el-button type="primary" @click="exportExcel('info')">
          导出Excel
        </el-button>
      </div>
    </template>
    <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="tableData.list" style="width: 100%"
      highlight-current-row :max-height="700" :row-style="{ height: '45px' }" id="info">
      <template v-for="item in DATA_MAP">
        <template v-if="item.isShow">
          <el-table-column :prop="item.value" :label="item.name" sortable :filters="ExchangeNoFilterInfo"
            :filter-method="filterExchangeNo" v-if="item.value == 'ExchangeNo'">
          </el-table-column>
          <el-table-column :prop="item.value" :label="item.name" sortable :filters="ContractFilterInfo"
            :filter-method="filterContract" v-else-if="item.value == 'Contract'">
          </el-table-column>
          <el-table-column :prop="item.value" :label="item.name" sortable
            v-else-if="item.value == 'MaxWin' || item.value == 'MaxLoss' || item.value == 'PL'">
            <template #default="scope">
              <span>
                {{ scope.row[item.value].toFixed(2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :prop="item.value" :label="item.name" sortable
            v-else-if="item.value != 'AVGPLPerCount' && item.value != 'AVGPLPerNum'">
          </el-table-column>
          <el-table-column :prop="item.value" :label="item.name" sortable align="right" v-else>
            <template #default="scope">
              <span :style="{ color: (scope.row[item.value] >= 0 ? 'rgb(203,13,12)' : 'rgb(15,169,16)') }">
                {{ scope.row[item.value].toFixed(2) }}
              </span>
            </template>
          </el-table-column>
        </template>
      </template>
      <template #empty>
        <div class="no-data">
          <el-empty description="暂无交易信息">
          </el-empty>
        </div>
      </template>
    </el-table>
    <div class="pagination" v-if="tableData.totalCount">
      <el-pagination background layout="prev,pager,next,slot" :total=tableData.totalCount
        @current-change="handleCurrentChange" :current-page="tableData.currentPage" :page-size="tableData.pageSize">
        <template #default>
          <span style="padding-left: 10px">总共有{{ tableData.totalCount }}条数据</span>
        </template>
      </el-pagination>
    </div>
  </el-card>
</template>

<style scoped>
.small-card {
  margin-left: 4%;
  margin-top: 20px;
  width: 92%;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.card {
  margin-left: 1%;
  margin-top: 20px;
  width: 98%;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .front-title {
      display: flex;

      .new-button {
        font-size: 13px;
        margin-left: 5px;
        color: white;
        background-color: rgb(108, 117, 125);
        cursor: pointer;
        line-height: 26px;
        width: 100px;
        height: 26px;
        text-align: center;
        border: 1px;
        border-radius: 5px;
        user-select:none;
      }

      .new-button:hover {
        background-color: rgb(90, 98, 104);
      }
    }


  }

  .pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.show {
  color: white;
  background-color: rgb(0,123,255);
}
.item {
  cursor: pointer;
  text-align: center;
  border: 1px;
  border-radius: 3px;
  user-select:none;
}
</style>
