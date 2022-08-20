<template>
  <div class="container">
    <p class="minititle">异常数据统计</p>
    <el-card class="overview">

    </el-card>
    <div class="details" >
      <Ring
        :data="ringData"
        :color="ringColor"
      >
      </Ring>
    </div>
  </div>
</template>

<script>
import Echarts from '../../components/Echarts/index.vue';

import Echart from "../PerformancePreview/echart.vue";

import Ring from '../../components/Ring/index.vue'

export default {
    name: "Error",
    components: { Echarts,Echart,Ring },
    data() {
      return {
        ringData: {
          value: 60.33
        },
        ringColor:" blue"
      }
    },
    methods: {
      
    },
    mounted() {
      
      
    },
    watch: {
      
    }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 20px 10px 0 10px;
 
}
.overview {
  display: flex;
  height: 180px;
}

.details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 20px;
  height: 300px;
  .el-card {
    width: 500px;
    height: 500px;
  }
}

.minititle {
  margin: 0px 5px 15px 5px;
 

}

</style>
