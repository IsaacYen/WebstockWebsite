<template>
    <div class="common-layout">
        <el-container>
            <el-header class="el-header">
                <div style="display: flex">
                    <h1 style="width: 200px">{{header}}</h1>
                    <el-button text @click="exportExcel" style="color: darkblue;margin-top: 20px;margin-left: 100px;">导出为Excel</el-button>
                </div>
            </el-header>
            <hr style="margin: 1px"/>
            <el-main class="el-main">
                <div >
                    <el-table :data="tableData" stripe :cell-class-name="cellStyle" id="el-table">
                        <el-table-column prop="key" label="资金指标" width="180" />
                        <el-table-column prop="value" label="指标数值" width="180" />
                    </el-table>
                </div>
            </el-main>
        </el-container>
        </div>
</template>

<script >
import {getFundInfoData} from "@/data/DataAnalysisViewData/FundInfoData";
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import {getIndexData} from "@/data";
let tableData =getFundInfoData();
let data=getIndexData();
dataToTableData(data,tableData);

function dataToTableData(data,tableData){
    for (var i=0;i<tableData.length;i++){
        tableData[i].key=data.BillAnalysis.SetContent.Total[0].MoneyItem[i].Item;
        tableData[i].value=data.Users[0].Info[0].Data.CFUser.Money.Total[0][i].Item;
    }
}


export default {
    data(){
        return {
            header:"资金信息",
            tableData:tableData
        }
    },
    methods: {
        cellStyle({ row,column,}) {

            console.log(row.value)
            if (column.property === 'value') {
                return row.value >= 0 ? 'red' : 'green';
            }
        },
        exportExcel() {
            // 获取el-table的DOM元素
            const elTable = document.querySelector('#el-table')
            // 检查元素是否存在
            if (elTable) {
                // 使用xlsx库将el-table转换为工作簿对象
                const wb = XLSX.utils.table_to_book(elTable)
                // 将工作簿对象写入二进制字符串
                const wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'array'
                })
                try {
                    // 使用file-saver库将二进制字符串保存为Excel文件
                    FileSaver.saveAs(
                        new Blob([wbout], { type: 'application/octet-stream' }),
                        'filename.xlsx'
                    )
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                }
                return wbout
            } else {
                console.log('Element not found')
            }
        },
    },

}
</script>

<style >
.common-layout {
    width: 33%;
    height: 300px;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    margin: 10px;

}

.el-main {
    height: 220px;
    margin: 1px;
}
.red {
    width: 100%;
    color: red;
}

.green {
    width: 100%;
    color: green;
}

</style>
<style scoped>
.el-table ::v-deep .el-table__body tr {
    background-color: #e5e5e5;
}
</style>
