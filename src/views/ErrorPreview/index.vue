<template>
  <div class="container">
    <div class="miniTitle">
      <div>
        <div class="title">
          异常监控大屏
        </div>
        <span
          class="titleDetails"
          style="color: black;cursor: auto"
        >{{ today }}</span>
      </div>
    </div>
    <el-card
      v-if="RingView"
      class="overview"
    >
      <JSRing
        :data="RingData.TypeError"
        color="#409dfe"
        title="类型错误"
        class="ring"
      />
      <JSRing
        :data="RingData.ReferenceError"
        color="#409dfe"
        title="引用错误"
        class="ring"
      />
      <JSRing
        :data="RingData.RangeError"
        color="#409dfe"
        title="边界错误"
        class="ring"
      />
      <JSRing
        :data="RingData.URIError"
        color="#409dfe"
        title="URL错误"
        class="ring"
      />
      <JSRing
        :data="RingData.OtherError"
        color="#409dfe"
        title="其他错误错误"
        class="ring"
      />
    </el-card>

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
          :width="375"
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
          :width="375"
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
          :width="375"
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
import JSRing from "@/views/ErrorPreview/JSRing";
import {JSErrorGET, whiteScreenErrorGET} from "@/utils/api.js"

export default {
  name: "Error",
  components: {JSRing},
  data(){
    return{
      RingView:true,
      RingData:{
        TypeError: undefined,
        ReferenceError: undefined,
        RangeError: undefined,
        URIError: undefined,
        OtherError: undefined
      },
      RingColor:"blue",
      today:"",
      //平均数数据，用于计算右上角涨幅百分比
      rateData:{
        JSErrorRate:0,
        ResourceErrorDataRate:0,
        whiteScreenErrorRate:0,
        httpErrorRate:0
      },
      WhiteScreenEchartData:[],
      EchartsRequestData:[],
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
            bottom: 20,
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
            bottom: 20,
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
            bottom: 20,
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
    },
    EchartsRequestData: {
      handler(newValue){
        this.EchartsRequestData = newValue;
        initJSErrorEchartsData(this.EchartsRequestData,this.echartOption,this.RingData)
      },
      immediate: true
    },
    RingData:{
      handler(){
        this.RingView = false
        this.$nextTick(() => {
          this.RingView = true;
        });
      },
      deep:true
    }

  },
  mounted() {
    this.getEchartsData();
    this.today = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    // initJSErrorEchartsData(this.EchartsRequestData,this.echartOption,this.RingData);
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
    getEchartsData() {
      // axios.get("https://console-mock.apipost.cn/app/mock/project/16aefb06-d29a-4884-c2e2-8dd788f9f810/white")
      // .then((res)=>{
      //   console.log(res.data.data)
      //   this.WhiteScreenEchartData.push(res.data.data.today);
      //   this.WhiteScreenEchartData.push(res.data.data.seven)
      //   console.log(this.WhiteScreenEchartData)
      // })
      whiteScreenErrorGET().then((res)=>{
        this.WhiteScreenEchartData.push(res.data.today);
        this.WhiteScreenEchartData.push(res.data.seven);
      })
      JSErrorGET().then((res) => {
        this.EchartsRequestData.push(res.data.today);
        this.EchartsRequestData.push(res.data.seven);
      })
      // axios.get("https://console-mock.apipost.cn/app/mock/project/0bc9dcef-c9fe-438e-a463-34cd8ef3f59f//JSTest")
      //     .then((res) => {
      //       this.EchartsRequestData = res.data
      //     })

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
  flex-flow: row;
  height: 220px;
  text-align: center;

  .ring{
    width: 15%;
  }
}
.details {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: 20px;
  .el-card {
    min-width: 24%;
    max-width: 33%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 5px;
    justify-content: center;
  }
}
.miniTitle {
  text-align: center;
  vertical-align: bottom;
  margin: 0 5px 10px 5px;


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
