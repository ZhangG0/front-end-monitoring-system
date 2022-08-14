<template>
  <div class="container">
    <!-- 多列布局 -->
    <el-row class="container__row">
      <el-col :span="8">
        <el-card class="container__card">
          <request-box
            title="接口请求总量"
            :num="263"
            tips="发起请求的总数量"
          ></request-box>
        </el-card>
      </el-col>
      <el-col :span="8" class="container__row__item">
        <el-card >
          <request-box
            title="接口请求总量"
            :num="263"
            tips="发起请求的总数量"
          ></request-box>
        </el-card>
      </el-col>
      <el-col :span="8" class="container__row__item">
        <el-card >
          <request-box
            title="接口请求总量"
            :num="263"
            tips="发起请求的总数量"
          ></request-box>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="details">
      <div slot="header">
        <span>HTTP监控详情</span>
      </div>
      <div class="content">
        <div class="httpList">
          <div
            class="httpList_item"
            v-for="(item, index) in httpList"
            :key="item + index"
          >
            <div class="httpList_item_url">{{ item.url }}</div>
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
import axios from "axios";
import requestBox from "./components/request-box.vue";
export default {
  components: {
    requestBox,
  },
  data() {
    return {
      httpList: [
        { url: "http://baidu.com" },
        { url: "http://baidu.com" },
        { url: "http://baidu.com" },
        { url: "http://baidu.com" },
      ],
    };
  },
  created() {
    /*     let orignOpen = XMLHttpRequest.prototype.open;
    function Myopen(method, url, async, username, password) {
      console.log("捕捉到xmlhttprequest.open");
      console.log(
        "request info need report-----",
        method,
        url,
        async,
        username,
        password
      );
      let startTime = Date.now();
      orignOpen.call(this, method, url, async, username, password);
      let that = this;
      that.addEventListener.call(that, "load", function (event) {
        let endTime = Date.now();
        let duration = endTime - startTime;
        console.log("捕捉到xmlhttprequest.load", duration);
        console.log(event);
      });
    }

    XMLHttpRequest.prototype.open = Myopen; */
    // axios.get("https://autumnfish.cn/api/joke/").then((response) => {
    //   console.log(response.data);
    // });
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__row {
    display: flex;
    justify-content: space-between;
    &__card{
      height: 120px !important;
    }
  }
}
.overview {
  // height: 250px;
  &_test {
    width: 100px;
    height: 100px;
  }
}

.details {
  margin-top: 20px;
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
    background-color: #f5f5f5;
  }
}
.httpDetails {
  margin-left: 100px;
}
</style>