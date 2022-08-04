<template>
  <div class="container">
    <el-card class="overview">
      <div slot="header">
        <span>流量数据统计</span>
      </div>
      <div class="traffic__data">
        <!-- 展示pv,uv统计的总数据 -->
        <div
          class="traffic__data__item"
          v-for="(item, index) in dataGroups"
          :key="item + index"
        >
          <div class="traffic__data__item__title">{{ item.title }}</div>
          <div class="traffic__data__item__number">{{ item.number }}</div>
          <div class="traffic__data__item__percent">
            较昨日 {{ item.percent }}
          </div>
        </div>
      
      </div>
    </el-card>
    <div class="trendGraph">
      <el-row :gutter="20" >
        <el-col :span="8">
          <el-card>
            <p>PV趋势图</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <p>UV趋势图</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <p>用户平均停留时长趋势图</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataGroups: [
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}

.overview {
  height: 200px;
}
.traffic__data {
  display: flex;
  justify-content: space-evenly;
  &__item {
    padding: 0 8px 8px 8px;
    &__title {
      font-size: 13px;
      color: #666;
      
    }
    &__number {
      font-size: 20px;
      color: #363b52;
      padding: 10px 0px;
    }
  }
}
.trendGraph {
  display: flex;
  margin-top: 40px;
  .el-card {
    height:300px;
  }
  
}

.el-row {
  width: 100%;
  
}
</style>