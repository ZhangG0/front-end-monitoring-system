<template>
  <div id="app">
    <div>123213</div>
    <div>
      <router-link to="./home">home</router-link>
      <router-link to="./foot">foot</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0078f0;
  margin-top: 60px;
}
</style>
