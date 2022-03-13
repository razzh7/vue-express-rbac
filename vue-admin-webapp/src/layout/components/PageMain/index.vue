<template>
  <div class="page-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 添加key解决多级菜单切换时无动画的问题 -->
      <router-view :key="this.$route.path"></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page-main {
  position: relative;
  min-height: calc(100vh - 84px);
  width: 100%;
  overflow: hidden; // 解决动画transfrom: translateX(-xx) 导致浏览器出现上下滚动条
}
</style>