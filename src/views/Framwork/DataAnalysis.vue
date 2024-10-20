<script >
// import { ref } from 'vue'
import FundInfo from "@/views/Framwork/DataAnalysisViews/FundInfo.vue";
import RightChart from "@/views/Framwork/DataAnalysisViews/RightChart.vue";
import StatisticInfo from "@/views/Framwork/DataAnalysisViews/StatisticInfo.vue";
import RankInfo from "@/views/Framwork/DataAnalysisViews/RankInfo.vue";
import FundUsage from "@/views/Framwork/DataAnalysisViews/FundUsage.vue";
export default {
    components:{
      FundInfo,
      StatisticInfo,
      RightChart,
      RankInfo,
      FundUsage,
    }
}
</script>

<template >
    <div class="flex-container">
      <FundInfo />
      <StatisticInfo />
      <RightChart />
    </div>
    <div class="flex-container">
      <RankInfo />
      <FundUsage />
    </div>
</template>

<style scoped>
.card{
    margin-left: 1%;
    margin-top: 20px;
    width: 98%;
    background-color: red;
}
.flex-container {
    display: flex;
    width: 100%;
}
</style>
