<template>
  <header>
    <div class="l-content">
      <img
        class="logo"
        src="../../assets/images/logo.png"
      >
    </div>
    <div />
    <div class="r-content">
      <el-dropdown
        trigger="click"
        size="mini"
      >
        <!--下拉菜单-->
        <span> <img
            class="user"
            :src="userImg"
          >
          <!--动态绑定userImg-->
        </span>
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
    };
  },
  methods: {
    changeTimes() {
      this.$bus.$emit("changeTimes", this.times);
    },
  },
};
</script>

<style scoped>
@import "../../style/headerBar.scss";
</style>
