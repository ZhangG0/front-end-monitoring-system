<template>
  <div class="container">
    <p class="miniTitle">
      异常数据统计
    </p>
    <el-card class="overview" />
    <div class="details">
      <el-card>
        <div class="miniTitle">
          <div>
            <span class="title">
              JS异常监控大屏
            </span>
            <span
              class="titleDetails"
              @click="toDetail('JSErrorDetail')"
            >详情</span>
          </div>
        </div>

        <Echarts
          :width="430"
          :height="300"
          :day="today"
          times="较前一周"
          :echart-option="echartOption.JSErrorEchartOption"
          :title-date="rateData.JSErrorRate"
          :title-name="'JS异常错误'"
        >
          <div slot="explain">
            表示六种JS异常发生的数量
          </div>
        </Echarts>
      </el-card>
      <el-card>
        <div class="miniTitle">
          <span class="title">
            接口异常监控大屏
          </span>
        </div>
      </el-card>
      <el-card>
        <div class="miniTitle">
          <span class="title">
            白屏异常监控大屏
          </span>
        </div>
        <Echarts
          :width="430"
          :height="300"
          :day="today"
          times="较前一周"
          :echart-option="echartOption.WhiteScreenErrorEchartOption"
          :title-date="rateData.whiteScreenErrorRate"
          :title-name="'白屏异常'"
        >
          <div slot="explain">
            白屏异常通过监控根节点是否成功渲染来判断
          </div>
        </Echarts>
      </el-card>
      <el-card>
        <div class="miniTitle">
          <div>
            <span class="title">
              资源异常监控大屏
            </span>
            <span
              class="titleDetails"
              @click="toDetail('JSErrorDetail')"
            >详情</span>
          </div>
        </div>
        <Echarts
          :width="430"
          :height="300"
          :day="today"
          times="较前一周"
          :echart-option="echartOption.ResourcesErrorEchartOption"
          :title-date="rateData.ResourceErrorDataRate"
          :title-name="'资源异常错误'"
        >
          <div slot="explain">
            表示12小时内资源异常出现的的数量
          </div>
        </Echarts>
      </el-card> 
    </div>
    <!--    <img-->
    <!--      src="./Img_综合练习2/xx.jpg"-->
    <!--      alt="测试图片"-->
    <!--    >-->
  </div>
</template>

<script>

import {initJSErrorEchartsData} from "@/monitoringJS/JSErrorInitEchartsData";

import {initWhiteErrorEchartsData} from "@/monitoringJS/WhiteErrorInitEchartsData";
import dayjs from "dayjs";
import {arraySum} from "@/utils/common";
import service from "@/utils/request"
import axios from 'axios'

export default {
  name: "Error",
  data(){
    return{
      today:"",
      //平均数数据，用于计算右上角涨幅百分比
      rateData:{
        JSErrorRate:0,
        ResourceErrorDataRate:0,
        whiteScreenErrorRate:0,
        httpErrorRate:0
      },
      WhiteScreenEchartData:[],
      EchartsRequestData:[
        [
          {
            Type: "AA",
            time: "2022-8-7 06:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 06:11:12",
            errorType: "ReferenceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 07:11:12",
            errorType: "Error",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 08:11:12",
            errorType: "Error",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "TypeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "Error",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },        {
          Type: "AA",
          time: "2022-8-7 09:11:12",
          errorType: "TypeError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"null"
        },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 12:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 12:11:12",
            errorType: "ResourceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"./static/index.html"
          },        {
          Type: "AA",
          time: "2022-8-7 13:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"./static/index.html"
        },        {
          Type: "AA",
          time: "2022-8-7 14:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"./static/index.html"
        },        {
          Type: "AA",
          time: "2022-8-7 15:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"6666"
        },        {
          Type: "AA",
          time: "2022-8-7 16:11:12",
          errorType: "RangeError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:""
        },
        ],
        [
          {
            Type: "AA",
            time: "2022-8-7 05:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 06:11:12",
            errorType: "ReferenceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:""
          },
          {
            Type: "AA",
            time: "2022-8-7 07:11:12",
            errorType: "ResourceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"666"
          },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "ResourceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"./static/index.html"
          },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "TypeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 09:11:12",
            errorType: "Error",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },        {
          Type: "AA",
          time: "2022-8-7 10:11:12",
          errorType: "TypeError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"null"
        },
          {
            Type: "AA",
            time: "2022-8-7 11:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 11:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },          {
          Type: "AA",
          time: "2022-8-7 11:11:12",
          errorType: "RangeError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"null"
        },
          {
            Type: "AA",
            time: "2022-8-7 12:11:12",
            errorType: "RangeError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"null"
          },
          {
            Type: "AA",
            time: "2022-8-7 12:11:12",
            errorType: "ResourceError",
            browserName:"Chrome",
            path:"http://localhost:3000/home/test.html",
            src:"666"
          },        {
          Type: "AA",
          time: "2022-8-7 12:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"./static/index.html"
        },        {
          Type: "AA",
          time: "2022-8-7 14:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:""
        },
          {
          Type: "AA",
          time: "2022-8-7 16:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"./static/index.html"
        },
          {
          Type: "AA",
          time: "2022-8-7 16:11:12",
          errorType: "ResourceError",
          browserName:"Chrome",
          path:"http://localhost:3000/home/test.html",
          src:"./static/index.html"
        },
        ]
      ],
      echartOption: {
        JSErrorEchartOption:{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line"
            }
          },
          grid: {
            top: 50,
            bottom: 25,
          },
          legend: {},
          xAxis: [
            {
              type: 'category',
              axisLine:{
                lineStyle: {
                  color:'black'
                }
              },
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              // prettier-ignore
              data: []
            },
            {
              show:true,
              type: 'category',
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'gray'
                }
              },
              // prettier-ignore
              data:[]
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: '对照异常数',
              type: 'line',
              smooth: true,
              color: 'lightgray',
              emphasis: {
                focus: 'series'
              },
              data: []
            },

            {
              name: '今日异常数',
              type: 'line',
              smooth: true,
              color: '#409dfe',
              emphasis: {
                focus: 'series'
              },
              data: []
            },

          ]
        },
        ResourcesErrorEchartOption:{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line"
            }
          },
          grid: {
            top: 50,
            bottom: 25,
          },
          legend: {},
          xAxis: [
            {
              type: 'category',
              axisLine:{
                lineStyle: {
                  color:'black'
                }
              },
              axisTick: {
                show: true,
                alignWithLabel: true,
              },
              // prettier-ignore
              data: []
            },
            {
              show:true,
              type: 'category',
              axisTick: {
                show: true,
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'gray'
                }
              },
              // prettier-ignore
              data:[]
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '对照异常数',
              type: 'line',
              smooth: true,
              color: 'lightgray',
              emphasis: {
                focus: 'series'
              },
              data: []
            },

            {
              name: '今日异常数',
              type: 'line',
              smooth: true,
              color: '#409dfe',
              emphasis: {
                focus: 'series'
              },
              data: []
            },
          ]
        },
        WhiteScreenErrorEchartOption:{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line"
            }
          },
          grid: {
            top: 50,
            bottom: 25,
          },
          legend: {},
          xAxis: [
            {
              type: 'category',
              axisLine:{
                lineStyle: {
                  color:'black'
                }
              },
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              // prettier-ignore
              data: []
            },
            {
              show:true,
              type: 'category',
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'gray'
                }
              },
              // prettier-ignore
              data:[]
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: '对照异常数',
              type: 'line',
              smooth: true,
              color: 'lightgray',
              emphasis: {
                focus: 'series'
              },
              data: []
            },

            {
              name: '今日异常数',
              type: 'line',
              smooth: true,
              color: '#409dfe',
              emphasis: {
                focus: 'series'
              },
              data: []
            },

          ]
        }
      },
    }
  },
  computed:{
    watchJSErrorRate(){
      return this.echartOption.JSErrorEchartOption.series[1].data
    },
    watchResourcesErrorRate(){
      return this.echartOption.ResourcesErrorEchartOption.series[1].data
    },
    watchWhiteScreenErrorRate(){
      return this.echartOption.WhiteScreenErrorEchartOption.series[1].data
    }

  },
  watch:{
    //监控计算rate值
    watchJSErrorRate:{
      handler(newValue){
        this.rateData.JSErrorRate = Number(((arraySum(newValue)/arraySum(this.echartOption.JSErrorEchartOption.series[0].data)-1)*100).toFixed(2));
      },
      immediate: true,
      deep:true
    },
    watchResourcesErrorRate:{
      handler(newValue){
        this.rateData.ResourceErrorDataRate = Number(((arraySum(newValue)/arraySum(this.echartOption.ResourcesErrorEchartOption.series[0].data)-1)*100).toFixed(2));
      },
      immediate: true,
      deep:true
    },
    watchWhiteScreenErrorRate:{
      handler(newValue){
        this.rateData.whiteScreenErrorRate = Number(((arraySum(newValue)/arraySum(this.echartOption.WhiteScreenErrorEchartOption.series[0].data)-1)*100).toFixed(2));
      },
      immediate: true,
      deep:true
    },
    WhiteScreenEchartData: {
      handler(newValue){
        this.WhiteScreenEchartData=newValue;
        initWhiteErrorEchartsData(this.WhiteScreenEchartData,this.echartOption.WhiteScreenErrorEchartOption)
      },
      immediate: true
    }

  },
  mounted() {
    this.getWhiteScreenData();
    this.today = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    initJSErrorEchartsData(this.EchartsRequestData,this.echartOption);

  },
  created() {
    //手动计算rate值，但是现在watch监控了首次，不需要添加
    // this.rateData.JSErrorRate = ((arrayAverage(DataToday)/arrayAverage(DataBefore)-1)*100).toFixed(2) - 0;
    // this.rateData.ResourceErrorDataRate = ((arrayAverage(DataTodayResources)/arrayAverage(DataBeforeResources)-1)*100).toFixed(2) - 0;
    
  },
  methods:{
    toDetail(routerName){
      this.echartOption.JSErrorEchartOption.series[1].data = [0,0,1,0,0,0,0,0,0,0,0,0];
      this.echartOption.ResourcesErrorEchartOption.series[1].data = [1,50,1,1,1,1,0,1,2,2,2,2];
      console.log(routerName);
    },
    getWhiteScreenData() {
      axios.get("https://console-mock.apipost.cn/app/mock/project/16aefb06-d29a-4884-c2e2-8dd788f9f810/e")
      .then((res)=>{
        this.WhiteScreenEchartData=res.data;
      })
      
    }
  },
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
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: 20px;
  .el-card {
    min-width: 28%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 5px;
    justify-content: center;
  }
}
.miniTitle {
  text-align: center;
  vertical-align: bottom;
  margin: 0 5px 15px 5px;
  .title{
    font-size: x-large;
    font-weight: bolder;
  }
  .titleDetails{
    color: lightgray;
    float: right;
  }
  .titleDetails:hover{
    color: #409dfe;
    float: right;
    cursor: pointer;
  }
}


</style>
