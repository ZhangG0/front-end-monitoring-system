<template>
  <header id="header">
    <div class="l-content">
      <img
        class="logo"
        src="../../assets/images/logo.png"
      >
    </div>
    <div />
    <div class="r-content">
      <div class="select">
        <span>时间段:</span>
        <el-select
          v-model="times"
          placeholder="时间段选择"
          size="mini"
          @change="changeTimes"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-dropdown
        trigger="click"
        size="mini"
      >
        <!--下拉菜单-->
        <span> <img
          class="user"
          :src="userImg"
        ><!--动态绑定userImg--> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      times: "一周前",
      userImg: require("../../assets/images/user.png"),
      options: [
        {
          value: "前一周",
          label: "前一周",
        },
        {
          value: "前二周",
          label: "前二周",
        },
        {
          value: "前一天",
          label: "前一天",
        },
      ],
    };
  },
  methods:{
    changeTimes(){
    this.$bus.$emit('changeTimes',this.times)
    }
  }
};
</script>

<style scoped>
@import "../../style/headerBar.scss";
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select {
    margin-right: 25px;
    width: 300px;
}
</style>
