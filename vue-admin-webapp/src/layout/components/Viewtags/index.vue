<template>
  <div class="view-tags">
    <mouse-scroll class="scroll-container" :vertical="false">
      <router-link
        ref="tag"
        v-for="tag in viewTags"
        :key="tag.path"
        :to="{ path: tag.path }"
        custom
        v-slot="{ navigate }"
        class="view-tags-item"
        :class="isActive(tag) ? 'active' : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <!-- {{ tag.title }} -->
        <span @click="navigate">
          {{ tag.title }}
          <!-- stop 禁止冒泡关闭按钮的冒泡事件,从而冒泡到router-link触发addTags -->
          <span
            class="el-icon-close"
            v-if="tag.meta && !tag.meta.affix"
            @click.stop="closeCurTag(tag)"
          ></span>
        </span>
      </router-link>
    </mouse-scroll>
    <ul v-show="visible" class="nav-menu" :style="{ top: tTop + 'px', left: tLeft + 'px' }">
      <li @click="closeCurTag(selectTag)">关闭标签</li>
      <li @click="closeOther(selectTag)">关闭其他标签</li>
      <li @click="closeAll">关闭所有标签</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MouseScroll from './scroll.vue'
import path from 'path'
export default {
  data() {
    return {
      visible: false,
      tLeft: 0,
      tTop: 0,
      selectTag: {}
    }
  },
  watch: {
    $route(route) {
      this.addTags()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  computed: {
    ...mapGetters(['view_tags', 'permission_routes']),
    viewTags() {
      return this.view_tags
    },
    routes() {
      return this.permission_routes
    }
  },
  methods: {
    addTags() { // 添加tags
      this.$store.dispatch('viewtags/addTags', this.$route)
    },
    isActive(route) { // 选择激活tags
      return route.path === this.$route.path
    },
    closeCurTag(tag) { // 关闭当前标签
      this.$store.dispatch('viewtags/removeTag', tag)
      if (tag.path === this.$route.path) { // 若是关闭当前标签，则跳转到最后一个标签
        this.lastTag()
        return
      }
      this.updateViews() // 关闭其他标签，则自身标签不跳转
    },
    lastTag() {
      const tag = this.view_tags;
      const lastTag = tag[tag.length - 1]
      this.$router.push({ path: lastTag.path }).catch(() => { })
    },
    initTags() { // 初始化路由
      const routes = this.routes
      const affixTags = this.filterTags(routes)

      affixTags.forEach(r => {
        if (r.title) {
          this.$store.dispatch('viewtags/addTags', r)
        }
      })
    },
    filterTags(routes, basePath = '/') { // affix function 筛选meta:{ affix: true }
      let tags = []
      routes.forEach(r => {
        if (r.meta && r.meta.affix) {
          const tagPath = path.resolve(basePath, r.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            title: r.meta.title,
            meta: { ...r.meta }
          })
        }

        if (r.children) {
          let affixTag = this.filterTags(r.children, r.path)
          tags = [...tags, ...affixTag]
        }
      })

      return tags
    },
    updateViews() { // 点击关闭tag后路由跳转
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$router.push({ path: tag.to.path }).catch(() => {})
          }
        }
      })
    },
    openMenu(tag, e) { // 打开菜单
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const tLeft = e.clientX - offsetLeft + 15 // viewport left
      const tTop = e.clientY // viewport position

      this.visible = true
      this.tLeft = tLeft
      this.tTop = tTop
      this.selectTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    closeOther(curTag) {
      const tags = this.$refs.tag
      this.$store.dispatch('viewtags/closeOther', curTag)
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === curTag.path) {
            this.$router.push({ path: tag.to.path }).catch(() => {})
          }
        }
      })
    },
    closeAll() {
      this.$store.dispatch('viewtags/enptyTag')
      const len = this.viewTags.length
      this.$nextTick(() => {
        const lastTag = this.viewTags[len - 1]
        this.$router.push({ path: lastTag.path }).catch(() => {})
      })
    }
  },
  components: {
    MouseScroll
  }
}
</script>

<style lang="scss" scoped>
.view-tags {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .view-tags-item {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background-color: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }

    .el-icon-close {
      position: relative;
      z-index: 9;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
      &::before {
        display: inline-block;
        transform: scale(0.6);
      }
    }
  }

  .nav-menu {
    position: absolute;
    z-index: 1999;
    padding: 5px 0;
    border-radius: 4px;
    color: #333;
    list-style-type: none;
    background-color: #fff;
    box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

    & > li {
      padding: 7px 10px;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
    }
    & > li:hover {
      background-color: #ebebeb;
    }
  }
}
</style>