<template>
  <div class="container">
    <el-card class="overview">
      <div slot="header">
        <span>流量数据统计</span>
      </div>
      <div class="traffic__data">
        <!-- 展示pv,uv统计的总数据 -->
        <div
          v-for="(item, index) in dataGroups"
          :key="item + index"
          class="traffic__data__item"
        >
          <div class="traffic__data__item__title">
            {{ item.title }}
          </div>
          <div class="traffic__data__item__number">
            {{ item.number }}
          </div>
          <div class="traffic__data__item__percent">
            较昨日
            <span
              class="font-percent"
              :style="item.percent >= 0 ? 'color:red;' : 'color:green;'"
            >
              {{ item.percent }}%</span>
          </div>
        </div>
      </div>
    </el-card>
    <div class="trendGraph">
      <el-row
        :gutter="20"
        type="flex"
        justify="space-around"
      >
        <el-col :span="10">
          <Echarts
            :width="500"
            :height="400"
            :echart-option="PvOption"
            title-name="页面总访问量"
            :title-date="0.9"
            :day="today"
            times="较前一天"
          >
            <div slot="explain" />
          </Echarts>
        </el-col>
        <el-col :span="10">
          <Echarts
            :width="500"
            :height="400"
            :echart-option="UvOption"
            title-name="网页总访问量"
            :title-date="0.9"
            :day="today"
            times="较前一天"
          >
            <div slot="explain" />
          </Echarts>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script src="./index.js"></script>
<style src="./indexStyle.scss" lang="scss" scoped></style>