<script setup>
import { reactive, ref } from "vue";
import {getMatchRecord} from "@/data/matchRecord.js"
import {getAllTotalVol} from "@/data/matchRecord.js"
import {getAllTotalTurnover} from "@/data/matchRecord.js"
import {getAllTotalMTMPL} from "@/data/matchRecord.js"
import {getAllTotalFee} from "@/data/matchRecord.js"
import {getAllTotalPremiumIO} from "@/data/matchRecord.js"
import {getAllTotalRecords} from "@/data/matchRecord.js"

const button1 = ref(true)
const tableData = reactive({
  currentPage: 1,
  pageSize: 7,
  totalCount: 0,
  list: [
  ]
})

tableData.list = getMatchRecord()
let AllTotalVol = getAllTotalVol()
let AllTotalTurnover = getAllTotalTurnover().toFixed(2)
let AllTotalMTMPL = getAllTotalMTMPL().toFixed(2)
let AllTotalFee = getAllTotalFee().toFixed(2)
let AllTotalPremiumIO = getAllTotalPremiumIO().toFixed(2)
let AllTotalRecords = getAllTotalRecords()

const DATA_MAP = [
  {
    name: "日期",
    value: "SubDateinfo"
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
    name: "买卖",
    value: "BS"
  },
  {
    name: "开平",
    value: "OC"
  },
  {
    name: "手数",
    value: "Vol"
  },
  {
    name: "成交价",
    value: "MatchPrice"
  },
  {
    name: "成交额",
    value: "Turnover"
  },
  {
    name: "平仓盈亏",
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
  },
]

//根据交易所和合约种类筛选
const ExchangeNoFilter = ref([])
const ContractFilter = ref([])
const ExchangeNoFilterInfo = ref([])
const ContractFilterInfo = ref([])
const getFilterInfo = () =>{
  ExchangeNoFilter.value = []
  ContractFilter.value = []
  tableData.list.flatMap(record => record.Detailed).forEach((item)=>{
    if(!ExchangeNoFilter.value.includes(item.ExchangeNo)){
      ExchangeNoFilter.value.push(item.ExchangeNo)
    }
    if(!ContractFilter.value.includes(item.Contract)){
      ContractFilter.value.push(item.Contract)
    }
  })
  ExchangeNoFilterInfo.value = []
  ContractFilterInfo.value = []
  ExchangeNoFilter.value.forEach((item)=>{
    const newItem = {text:item,value:item}
    ExchangeNoFilterInfo.value.push(newItem)
  })
  ContractFilter.value.forEach((item)=>{
    const newItem = {text:item,value:item}
    ContractFilterInfo.value.push(newItem)
  })
}

getFilterInfo()

const filterExchangeNo = (value, row)=> {
  return row.ExchangeNo==value
}

const filterContract = (value, row)=> {
  return row.Contract==value
}


</script>



<template>
  <el-card class="card">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-weight: bold; font-size: 1.5em;">
          <strong>成交记录</strong>
        </div>
        <div style="flex-grow: 1; text-align: center;">
            合计成交次数: {{ AllTotalRecords }}<span>&nbsp;&nbsp;&nbsp;</span>
            合计手数: {{ AllTotalVol }}<span>&nbsp;&nbsp;&nbsp;</span>
            合计成交额: {{ AllTotalTurnover }}<span>&nbsp;&nbsp;&nbsp;</span>
            合计平仓盈亏:
            <span :style="{ color: AllTotalMTMPL > 0 ? 'rgb(203,13,12)' : (AllTotalMTMPL < 0 ? 'rgb(15,169,16)' : '') }">
              {{ AllTotalMTMPL }}
            </span><span>&nbsp;&nbsp;&nbsp;</span>
            合计手续费: {{ AllTotalFee }}<span>&nbsp;&nbsp;&nbsp;</span>
            合计权益金收支:
            <span :style="{ color: AllTotalPremiumIO > 0 ? 'rgb(203,13,12)' : (AllTotalPremiumIO < 0 ? 'rgb(15,169,16)' : '') }">
              {{ AllTotalPremiumIO }}
            </span>
        </div>
        <el-switch
          v-model="button1"
          active-text="按日期汇总"
          inactive-text="逐条显示"
        />
      </div>
    </template>


    <div>
      <template v-if="button1">

        <el-table :data="tableData.list" style="width: 100%" highlight-current-row :max-height="700" :row-style="{ height: '45px' }" >
        <el-table-column type="expand">
          <template #default="props">
            <br>
            <div style="flex-grow: 1; text-align: justify; display: flex; flex-wrap: wrap; gap: 20px;">
                <div style="position: absolute; left: 0; flex-basis: 100%; margin-bottom: 10px;">
                    合计成交次数: {{ props.row.TotalRecords }}
                </div>
                <div style="position: absolute; left: 15%; flex-basis: 100%; margin-bottom: 10px;">
                    合计手数: {{ props.row.TotalVol }}
                </div>
                <div style="position: absolute; left: 30%; flex-basis: 100%; margin-bottom: 10px;">
                    合计成交额: {{ props.row.TotalTurnover }}
                </div>
            </div>
            <br><br>
            <div>
                <div style="position: absolute; left: 0; flex-basis: 100%; margin-bottom: 10px;">
                    合计平仓盈亏:
                    <span :style="{ color: props.row.TotalMTMPL > 0 ? 'rgb(203,13,12)' : (props.row.TotalMTMPL < 0 ? 'rgb(15,169,16)' : '') }">
                      {{ props.row.TotalMTMPL }}
                    </span>
                </div>
                <div style="position: absolute; left: 15%; flex-basis: 100%; margin-bottom: 10px;">
                    合计手续费: {{ props.row.TotalFee }}
                </div>
                <div style="position: absolute; left: 30%; flex-basis: 100%; margin-bottom: 10px;">
                    合计权益金收支:
                    <span :style="{ color: props.row.TotalPremiumIO > 0 ? 'rgb(203,13,12)' : (props.row.TotalPremiumIO < 0 ? 'rgb(15,169,16)' : '') }">
                      {{ props.row.TotalPremiumIO }}
                    </span>
                </div>
            </div>
            <br>
            <div>
              <h3>详细成交记录</h3>
              <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="props.row.Detailed" stripe>
                <template v-for="item in DATA_MAP" :key="item.value">
                  <el-table-column :prop="item.value" :label="item.name" sortable :filters="ExchangeNoFilterInfo" :filter-method="filterExchangeNo"
                    v-if="item.value == 'ExchangeNo' ">
                  </el-table-column>
                  <el-table-column :prop="item.value" :label="item.name" sortable :filters="ContractFilterInfo" :filter-method="filterContract"
                    v-else-if="item.value == 'Contract' ">
                  </el-table-column>
                  <el-table-column :prop="item.value" :label="item.name" sortable v-else>
                    <template #default="scope">
                      <span :style="{
                        color: (item.value === 'MTMPL' || item.value === 'PremiumIO') ? (scope.row[item.value] > 0 ? 'rgb(203,13,12)' :
                        (scope.row[item.value] < 0 ? 'rgb(15,169,16)':'')) :
                        ((scope.row[item.value] === '买' || scope.row[item.value] === '开') ? 'rgb(203,13,12)' : 
                        ((scope.row[item.value] === '卖' || scope.row[item.value] === '平') ? 'rgb(15,169,16)' :''))
                      }">
                      {{ scope.row[item.value] }}
                      </span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="日期" prop="Dateinfo" />
        </el-table>
        
      </template>

      <template v-else>

        <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="tableData.list.flatMap(record => record.Detailed)" style="width: 100%" highlight-current-row :max-height="700" :row-style="{ height: '45px' }" stripe>
          <template v-for="item in DATA_MAP" :key="item.value">
            <el-table-column :prop="item.value" :label="item.name" sortable :filters="ExchangeNoFilterInfo" :filter-method="filterExchangeNo"
              v-if="item.value == 'ExchangeNo' ">
            </el-table-column>
            <el-table-column :prop="item.value" :label="item.name" sortable :filters="ContractFilterInfo" :filter-method="filterContract"
              v-else-if="item.value == 'Contract' ">
            </el-table-column>
            <el-table-column :prop="item.value" :label="item.name" sortable v-else>
              <template #default="scope">
                <span :style="{
                  color: (item.value === 'MTMPL'|| item.value === 'PremiumIO') ? (scope.row[item.value] > 0 ? 'rgb(203,13,12)' :
                  (scope.row[item.value] < 0 ? 'rgb(15,169,16)':'')) :
                  ((scope.row[item.value] === '买' || scope.row[item.value] === '开') ? 'rgb(203,13,12)' : 
                  ((scope.row[item.value] === '卖' || scope.row[item.value] === '平') ? 'rgb(15,169,16)' :''))
                }">
                {{ scope.row[item.value] }}
                </span>
              </template>
            </el-table-column>
          </template>
        </el-table>

      </template>
    </div>

  </el-card>
</template>

<style scoped>
.card{
    margin-left: 1%;
    margin-top: 20px;
    width: 98%;
}
</style>
