<template>
  <div class="navbar">
    <hamburger @toggleClick="toggleClick" :is-active="sidebar.opened" />
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <el-dropdown class="dropdown hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-container">
          <img class="avatar" :src="avatar">
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger"
import Breadcrumb from "@/components/Breadcrumb"
import { mapGetters } from "vuex"

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleClick() {
      this.$store.dispatch("app/toggleSideBar");
    },
    handleCommand(command) {
      if (command === 'loginOut') {
        this.loginOut()
      }
    },
    loginOut() {
      this.$store.dispatch('user/_loginOut').then(() => {
        this.$router.push({ path: '/login', query: { redirect: this.$route.fullPath }})
        this.$store.dispatch('viewtags/enptyTag')
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    // overflow: hidden;
  } 
  .right-menu {
    float: right;
    height: 50px;
    margin-right: 30px;

    .dropdown {
      position: relative;
      // margin-top: 5px;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      .avatar-container {
        width: 40px;
        height: 40px;
        margin-top: 5px;
        margin-left: 5px;
        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 30%;
        }
      }
      .el-icon--right {
        position: absolute;
        bottom: 5px;
        right: -18px;
      }
      &:hover {
        background: #F8F8F8;
      }
    }

    .hover-effect {
      cursor: pointer;
      transition: background .3s;
    }
  }
}
</style>