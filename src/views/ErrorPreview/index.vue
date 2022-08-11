<template>
  <div class="container">
    <p class="miniTitle">
      异常数据统计
    </p>
    <el-card class="overview" />
    <div class="details">
      <el-card>
        <p class="miniTitle">
          js错误详情列表
        </p>
      </el-card>
      <el-card>
        <p class="miniTitle">
          接口异常详情列表
        </p>
      </el-card>
      <el-card>
        <p class="miniTitle">
          白屏异常详情列表
        </p>
      </el-card>
      <el-card>
        <p class="miniTitle">
          资源异常详情列表
        </p>
      </el-card>
    </div>
<!--    <img-->
<!--      src="./Img_综合练习2/xx.jpg"-->
<!--      alt="测试图片"-->
<!--    >-->
  </div>
</template>

<script>

import {MyError} from "@/monitoringJS/JSErrorMonitor";

export default {
  name: "JsErrorPage",
  created() {
    throw new MyError('NewError');
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
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  height: 300px;
  .el-card {
    width: 230px;

  }
}

.miniTitle {
  margin: 0 5px 15px 5px;


}

</style>
