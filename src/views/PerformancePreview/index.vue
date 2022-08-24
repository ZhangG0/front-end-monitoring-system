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
      <el-button
        icon="el-icon-refresh-right"
        size="mini"
        circle
        class="btn"
        @click="getPerformance"
      />
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
          <span class="value">{{ flag? todayAverage.fp:weekAverage.fp }}ms</span>
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
          <span class="value">{{ flag? todayAverage.fcp:weekAverage.fcp }}ms</span>
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
          <span class="value">{{ flag? todayAverage.domReady:weekAverage.domReady }}ms</span>
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
          <span class="value">{{ flag? todayAverage.dnsTime:weekAverage.dnsTime }}ms</span>
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
          <span class="value">{{ flag? todayAverage.response:weekAverage.response }}ms</span>
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
          <span class="value">{{ flag? todayAverage.resources:weekAverage.resources }}ms</span>
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
          <span class="value">{{ flag? todayAverage.firstPackage:weekAverage.firstPackage }}ms</span>
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
          <span class="value">{{ flag? todayAverage.pageFull:weekAverage.pageFull }}ms</span>
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
            <template #explain>
              DOM阶段渲染耗时
            </template>
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
            <template #explain>
              响应数据传输耗时, 观察网络是否正常
            </template>
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
            <template #explain>
              资源加载耗时, 观察文档流是否过大
            </template>
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
import { performanceGET } from "@/utils/api.js";
// import { polling } from "@/utils/polling.js";
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

      // 上一周数据
      weekSeries: {
        fp: null,
        fcp: null,
        domReady: null,
        dnsTime: null,
        response: null,
        resources: null,
        firstPackage: null,
        pageFull: null,
      },
      // 今日数据
      todaySeries: {
        fp: null,
        fcp: null,
        domReady: null,
        dnsTime: null,
        response: null,
        resources: null,
        firstPackage: null,
        pageFull: null,
      },
      // 周性能指标平均值
      weekAverage: {
        fp: null,
        fcp: null,
        domReady: null,
        dnsTime: null,
        response: null,
        resources: null,
        firstPackage: null,
        pageFull: null,
      },
      // 今日性能指标平均值
      todayAverage: {
        fp: null,
        fcp: null,
        domReady: null,
        dnsTime: null,
        response: null,
        resources: null,
        firstPackage: null,
        pageFull: null,
      },
      // 较前一周
      optionCompare: {
        fp: null,
        fcp: null,
        domReady: null,
        dnsTime: null,
        response: null,
        resources: null,
        firstPackage: null,
        pageFull: null,
      },
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
    // this.getPerformance();
    // polling(this.getPerformance, 3000);
  },
  mounted() {},
  methods: {
    // get请求
    getPerformance() {
      performanceGET()
        .then((res) => {
          console.log(
            "performanceGET轮询",
            JSON.stringify(this.dataFlag) !== JSON.stringify(res.data)
          );

          if (JSON.stringify(this.dataFlag) !== JSON.stringify(res.data)) {
            this.dataFlag = res.data;

            let data = processData(res.data);
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
