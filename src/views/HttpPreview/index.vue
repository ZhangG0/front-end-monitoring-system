<template>
  <div class="container">
    <!-- 多列布局 -->
    <h1>接口概览</h1>
    <el-row class="container__row">
      <el-col :span="7" class="container__row__col" v-for="(item,index) in boxList" :key="item+index">
        <el-card class="container__card">
          <request-box 
            
            :key="item+index"
            :title="item.title"
            :num="item.num"
            :tips="item.tips"
          ></request-box>
        </el-card>
      </el-col>
      
    </el-row>
    <h1>HTTP监控详情</h1>
    <el-card class="details">
      <!-- <div slot="header">
        
      </div> -->
      <div class="content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="url" label="url" width="180">
            <template slot-scope="scope">
              <a :href="scope.row.url" class="content_url" @click.stop.prevent="visibleDialog(scope.row)">{{
                scope.row.url
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="method" label="方法"> </el-table-column>
          <el-table-column prop="status" label="状态码"> </el-table-column>
          <el-table-column prop="success" label="是否成功">
            <template slot-scope="scope">
              <div>{{ scope.row.success === true ? "是" : "否" }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="请求时长"> </el-table-column>
          <el-table-column prop="requesType" label="请求方式">
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      title="请求返回信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>{{row.response}}</span>
    </el-dialog>
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
      boxList: [{
        title: '接口请求总量',
        tips: '发起请求的总数量',
        num: 263
      },
      {
        title: '接口请求平均耗时',
        tips: '接口请求总时长累加/请求总数',
        num: 214.14
      },
      {
        title: '接口请求成功率',
        tips: '请求成功数/请求总数',
        num: '100%'
      }],
      dialogVisible: false,
      tableData: [
        {
          url: "http://www.baidu.com",
          method: "GET",
          status: "200",
          success: true,
          duration: 1800,
          requesType: "xhr",
          response: '你好，我是xxx'
        },
      ],
    row: {}
    };
  },
  methods: {
    visibleDialog(row){
      this.row = row;
      this.dialogVisible = true;
    }
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
  margin: 0;
  padding: 0;
  &__row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__col{
      width: calc((100% - 30px)/3);
      // padding: 0 12px 0 12px;
      margin-right: 0;
    }
    &__card {
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
  &_url{
    color: blue;
  }
}
</style>