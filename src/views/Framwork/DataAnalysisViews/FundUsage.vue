<template>
    <div id="fundUsage" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import {getFundUsageData} from "@/data/DataAnalysisViewData/FundUsageData";
import {getIndexData} from "@/data";

let valueType = getFundUsageData();
let data = getIndexData();
dataToValueType(data,valueType);

function dataToValueType(data,valueType){
    for (var i=0;i<valueType.length;i++){
        valueType[i].rate=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].RiskDegree;
        valueType[i].date=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].date;
        valueType[i].value=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].ClientEquity;
        valueType[i].MarketValue=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].MarketValue;
    }
}

export default {
    name: "FundUsage",
    mounted() {
        let myChart = echarts.init(document.getElementById('fundUsage'));
        let option = {
            title: {
                text: '资金使用率'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            tooltip: {},
            legend: {
                data:["资金使用率",'权益']
            },

            xAxis: {
                type: 'category',
                data: valueType.map(item => item.date.split("2023")[1]),
                axisLine:{
                    lineStyle: {
                        color: '#000',
                        width: 2
                    },
                    symble:"line",
                }
            },
            yAxis: [{
                type: 'value',
                // name:'资金使用率',
                axisLabel: {
                    formatter: '{value}%',
                },
                axisLine:{
                    lineStyle: {
                        type:'dashed',
                        color: '#000',
                        width: 2
                    }
                }
            },
                {
                    type: 'value',
                    name:'权益',
                    axisLabel: {
                        formatter: '{value}万',
                    },
                    axisLine:{
                        lineStyle: {
                            color: '#000',
                            width: 2
                        }
                    }
                }],

            series: [{
                data: valueType.map(item => item.rate),
                type: 'bar',
                name: '资金使用率',
                itemStyle:{
                    color: '#ff4500'
                },
                yAxisIndex: 0,
            },
                {
                    data: valueType.map(item => item.value/10000),
                    type: 'line',
                    name: '权益',
                    itemStyle:{
                        color: 'blue'
                    },
                    yAxisIndex: 1,
                },
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
}
</script>

<style scoped>
.chart{
    width: 49.5%;
    height:300px;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    margin: 10px;
}
</style>