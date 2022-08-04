<template>
  <el-container >
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-container >
      <el-aside width="200px" >
        <side-bar></side-bar>
      </el-aside>
      <el-main >
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  components: {
    SideBar,
    HeaderBar,
  },
};
</script>

