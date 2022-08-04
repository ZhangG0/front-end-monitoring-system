<template>
  <div class="container">
    <p class="minititle">异常数据统计</p>
    <el-card class="overview">

    </el-card>
    <div class="details" >
      <el-card>
        <p class="minititle">js错误详情列表</p>

      </el-card>
      <el-card>
        <p class="minititle">接口异常详情列表</p>
      </el-card>
      <el-card>
        <p class="minititle">白屏异常详情列表</p>
      </el-card>
      <el-card>
        <p class="minititle">资源异常详情列表</p>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
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

.minititle {
  margin: 0px 5px 15px 5px;
 

}

</style>
