<template>
  <div class="container">
    <el-card class="overview">
      <div slot="header">
        <span class="mini-title">流量数据统计</span>
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
        justify="center"
      >
        <el-col :span="10">
          <Echarts
            :width="500"
            :height="400"
            :echart-option="PvOption"
            title-name="页面总访问量"
            :title-date="dataGroups[1].percent"
            :day="today"
            times="较前一天"
          >
            <div slot="explain">
              <div>Pv：一天内用户访问每一个网页的次数的总和</div>
            </div>
          </Echarts>
        </el-col>
        <el-col :span="10">
          <Echarts
            :width="500"
            :height="400"
            :echart-option="UvOption"
            title-name="网页总访问量"
            :title-date="dataGroups[0].percent"
            :day="today"
            times="较前一天"
          >
            <div slot="explain">
              <div>Uv：一天内多少用户访问这个网站的数</div>
            </div>
          </Echarts>
        </el-col>
      </el-row>
    </div>

    <div class="flex-box">
      <div
        v-for="(pageStop,index) in pageStopArr"
        :key="index"
        class="flex-box-item"
        :span="20"
      >
        <Echarts
          :width="400"
          :height="300"
          :echart-option="option(pageStop.pageData)"
          :title-name="pageStop.page"
          :title-date="pageStop.percent"
          :day="today"
          times="较前一天"
        >
          <div slot="explain">
            {{ pageStop.title }}
          </div>
        </Echarts>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>
<style src="./indexStyle.scss" lang="scss" scoped></style>