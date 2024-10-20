<template>
<!--    <h1>账户评级</h1>-->
    <div  class="chart">
        <div style="display: flex;height: 55px">
            <h2 style="width: 200px;margin-left: 20px">账户评级</h2>
            <el-button text @click="dialogVisible = true" style="margin-left: 100px;color: darkblue;margin-top: 20px">
                说明
            </el-button>

            <el-dialog v-model="dialogVisible" title="账户评级说明">
                <p>
                    理财账户评级通常是指对投资者的风险承受能力和投资偏好进行评估，以确定他们可以购买哪些类型的理财产品。是一个重要的投资指标。

                </p>

            </el-dialog>
        </div>
        <hr/>
        <div id="myChart" class="myChart"  :v-show="isShow"></div>
        <div id="myChart1" class="myChart" :v-show="isnShow"></div>
    </div>

</template>

<script>
import * as echarts from 'echarts';
import {getRightChartData} from "@/data/DataAnalysisViewData/RightChartData";
import {getIndexData} from "@/data";

let valueType = getRightChartData();
let data=getIndexData();
let isShow=true;
let isnShow=false;
dataToValueType(data,valueType);

function dataToValueType(data,valueType){
    for (var i=0;i<valueType.length;i++){
        valueType[i].value=data.Users[0].Info[0].Data.CFUser.Rating["Value"+i].toFixed(0);
    }
}

export default {
    name: "RightChart",
    data(){
        return {
            dialogVisible:false,
        }
    },
    mounted() {
        let myChart = echarts.init(document.getElementById('myChart'));
        let option = {
            radar: {
                // 雷达图的指示器，对应到每一项数据
                indicator:
                    valueType.map(item => ({ name: item.name + '(' + item.value + ')' }))

            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            series: [{
                name: '销量',
                type: 'radar',
                data: [
                    {
                        // value: [100,99,100,78,100],
                        // name: '数据名称'
                        value: valueType.map(item => item.value),
                        name: '数据名称',
                        itemStyle:{
                            color:"blue"
                        }
                    }
                ],

            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    },
}
</script>

<style scoped>
.chart{
    width: 33%;
    height:300px;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    margin: 10px;
}
.myChart{
    width: 100%;
    height:230px;
}
</style>