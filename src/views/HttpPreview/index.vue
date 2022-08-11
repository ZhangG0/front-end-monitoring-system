<template>
  <div class="container">
    <el-card class="overview">
      <div slot="header">
        <span>HTTP数据统计</span>
      </div>

    </el-card>

    <el-card class="details">
      <div slot="header">
        <span>HTTP监控详情</span>
      </div>
      <div class="content">
        <div class="httpList">
          <div class="httpList_item"
            v-for="(item, index) in httpList"
            :key="item + index">
            <div class="httpList_item_url">{{item.url}}</div>
          </div>
        </div>
        <div class="httpDetails">
            <p>请求链路</p>
            <p>返回信息</p>
        </div>

      </div>

    </el-card>


  </div>
</template>

<script>
export default {
  name,
  data() {
    return {
      httpList: [
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'}

      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.overview {
  height: 250px;
}

.details {
  margin-top: 20px
}
.content {
  display: flex;
}
.httpList {
  display: flex;
  flex-direction: column;
  &_item {
    margin: 5px 5px;
    padding: 15px 40px;
    background-color:#f5f5f5;
  }
}
.httpDetails {
  margin-left: 100px;
}
</style>
