const state = {
  tagsList: []
}

const mutations = {
  ADD_TAGS(state, views) {
    const { title } = views.meta
    if(state.tagsList.some(t => t.title === title)) return /**防止标签切换时重复渲染 */
    state.tagsList.push(Object.assign({}, views, { title }))
  },
  REMOVE_TAG(state, tag) {
    const list = state.tagsList
    for(let i = 0; i < list.length; i++) {
      if (list[i].path === tag.path) {
        list.splice(i,1)
      }
    }
    state.tagsList = list
  },
  CLOSE_OTHER(state, tag) {
    state.tagsList = state.tagsList.filter(r => {
      return r.path === tag.path || r.meta.affix
    })
  },
  EMPTY_TAG(state) {
    state.tagsList = state.tagsList.filter(r => {
      return r.meta && r.meta.affix
    })
  }
}

const actions = {
  addTags({ commit }, views) {
    commit('ADD_TAGS', views)
  },
  removeTag({ commit }, tag) {
    commit('REMOVE_TAG', tag)
  },
  closeOther({ commit }, tag) {
    commit('CLOSE_OTHER',tag)
  },
  enptyTag({ commit }) {
    commit('EMPTY_TAG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

