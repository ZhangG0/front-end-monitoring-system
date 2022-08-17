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
      <Echarts
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
      </Echarts>
      <Echarts
          :width="300"
          :height="350"
          :echart-option="whiteScreenOption"
          :title-date="0.9"
          title-name="资源异常"
      >
        <div slot="explain">
          白屏异常通过监控根节点是否成功渲染来判断
        </div>
      </Echarts>
      
    </div>
  </div>
</template>

<script>
import Echarts from '../../components/Echarts/index.vue';
import axios from 'axios'

export default {
    name: "Error",
    components: { Echarts },
    data() {
      return {
        curCounts: [820, 932, 901, 934, 1290, 1330, 1320],
        beforeCounts: [920, 1032, 401, 534, 1390, 1230, 1920],
        whiteScreenOption: {
          xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          
          series: [
            {
              data: [0, 0, 0, 0, 0, 0, 0],
              type: "line",
              areaStyle: {},
              stack: 'x'
            },
            {
              data: [0, 0, 0, 0, 0, 0, 0],
              type: "line",
              areaStyle: {},
              stack: 'y'
            },
          ],
        },
        
      }
    },
    methods: {
      async getData() {
        console.log("点击了按钮")
        const that=this;
        await axios.get('https://console-mock.apipost.cn/app/mock/project/16aefb06-d29a-4884-c2e2-8dd788f9f810/e')
        .then(function (response) {
          console.log(response);
          that.curCounts=response.data.curCounts
          that.beforeCounts=response.data.beforeCounts
          console.log("that.curCounts"+that.curCounts)
          that.whiteScreenOption.series[0].data=response.data.curCounts;
          that.whiteScreenOption.series[1].data=response.data.beforeCounts;
          console.log("that.whiteScreenOption.series[0]."+that.whiteScreenOption.series[0].data)
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log("this.curCounts"+this.curCounts)
        this.whiteScreenOption.series[0].data=this.curCounts;
        this.whiteScreenOption.series[1].data=this.beforeCounts;
      }
    },
    mounted() {
      this.getData;
      console.log("this.curCountshhhhhhhhh "+this.curCounts)
      this.whiteScreenOption.series[0].data=this.curCounts;
        this.whiteScreenOption.series[1].data=this.beforeCounts;
      
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
