<template>
  <div
    id="tooltip"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <slot />
    <div
      v-show="isShow"
      ref="contentRef"
      :style="{'--Xleft':el.x,'--Ytop':el.y}"
      class="content"
    >
      <slot
        name="content"
      />
    </div>
  </div>
</template>


<script src="./index.js"></script>
<style lang="scss" src="./indexStyle.scss" scoped />
