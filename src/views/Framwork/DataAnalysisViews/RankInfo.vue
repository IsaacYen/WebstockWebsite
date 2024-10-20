<template>
    <div id="rankInfo" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import {getRankInfoData} from "@/data/DataAnalysisViewData/RankInfoData";
import {getIndexData} from "@/data";

let valueType = getRankInfoData();
let data = getIndexData();
dataToValueType(data,valueType);

function dataToValueType(data,valueType){
    for (var i=0;i<valueType.length;i++){
        valueType[i].value=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].ClientEquity;
        valueType[i].MarketValue=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].MarketValue;
        valueType[i].date=data.Users[0].Info[0].Data.CFUser.ClientEquity.Total[i].date;
    }
}

export default {
    name: "RankInfo",
    mounted() {
        let myChart = echarts.init(document.getElementById('rankInfo'));
        let option = {
            title: {
                text: '权益图'
            },
            legend: {
                data: ['用户权益', '市值权益']
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: valueType.map(item=>item.date.split("2023")[1]),
                name:'日期',
                axisLine:{
                    lineStyle: {
                        color: '#000',
                        width: 2
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}万'
                },
                axisLine:{
                    lineStyle: {
                        color: '#000',
                        width: 2
                    }
                }
            },
            series: [
                {
                data: valueType.map(item => item.value/10000),
                type: 'line',
                name: '用户权益',
                lineStyle:{
                    color: 'blue'
                    },
                },
                {
                    data: valueType.map(item => item.MarketValue/10000),
                    type: 'line',
                    name: '市值权益',
                    lineStyle:{
                        color: 'red'
                    },
                }
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