<template>
  <div class="roles-container">
    <el-card>
      <e-table 
        :data="roleList"
        :columns="columns"
        border
        stripe/>
    </el-card>
  </div>
</template>

<script>
import { roleList } from '@/api/roles'
import ETable from "@/components/ETable"
export default {
  components: { ETable },
  data() {
    return {
      roleList: [],
      columns: [
        {
          isIndex: { type: "index", width: 80, label: "序号", isPagination: false } // isPagination是否开启分页随页数自增
        },
        {
          attrs: { label: "角色名称", prop: "role_name" }
        },
        {
          attrs: { label: "角色说明" , prop: "description" }
        },
        {
          attrs: { label: "添加时间" , prop: "add_time" }
        },
        {
          operation: {
            label: "操作",
            width: 260,
            btnList: [
              {
                name: "授权", // 操作节点名称
                type: "primary", // 按钮类型
                handleCb: this.doAuth
              },
              {
                name: "编辑", // 操作节点名称
                type: "danger", // 按钮类型
                icon: "el-icon-edit",
                handleCb: this.editRole
              },
              {
                name: "删除", // 操作节点名称
                type: "warning", // 按钮类型
                icon: "el-icon-upload",
                handleCb: this.deleteRole
              }
            ],
          }
        }
      ]
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const res = await roleList()
      if (res.code === 0) {
        this.roleList = res.data
      }
    },
    doAuth(_,row) {
      console.log('进行授权',row)
    },
    editRole() {
      console.log('进行编辑')
    },
    deleteRole() {
      console.log('进行删除')
    }
  }
}
</script>

<style>
.roles-container {
  padding: 20px;
}
</style>