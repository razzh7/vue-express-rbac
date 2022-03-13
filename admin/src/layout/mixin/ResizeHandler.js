import store from "@/store"

const WIDTH = 992
const { body } = document
export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSidebar', { withoutAnimation: false }) // 移动端切换菜单，关闭侧边栏
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    if(this.$_isMobile()) {
      store.dispatch('app/toggleDevice','mobile')
      store.dispatch('app/closeSidebar', { withoutAnimation: true }) // 移动端进入后台关闭菜单栏和主体内容区域的动画切换
    }
  },
  methods: {
    //mobile
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      const isMobile = this.$_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

      if(isMobile) {
        store.dispatch('app/closeSidebar', { withoutAnimation: true }) // 移动端切换菜单栏时，开启动画
      }
    }
  }
}
