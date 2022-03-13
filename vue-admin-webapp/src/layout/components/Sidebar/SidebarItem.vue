<template>
  <div class="sidebar-item">
    <template v-if="isOnlyChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowChildren)">
      <!-- page-link的作用在于区分外链和内部path -->
      <!-- 详见路由文件中的Github -->
      <page-link v-if="!onlyOneChild.hidden && onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon"></i>
          <span class="menu-title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </page-link>
    </template>
    <el-submenu v-else class="nested-menu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title" v-if="item.meta && !item.hidden">
        <i :class="item.meta.icon"></i>
        <span class="menu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :base-path="resolvePath(child.path)"
      :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate"
import PageLink from "./Link"
import path from "path"

export default {
   name: 'SidebarItem',
   components: { PageLink },
   props: {
     item: {
       type: Object,
       default: {}
     },
     basePath: String,
     default: ''
   },
   data() {
     return {
       onlyOneChild: null
     }
   },
   methods: {
     isOnlyChild(children = [], parent) {
       
       const showChildren = children.filter(child => {
         if (child.hidden) { // 过滤路由，查看子路由个数
           return false
         } else {
           return true
         }
       })

       if (showChildren.length === 1) {
         // 拿到唯一child渲染
         this.onlyOneChild = showChildren[0]
         return true
       }
       if (showChildren.length === 0) { // 说明只有路由只有一层
       // path目的是用来清理children的item的path，else url上会多出现一个item path
          this.onlyOneChild = { ...parent, path: '', noShowChildren: true } 
          return true
       }
        return false
     },
     resolvePath(routePath) {
       if (isExternal(routePath)) {
         return routePath
       }
       
      if (isExternal(this.basePath)) {
        return this.basePath
      }
       return path.resolve(this.basePath, routePath)
     }
   }
}
</script>

<style>

</style>