<!-- <script setup>
import { ref } from 'vue'

</script>

<template>
  <el-card class="card">
    期末持仓
  </el-card>
</template>

<style scoped>
.card{
    margin-left: 1%;
    margin-top: 20px;
    width: 98%;
}
</style> -->


<script setup> // 设置一个 Vue 组件的状态和行为。
import { reactive, ref } from "vue";  //reactive 用于创建响应式数据，ref 用于创建一个响应式的引用数据
import {getStaticsInfo} from "@/data/positionRecord.js" //获取一些静态数据。

//创建一个响应式对象 tableData，它包含了分页信息和列表数据。
const tableData = reactive({
  currentPage: 1,
  pageSize: 7,
  totalCount: 0,
  list: [
    
  ]
})
//从文件中获取数据
tableData.list = getStaticsInfo()

//数据对应关系，显示名称（name）映射到实际的数据字段（value）。
const DATA_MAP = [
  {
    name: "交易所",
    value: "ExchangeNo"
  },
  {
    name:"开仓日期",
    value:"OpenDate"
  },
  {
    name: "合约",
    value: "Contract"
  },
  {
    name:"买卖",
    value:"isBuy"
  },
  {
    name: "手数",
    value: "Vol"
  },
  {
    name: "价格",
    value: "Price"
  },
  {
    name: "浮动盈利",
    value: "FloatProfit"
  },
  {
    name: "盯市盈亏",
    value: "MarketProfit"
  },
  {
    name: "占用保证金",
    value: "Margin"
  },
  {
    name: "投保",
    value: "isHedge"
  },


]

//页码切换
const handleCurrentChange = (currentPage) => {
  tableData.currentPage = currentPage;
}

</script>  

// 显示一个带有分页的表格，表格的数据来源于 tableData.list，表格的列由 DATA_MAP 定义。

<template>
  <el-card class="card"> 
    <template #header>
      期末持仓
    </template>
    <el-table :data="tableData.list" style="width: 100%" highlight-current-row :max-height="700"
      :row-style="{ height: '45px' }">
      // 一个 Element UI 的表格组件，数据来源于 tableData.list，表格宽度为 100%，高亮当前行，最大高度为 700px，行高为 45px。

      <template v-for="item in DATA_MAP"> // 遍历 DATA_MAP 数组，为每个元素创建一个表格列

        // 如果当前元素的 value 不等于 'FloatProfit' 和 'MarketProfit'，则创建一个普通的表格列。
        <el-table-column :prop="item.value" :label="item.name"
          v-if="item.value != 'FloatProfit'&& item.value != 'MarketProfit' ">
        </el-table-column> 
        

        <el-table-column :prop="item.value" :label="item.name" v-else> 
          <template #default="scope">
            <span :style="{ color: (scope.row[item.value] >= 0 ? 'rgb(203,13,12)' : 'rgb(15,169,16)') }">
              {{ scope.row[item.value] }}
            </span>
          </template>
        </el-table-column>
      </template>
      //否则，创建一个自定义的表格列，列的内容根据 scope.row[item.value] 的值改变颜色。

      <template #empty>
        <div class="no-data">
          <el-empty description="暂无数据">
          </el-empty>
        </div>
      </template>

    </el-table>
    <div class="pagination" v-if="tableData.totalCount"> 
      // 如果 tableData.totalCount 的值为真（即，数据总数大于 0），则显示分页组件。

      // 当前页改变时，调用 handleCurrentChange 函数。
      <el-pagination background layout="prev,pager,next,slot" :total=tableData.totalCount
        @current-change="handleCurrentChange" :current-page="tableData.currentPage" :page-size="tableData.pageSize">
        <template #default>
          <span style="padding-left: 10px">总共有{{ tableData.totalCount }}条数据</span>
        </template>
      </el-pagination>
    </div>
  </el-card>
</template>

// 这些样式只应用于当前的 Vue 组件
<style scoped> 
.card {
  margin-left: 1%;
  margin-top: 20px;
  width: 98%;

  .pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
