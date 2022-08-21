<template>
  <div class="ringContainer">
    <div
      class="title"
      v-text="title"
    />
    <Ring
      :data="data"
      :color="color"
      style="height: 90%;min-width: 140px"
    />
  </div>
</template>

<script>
import Ring from "@/components/Ring";
export default {
  name: "JSRing",
  components: {Ring},
  props:{
    data: {
      type: Number,
      default(){
        return null;
      },
    },
    color: {
      type: String,
      default() {
        return "blue";
      }
    },
    title: {
      type: String,
      default(){
        return "异常";
      }
    }

  },
  data(){
    return{
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
  .ringContainer{
    height: 100%;
    display: inline-block;
  }
  .title{
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px lightgray solid;
    padding-bottom: 10px;
  }
</style>
