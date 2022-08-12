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
export default {
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

    // 重写 fetch 方法
    if (window.fetch) {
      let _origin_fetch = window.fetch;
      window.fetch = function () {
        let startTime = Date.now();
        let args = [].slice.call(arguments);

        let fetchInput = args[0];
        let method = "GET";
        let url;

        if (typeof fetchInput === "string") {
          url = fetchInput;
        } else if (
          "Request" in window &&
          fetchInput instanceof window.Request
        ) {
          url = fetchInput.url;
          if (fetchInput.method) {
            method = fetchInput.method;
          }
        } else {
          url = "" + fetchInput;
        }

        if (args[1] && args[1].method) {
          method = args[1].method;
        }

        // TODO eagle check
        let fetchData = {
          method: method,
          url: url,
          status: null,
        };

        return _origin_fetch.apply(this, args).then(function (response) {
          fetchData.status = response.status;
          fetchData.type = "fetch";
          fetchData.duration = Date.now() - startTime;
          response = fetchData;
          return response;
        });
      };
    }
    //发送后的请求可以监控到
    fetch("https://autumnfish.cn/api/joke/")
      .then((response) => console.log(response))
      .then((data) => console.log(data));
  },
};
</script>

<style lang="scss" scoped>
.overview {
  height: 250px;
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