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
          <span class="value">{{ flag? weekAverage.fp:todayAverage.fp }}ms</span>
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
          <span class="value">{{ flag? weekAverage.fcp:todayAverage.fcp }}ms</span>
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
          <span class="value">{{ flag? weekAverage.domReady:todayAverage.domReady }}ms</span>
        </div>
        <div class="head-counts">
          <label>dnsTime DNS解析耗时
            <el-tooltip
              class="item"
              effect="dark"
              content="DNS解析耗时, 可观察域名解析服务是否正常"
              placement="top-start"
            >
              <span class="iconfont icon-wenhao" />
            </el-tooltip>
          </label>
          <span class="value">{{  flag? weekAverage.dnsTime:todayAverage.dnsTime}}ms</span>
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
          <span class="value">{{ flag? weekAverage.response:todayAverage.response }}ms</span>
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
          <span class="value">{{ flag? weekAverage.resources:todayAverage.resources }}ms</span>
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
          <span class="value">{{ flag? weekAverage.firstPackage:todayAverage.firstPackage }}ms</span>
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
          <span class="value">{{ flag? weekAverage.pageFull:todayAverage.pageFull }}ms</span>
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
            :title-date="optionCompare.fp"
            :week="weekSeries.fp"
            :today="todaySeries.fp"
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
            :title-date="optionCompare.fcp"
            :week="weekSeries.fcp"
            :today="todaySeries.fcp"
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
            :title-date="optionCompare.domReady"
            :week="weekSeries.domReady"
            :today="todaySeries.domReady"
          >
            <template #explain> DOM阶段渲染耗时 </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="dnsTime"
            :title-date="optionCompare.dnsTime"
            :week="weekSeries.dnsTime"
            :today="todaySeries.dnsTime"
          >
            <template #explain>
              DNS解析耗时, 可观察域名解析服务是否正常
            </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="response"
            :title-date="optionCompare.response"
            :week="weekSeries.response"
            :today="todaySeries.response"
          >
            <template #explain> 响应数据传输耗时, 观察网络是否正常 </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="resources"
            :title-date="optionCompare.resources"
            :week="weekSeries.resources"
            :today="todaySeries.resources"
          >
            <template #explain> 资源加载耗时, 观察文档流是否过大 </template>
          </Echart>
        </div>

        <div class="echarts-counts">
          <Echart
            class="echarts"
            title-name="firstPackage"
            :title-date="optionCompare.firstPackage"
            :week="weekSeries.firstPackage"
            :today="todaySeries.firstPackage"
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
            :title-date="optionCompare.pageFull"
            :week="weekSeries.pageFull"
            :today="todaySeries.pageFull"
          >
            <template #explain> 页面完全加载时间 </template>
          </Echart>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 我自己二次封装了Echarts，放在同级目录下，而且取名的时候换成Echart(少个s)，以免和全局注册的Echarts冲突
import Echart from "./echart.vue";
export default {
  components: { Echart },
  data() {
    return {
      options: [
        {
          value: "week",
          label: "过去一周",
        },
        {
          value: "today",
          label: "今日",
        },
      ],
      // 右上角选择器默认选中week
      formDefault: "week",
      // 选择器切换 “过去一周”和“今日” 的flag
      flag: true,

      // 下面这些都是自己写的假数据：
      // 后端传来的上一周每日平均值
      weekSeries: {
        fp: [150.5, 230.1, 224.7, 218.8, 135.4, 147.3, 260.23],
        fcp: [150, 100, 200, 218, 100, 147, 200],
        domReady: [100, 150, 200, 250, 200, 150, 100],
        dnsTime: [1, 2, 0, 3, 2, 0, 1],
        response: [23, 62, 12, 28, 10, 47, 20],
        resources: [78, 97, 69, 100, 120, 103, 98],
        firstPackage: [150, 100, 150, 218, 200, 130, 190],
        pageFull: [200, 230, 210, 260, 270, 260, 250],
      },
      // 后端传来的今日最近七条数据
      todaySeries: {
        fp: [170.5, 210.7, 214.4, 230.9, 111.1, 178.2, 220.3],
        fcp: [100, 150, 200, 234, 200, 150, 100],
        domReady: [231, 356, 213, 221, 113, 221, 321],
        dnsTime: [4, 2, 2, 1, 0, 3, 5],
        response: [26, 32, 52, 38, 20, 43, 24],
        resources: [68, 47, 63, 110, 180, 113, 93],
        firstPackage: [120, 120, 160, 213, 250, 133, 150],
        pageFull: [220, 240, 289, 223, 240, 262, 262],
      },
      // 周性能指标平均值
      weekAverage: {
        fp: 1,
        fcp: 2,
        domReady: 3,
        dnsTime: 4,
        response: 6,
        resources: 6,
        firstPackage: 6,
        pageFull: 6,
      },
      // 今日性能指标平均值
      todayAverage: {
        fp: 9,
        fcp: 9,
        domReady: 9,
        dnsTime: 9,
        response: 5,
        resources: 6,
        firstPackage: 7,
        pageFull: 8,
      },
      // 较前一周
      optionCompare: {
        fp: -16,
        fcp: 5,
        domReady: 9,
        dnsTime: -7,
        response: 12,
        resources: -5,
        firstPackage: -8,
        pageFull: 3,
      },
    };
  },
  computed: {},
  watch: {
    weekSeries: {
      handler(newValue) {
        this.updateAve(this.weekAverage, newValue);
        console.log(this.weekAverage, 6);
        this.updateCompare();
      },
    },
    todaySeries: {
      handler(newValue) {
        this.updateAve(this.todayAverage, newValue);
        console.log(this.todayAverage, 7);
        this.updateCompare();
      },
    },
  },
  created() {},
  mounted() {
    // setTimeout 模拟异步请求
    setTimeout(() => {
      this.weekSeries = {
        fp: [150.5, 230.1, 220.7, 210.8, 130.4, 140.3, 260.23],
        fcp: [15, 10, 20, 28, 10, 47, 20],
        domReady: [100, 150, 200, 250, 200, 150, 100],
        dnsTime: [1, 2, 0, 3, 2, 0, 1],
        response: [23, 62, 12, 28, 10, 47, 20],
        resources: [78, 97, 69, 100, 120, 103, 98],
        firstPackage: [150, 100, 150, 218, 200, 130, 190],
        pageFull: [200, 230, 210, 260, 270, 260, 250],
      };
      this.todaySeries = {
        fp: [152.5, 233.1, 221.7, 221.8, 133.4, 114.3, 236.23],
        fcp: [125, 120, 210, 28, 120, 47, 230],
        domReady: [10, 10, 20, 25, 20, 15, 10],
        dnsTime: [11, 23, 20, 13, 22, 10, 11],
        response: [23, 6, 2, 2, 10, 7, 20],
        resources: [78, 97, 69, 10, 12, 13, 98],
        firstPackage: [50, 10, 10, 18, 20, 10, 190],
        pageFull: [20, 23, 20, 20, 20, 60, 50],
      };
    }, 2000);
  },
  methods: {
    // 获取数组平均值，保留2位小数
    getAve(arr) {
      let sum = 0,
        ave = 0,
        i = 0;
      for (i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      ave = (sum / arr.length).toFixed(2) - 0;
      return ave;
    },
    // 更新平均值，将b中与a同属性名的属性赋值给a
    updateAve(a, b) {
      Object.keys(a).forEach((key) => {
        a[key] = this.getAve(b[key]);
      });
      // 以上代码取代了下面这一堆代码，有需要可以学习一下：
      // a.fp = this.getAve(b.fp);
      // a.fcp = this.getAve(b.fcp);
      // a.domReady = this.getAve(b.domReady);
      // a.dnsTime = this.getAve(b.dnsTime);
      // a.response = this.getAve(b.response);
      // a.resources = this.getAve(b.resources);
      // a.firstPackage = this.getAve(b.firstPackage);
      // a.pageFull = this.getAve(b.pageFull);
    },
    updateCompare() {
      Object.keys(this.optionCompare).forEach((key) => {
        this.optionCompare[key] =
          (
            ((this.todayAverage[key] - this.weekAverage[key]) /
              this.weekAverage[key]) *
            100
          ).toFixed(2) - 0;
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
