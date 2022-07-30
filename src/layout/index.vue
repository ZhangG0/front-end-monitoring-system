<template>
  <div class="main">
    <div class="left">
      <SideBar />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>

<style>
@import "../style/index.scss";
</style>