<template>
  <div class="container">
    <p class="minititle">异常数据统计</p>
    <el-card class="overview">

    </el-card>
    <div class="details" >
      
      <!-- <el-card>
        <p class="minititle">js错误详情列表</p>

      </el-card>
      <el-card>
        <p class="minititle">接口异常详情列表</p>
      </el-card>
      <el-card>
        <p class="minititle">白屏异常详情列表</p>
        <Echarts
          :width="400"
          :height="400"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="白屏异常"
        >
          <div slot="explain">
            白屏异常通过监控根节点是否成功渲染来判断
          </div>
        </Echarts>
      </el-card>
      <el-card>
        <p class="minititle">资源异常详情列表</p>
      </el-card> -->



      <!-- <Echarts
          :width="300"
          :height="350"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="JS异常"
      >
        <div slot="explain">
          白屏异常通过监控根节点是否成功渲染来判断
        </div>
      </Echarts>
      <Echarts
          :width="300"
          :height="350"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="接口异常"
      >
        <div slot="explain">
          白屏异常通过监控根节点是否成功渲染来判断
        </div>
      </Echarts>
      <button @click="getData()">点击</button>
      <Echarts
          :width="300"
          :height="350"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="白屏异常"
      >
        <div slot="explain">
          白屏异常通过监控根节点是否成功渲染来判断
        </div>
      </Echarts> -->

      <!-- <Echart
        class="echarts"
        title-name="白屏异常"
        :title-date="15"
        :week="whiteScreenWeekData"
        :today="whiteScreenTodayData"
      >
        <template #explain>
          首次渲染,
          表示浏览器从开始请求网站到屏幕渲染第一个像素点的时间(开始绘制body的时间点)
        </template>
      </Echart> -->

      <!-- <Echarts
          :width="300"
          :height="350"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="资源异常"
      >
        <div slot="explain">
          白屏异常通过监控根节点是否成功渲染来判断
        </div>
      </Echarts> -->
      <!-- <Ring
        :data="ringData"
        :color="ringColor"
      >
      </Ring> -->
    </div>
  </div>
</template>

<script>
import Echarts from '../../components/Echarts/index.vue';
import axios from 'axios'
import Echart from "../PerformancePreview/echart.vue";
import dataProcess from './dataProcess.js';
import Ring from '../../components/Ring/index.vue'

export default {
    name: "Error",
    components: { Echarts,Echart,Ring },
    data() {
      return {
        whiteScreenWeekData: [150.5, 230.1, 224.7, 218.8, 135.4, 147.3, 260.23],
        whiteScreenTodayData: [170.5, 210.7, 214.4, 230.9, 111.1, 178.2, 220.3],
        ringData: {
          value: 60.33
        },
        ringColor:" blue"
      }
    },
    methods: {
      getData() {
        const that=this;
        console.log("调用getData")
        axios.get('https://console-mock.apipost.cn/app/mock/project/16aefb06-d29a-4884-c2e2-8dd788f9f810/e')
        .then(function (response) {
          console.log(response);
          that.whiteScreenWeekData=response.data.weekData;
          that.whiteScreenTodayData=response.data.todayData;
          dataProcess(response.data.data);
          console.log("更新值：that.whiteScreenWeekData"+that.whiteScreenWeekData)
          console.log("更新值：that.whiteScreenTodayData"+that.whiteScreenTodayData)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    mounted() {
      this.getData();
      
    },
    watch: {
      // whiteScreenWeekData:{ 
      //   handler(newValue) {
      //     this.whiteScreenWeekData=newValue;
      //     console.log("watch里监听到变化")
      //   }
      // },
      // whiteScreenTodayData: {
      //   handler(newValue) {
      //     this.whiteScreenTodayData=newValue;
      //   }
      // }
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
