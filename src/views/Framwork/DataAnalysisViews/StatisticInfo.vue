<template>
    <div class="static">
        <el-container>
            <el-header>
                <div style="display: flex;width: 100%">
                    <h1 style="width: 40%">{{header}}</h1>
                    <div style="margin-top: 20px;margin-left: 30px;display: flex">
                        <el-button text @click="dialogVisible = true" style="margin-bottom: 1px;color: darkblue;">
                            说明
                        </el-button>
                        <el-button text @click="exportExcel" style="color: darkblue;">导出为Excel</el-button>
                        <el-dialog v-model="dialogVisible" title="统计信息说明">
                            <p>统计信息是指运用统计方法处理对人类活动产生影响的以统计数据或资料形式表现的信息。它包括认识活动的一般统计信息、专业科学研究的统计信息和统计工作的统计信息三部分。统计信息是由企业和社会统计工作反映出来的资料和数据。</p>

                        </el-dialog>
                    </div>
                </div>
            </el-header>
            <hr style="margin: 2px"/>
            <el-main class="el-main">
                <div >
                    <el-table :data="tableData" stripe style="width: 100%" :cell-class-name="cellClass" id="educe-table">
                        <el-table-column prop="key" label="统计量" width="180" />
                        <el-table-column prop="value" label="统计数值" width="180" />

                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {getStatisticInfoData} from "@/data/DataAnalysisViewData/StatisticInfoData";
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import {getIndexData} from "@/data";
let tableData = getStatisticInfoData()
let data=getIndexData()
dataToTableData(data,tableData)
function dataToTableData(data,tableData){
    for (var i=0;i<tableData.length;i++){
        tableData[i].key=data.BillAnalysis.SetContent.Total[0].MoneyInfoCalItem[i].Item;
        tableData[i].value=data.Users[0].Info[0].Data.CFUser.MoneyInfoCal.Total[i].Item;
    }
}

export default {
    name: "StatisticInfo",
    data(){
        return {
            header:"统计信息",
            tableData:tableData,
            dialogVisible: false,
        }
    },
    methods: {
        cellClass({ row,column,}) {
            // console.log(row.value)
            if (column.property === 'value') {
                return row.value.split("")[0].localeCompare("-")===0 ? 'green' : 'red';
            }
        },
        exportExcel() {
            // 获取el-table的DOM元素
            const elTable = document.querySelector('#educe-table')
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

    }
}
</script>

<style>
.static{
    width: 33%;
    height:300px;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    margin: 10px;
}
.el-main {
    height: 220px;
    margin: 1px;
}
</style>
<style scoped>
.el-table ::v-deep .el-table__body tr {
    background-color: #e5e5e5;
}
</style>