const state = {
  sidebar: {
    opened: localStorage.getItem('opened') ? !!+localStorage.getItem('opened') : true, // !!转化数字为布尔值(首次没有local值使用true意思更加符合open的意思)
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    // 若存在，open，设置open为1，反之设置0
    if(state.sidebar.opened) {
      localStorage.setItem('opened', 1)
    } else {
      localStorage.setItem('opened', 0)
    }
  },
  COLSE_SIDEBAR(state, { withoutAnimation }) {
    state.sidebar.opened = false // 控制菜单栏切换
    state.sidebar.withoutAnimation = withoutAnimation // 菜单栏和内容主体的动画控制（不加会导致移动端进入时产生菜单栏收缩的动画）
  },
  TOGGLE_DEVICE(state, device) {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }, playload) {
    commit('COLSE_SIDEBAR', playload)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}