<template>
  <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item 
            v-for="(item, index) in navList"
            :key="index">
            <!-- <span>{{ item.meta.title }}</span> -->
            <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  watch: {
    $route(route) {
      this.getNavList()
    }
  },
  data() {
    return {
      navList: null
    }
  },
  methods: {
    getNavList() {
      if(this.isDashboard(this.$route.path)) {
        this.navList = this.$route.matched.filter(item => item.meta && item.meta.title)
        return
      }
        this.navList = [{ path:'/', meta:{ title: '首页' }}].concat(this.$route.matched.filter(item => item.meta && item.meta.title))
    },
    isDashboard(item) {
      if(item.startsWith('/dashboard')) {
        return true
      }
        return false
    },
    handleLink(item) {
      const { path } = item
      this.$router.push(path).catch(()=>{})
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  float: left;
  height: 50px;
  .el-breadcrumb {
    height: 100%;
    line-height: 50px;
  }
}
</style>