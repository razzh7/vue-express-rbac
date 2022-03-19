<template>
  <div class="roles-container">
    <el-card>
      <el-button class="addRoles" @click="addRoles">添加角色</el-button>
      <el-table :data="roleData" stripe border>
        <el-table-column prop="role_name" label="角色名称" align="center" />
        <el-table-column prop="description" label="角色说明" align="center" />
        <el-table-column prop="add_time" label="添加时间" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="doAuth(scope.row)">授权</el-button>
            <el-button
              size="mini"
              @click="editRole(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="txt[dialogStatus]"
      :visible.sync="dilogIsShow"
      width="25%">
        <el-form
          ref="rolesForm"
          label-width="120"
          label-position="left">
          <el-form-item label="角色名称">
            <el-input v-model="rolesForm.role_name" palceholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色说明">
            <el-input v-model="rolesForm.description" palceholder="请输入角色说明"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?comfirmAddRoles():comfirmEditRoles()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, roleAdd, roleEdit, roleDelete } from '@/api/roles'
import { Message } from "element-ui"
import { Notification } from 'element-ui';
export default {
  data() {
    return {
      dialogStatus: '',
      txt: {
        create: '添加角色',
        edit: '编辑角色'
      },
      dialogType: 'new',
      dilogIsShow: false,
      roleData: [],
      rolesForm: {
        role_name: '',
        description: ''
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const res = await roleList()
      if (res.code === 200) {
        this.roleData = res.data
      }
    },
    resetTemp() {
      this.rolesForm = {
        role_name: "",
        description: ""
      }
    },
    addRoles() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dilogIsShow = true
      this.$nextTick(() => {
        this.$refs['rolesForm'].clearValidate()
      })
    },
    async comfirmAddRoles() {
      const role = this.rolesForm
      const res = await roleAdd(role)
      if (res.code === 200) {
        this.getRolesList()
        Message.success(res.msg)
        this.dilogIsShow = false
      }
    },
    doAuth(row) {
      console.log('进行授权',row)
    },
    editRole(row) {
      this.dialogStatus = 'edit'
      this.dilogIsShow = true
      this.rolesForm = Object.assign({}, row)
    },
    async comfirmEditRoles() {
      const { _id, role_name, description} = this.rolesForm
      const res = await roleEdit({
        id: _id,
        role_name,
        description
      })
      if (res.code === 200) {
        this.getRolesList()
        Message.success(res.msg)
        this.dilogIsShow = false
      }
    },
    async deleteRole(row) {
      const id = row._id
      console.log('iud',id)
      const res = await roleDelete({ id })
      if (res.code === 200) {
        Notification({
          title: '提示',
          message: res.msg,
        })
        this.getRolesList()
      }
    }
  }
}
</script>

<style>
.roles-container {
  padding: 20px;
}
.addRoles {
  float: right;
  margin-bottom: 20px;
}
.el-input {
  width: 220px;
}
</style>