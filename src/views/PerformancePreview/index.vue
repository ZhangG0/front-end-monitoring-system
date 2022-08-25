<template>
  <div class="container">
    <div class="title">
      <span class="mini-title">性能指标平均值</span>
      <el-select
        v-model="formDefault"
        class="m-2"
        placeholder="66"
        size="small"
        @change="flag = !flag"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-card class="part">
      <div class="head-content">
        <div class="head-counts">
          <label>FP 首次渲染耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="首次渲染, 表示浏览器从开始请求网站到屏幕渲染第一个像素点的时间(开始绘制body的时间点)"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceFp:weekAverage.performanceFp }}ms</span>
        </div>

        <div class="head-counts">
          <label>FCP 首次内容渲染耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="首次内容渲染,表示浏览器渲染出第一个DOM内容的时间(如果body带背景色，则FCP大于FP)"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceFcp:weekAverage.performanceFcp }}ms</span>
        </div>

        <div class="head-counts">
          <label>domReady DOM阶段渲染耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="DOM阶段渲染耗时"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceDomready:weekAverage.performanceDomready }}ms</span>
        </div>

        <div class="head-counts">
          <label>dnsTime DNS解析耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="DNS解析耗时, 可观察域名解析服务是否正常。 【如果浏览器没有进行DNS查询（比如使用了cache缓存或采用了持久连接），则dnsTime的值将为0】"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceDnstime:weekAverage.performanceDnstime }}ms</span>
        </div>

        <div class="head-counts">
          <label>response 响应数据传输耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="响应数据传输耗时, 观察网络是否正常"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceResponse:weekAverage.performanceResponse }}ms</span>
        </div>

        <div class="head-counts">
          <label>resources 资源加载耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="资源加载耗时, 观察文档流是否过大"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceResources:weekAverage.performanceResources }}ms</span>
        </div>

        <div class="head-counts">
          <label>firstPackage 首包时间耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="首包时间耗时, DNS解析到响应返回给浏览器第一个字节的时间"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performanceFirstpackage:weekAverage.performanceFirstpackage }}ms</span>
        </div>

        <div class="head-counts">
          <label>pageFull 页面完全加载耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="页面完全加载时间"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{ flag? todayAverage.performancePagefull:weekAverage.performancePagefull }}ms</span>
        </div>
      </div>
    </el-card>

    <span class="mini-title">性能走势</span>
    <el-card class="part">
      <div class="echarts-content">
        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="FP"
            :title-date="optionCompare.performanceFp"
            :week="weekSeries.performanceFp"
            :today="todaySeries.performanceFp"
          >
            <template #explain>
              首次渲染,
              表示浏览器从开始请求网站到屏幕渲染第一个像素点的时间(开始绘制body的时间点)
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="FCP"
            :title-date="optionCompare.performanceFcp"
            :week="weekSeries.performanceFcp"
            :today="todaySeries.performanceFcp"
          >
            <template #explain>
              首次内容渲染,表示浏览器渲染出第一个DOM内容的时间(如果body带背景色，则FCP大于FP)
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="domReady"
            :title-date="optionCompare.performanceDomready"
            :week="weekSeries.performanceDomready"
            :today="todaySeries.performanceDomready"
          >
            <template #explain>
              DOM阶段渲染耗时
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="dnsTime"
            :title-date="optionCompare.performanceDnstime"
            :week="weekSeries.performanceDnstime"
            :today="todaySeries.performanceDnstime"
          >
            <template #explain>
              DNS解析耗时, 可观察域名解析服务是否正常。
              【如果浏览器没有进行DNS查询（比如使用了cache缓存或采用了持久连接），则dnsTime的值将为0】
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="response"
            :title-date="optionCompare.performanceResponse"
            :week="weekSeries.performanceResponse"
            :today="todaySeries.performanceResponse"
          >
            <template #explain>
              响应数据传输耗时, 观察网络是否正常
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="resources"
            :title-date="optionCompare.performanceResources"
            :week="weekSeries.performanceResources"
            :today="todaySeries.performanceResources"
          >
            <template #explain>
              资源加载耗时, 观察文档流是否过大
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="firstPackage"
            :title-date="optionCompare.performanceFirstpackage"
            :week="weekSeries.performanceFirstpackage"
            :today="todaySeries.performanceFirstpackage"
          >
            <template #explain>
              首包时间耗时, DNS解析到响应返回给浏览器第一个字节的时间
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="pageFull"
            :title-date="optionCompare.performancePagefull"
            :week="weekSeries.performancePagefull"
            :today="todaySeries.performancePagefull"
          >
            <template #explain>
              页面完全加载时间
            </template>
          </Echart>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 我自己二次封装了Echarts，放在同级目录下，而且取名的时候换成Echart(少个s)，以免和全局注册的Echarts冲突
import Echart from "./echart.vue";
// import { performanceGET } from "@/utils/api.js";【已经换成this.$api.】
import { polling } from "@/utils/polling.js";
import { getAve, processData } from "./processData.js";

export default {
  components: { Echart },
  data() {
    return {
      options: [
        {
          value: "today",
          label: "今日",
        },
        {
          value: "week",
          label: "过去一周",
        },
      ],
      // 右上角选择器默认选中today
      formDefault: "today",
      // 选择器切换 “过去一周”和“今日” 的flag
      flag: true,

      // 上一周每日平均值
      weekSeries: {
        performanceFp: null,
        performanceFcp: null,
        performanceDomready: null,
        performanceDnstime: null,
        performanceResponse: null,
        performanceResources: null,
        performanceFirstpackage: null,
        performancePagefull: null,
      },
      // 今日数据
      todaySeries: {
        performanceFp: null,
        performanceFcp: null,
        performanceDomready: null,
        performanceDnstime: null,
        performanceResponse: null,
        performanceResources: null,
        performanceFirstpackage: null,
        performancePagefull: null,
      },
      // 周性能指标平均值
      weekAverage: {
        performanceFp: null,
        performanceFcp: null,
        performanceDomready: null,
        performanceDnstime: null,
        performanceResponse: null,
        performanceResources: null,
        performanceFirstpackage: null,
        performancePagefull: null,
      },
      // 今日性能指标平均值
      todayAverage: {
        performanceFp: null,
        performanceFcp: null,
        performanceDomready: null,
        performanceDnstime: null,
        performanceResponse: null,
        performanceResources: null,
        performanceFirstpackage: null,
        performancePagefull: null,
      },
      // 较前一周
      optionCompare: {
        performanceFp: null,
        performanceFcp: null,
        performanceDomready: null,
        performanceDnstime: null,
        performanceResponse: null,
        performanceResources: null,
        performanceFirstpackage: null,
        performancePagefull: null,
      },
      // 用于比较上一次轮询过来的数据
      dataFlag: {},
      timer: null,
    };
  },
  computed: {},
  watch: {
    // 当数据更新时，重新计算平均值和比较值
    todaySeries: {
      handler(newValue) {
        this.updateAve(this.todayAverage, newValue);
        this.updateCompare();
      },
    },
    weekSeries: {
      handler(newValue) {
        this.updateAve(this.weekAverage, newValue);
        this.updateCompare();
      },
    },
  },
  created() {
    // 记得要拿变量接收，否则不能清除掉这个循环；如果不清除，用户要是跳转到其他页面，setInterval会仍在循环！
    // this.getPerformance();
    this.timer = polling(this.getPerformance, 2000);
  },
  // 轮询的销毁要写在destroyed()里，写在beforeUnmount或者unmounted里，都不能 clearInterval() 掉！
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // get请求
    getPerformance() {
      this.$api
        .performanceGET()
        .then((res) => {
          console.log(
            "performanceGET轮询",
            JSON.stringify(this.dataFlag) !== JSON.stringify(res.data)
          );
          console.log(res);
          if (JSON.stringify(this.dataFlag) !== JSON.stringify(res.data)) {
            this.dataFlag = res.data;
            let data = processData(res.data);
            console.log(data.todaySeries);
            console.log(data.weekSeries);
            this.todaySeries = data.todaySeries;
            this.weekSeries = data.weekSeries;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更新平均值，将b中与a同属性名的属性赋值给a
    // Object.keys(a) 返回一个数组，数组元素为a对象中的全部属性名
    updateAve(a, b) {
      Object.keys(a).forEach((key) => {
        a[key] = getAve(b[key]);
      });
    },
    // 更新比较值
    updateCompare() {
      Object.keys(this.optionCompare).forEach((key) => {
        this.optionCompare[key] =
          (
            ((this.todayAverage[key] - this.weekAverage[key]) /
              this.weekAverage[key]) *
            100
          ).toFixed(2) - 0 || 0;
        // || 0 是为了防止dnsTime全为0导致 NaN 的情况
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0px 10px 0 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn:hover {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.btn {
  margin: 0 10px 0 10px;
  color: #657174;
  background: #ffffff;
  border-color: #dcdfe6;
}

.mini-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.part {
  margin-bottom: 20px;
}

.head-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.head-counts {
  flex: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  margin: 10px 0 10px 0;
}

.echarts-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: stretch;
}

.echarts-counts {
  flex: 50%;
  display: flex;
  justify-content: center;
}

.echarts {
  margin: 10px 0 10px 0;
}

.pageList {
  display: flex;
  flex-direction: column;

  &_item {
    margin: 5px 5px;
    padding: 15px 40px;
    background-color: #f5f5f5;
  }
}
</style>
