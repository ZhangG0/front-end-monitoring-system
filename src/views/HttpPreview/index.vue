<template>
  <div class="container">
    <!-- 多列布局 -->
    <h1>接口概览</h1>
    <el-row class="container__row">
      <el-col
        :span="7"
        class="container__row__col"
        v-for="(item, index) in boxList"
        :key="item + index"
      >
        <el-card class="container__card">
          <request-box
            :key="item + index"
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
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          style="width: 100%; overflow-y: auto"
        >
          <el-table-column prop="requestmonitorUrl" label="url" width="300">
            <template slot-scope="scope">
              <a
                :href="scope.row.requestmonitorUrl"
                class="content_url"
                @click.stop.prevent="visibleDialog(scope.row)"
                >{{ scope.row.requestmonitorUrl }}</a
              >
            </template>
          </el-table-column>
          <el-table-column prop="requestmonitorMethod" label="方法">
          </el-table-column>
          <el-table-column prop="requestmonitorStatus" label="状态码">
          </el-table-column>
          <el-table-column prop="requestmonitorSuccess" label="是否成功">
            <template slot-scope="scope">
              <div>{{ scope.row.success === 1 ? "是" : "否" }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="requestmonitorDuration" label="请求时长">
          </el-table-column>
          <el-table-column prop="requestmonitorType" label="请求方式">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>

    <el-dialog title="请求返回信息" :visible.sync="dialogVisible" width="30%">
      <span>{{ resposeMessage }}</span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request.js";
import requestBox from "./components/request-box.vue";
import { polling } from  '@/utils/polling'
export default {
  components: {
    requestBox,
  },
  data() {
    return {
      boxList: [
        {
          title: "接口请求总量",
          tips: "发起请求的总数量",
          num: 263,
          key: "total",
        },
        {
          title: "接口请求平均耗时(ms)",
          tips: "接口请求总时长累加/请求总数",
          num: 214.14,
          key: "averageTime",
        },
        {
          title: "接口请求成功率",
          tips: "请求成功数/请求总数",
          num: "100%",
          key: "successRate",
        },
      ],
      dialogVisible: false,
      tableSize: 0,
      tableData: [
        {
          url: "http://www.baidu.com",
          method: "GET",
          status: "200",
          success: true,
          duration: 1800,
          requesType: "xhr",
          response: "你好，我是xxx",
        },
      ],
      row: {},
      timer: null,
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
    };
  },
  computed: {
    resposeMessage: function () {
      // `this` 指向 vm 实例
      return this.row.requestmonitorResponse
        ? this.row.requestmonitorResponse
        : "fetch请求无法获取到返回信息";
    },
  },
  methods: {
    visibleDialog(row) {
      this.row = row;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    calculateTime(arr, num, numType) {
      if (numType === 1) {
        let dutationall = arr.reduce(
          (pre, cur) => pre + cur.requestmonitorDuration,
          0
        );
        return (dutationall / num).toFixed(2);
      } else if (numType === 0) {
        let successItemLength = arr.filter(
          (item) => item.requestmonitorSuccess == 1
        ).length;
        return ((successItemLength / num) * 100).toFixed(2) + "%";
      }
    },
    handleProcessData() {
      request.get("request/httpRequest").then((res) => {
        let averageTime = this.calculateTime(res.data.today, res.data.total, 1);
        let rate = this.calculateTime(res.data.today, res.data.total, 0);
        this.boxList.find((item) => item.key == "total").num =
          res.data.total || 0;
        this.boxList.find((item) => item.key == "averageTime").num =
          averageTime || 0;
        this.boxList.find((item) => item.key == "successRate").num =
          rate || "0%";

        this.tableData = res.data.today;
      });
    },
  },
  created() {
    // this.handleProcessData();
    this.timer = polling(this.handleProcessData)
  },
  destroyed(){
    clearInterval(this.timer)
  }
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
    &__col {
      width: calc((100% - 30px) / 3);
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
  &_url {
    color: blue;
  }
}
</style>