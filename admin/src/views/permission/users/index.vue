<template>
  <div class="permission-user">
    <el-card>
      <el-button @click="addUser" class="addUser">添加用户</el-button>
      <el-table :data="userList" stripe border>
        <el-table-column label="用户姓名" prop="username" align="center" />
        <el-table-column label="用户手机" prop="mobile" align="center" />
        <el-table-column label="用户邮箱" prop="email" align="center" />
        <el-table-column label="用户角色" prop="role_name" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editUser(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="txt[dialogStatus]"
      :visible.sync="dialogIsShow"
      width="25%"
      :close-on-click-modal="false">
      <el-form :model="userDetail">
        <el-form-item label="用户名字">
          <el-input v-model="userDetail.username"  maxlength="10"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'edit'?false:true " label="用户密码">
          <el-input v-model="userDetail.password" show-password maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userDetail.mobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userDetail.email"  maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="userDetail.role_id">
            <el-option 
              v-for="(item, index) of roleData" 
              :key="index"
              :label="item.role_name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogIsShow = false">取 消</el-button>
          <el-button type="primary" @click="dialogStatus === 'edit'?comfirmEditUser():comfirmAddRoles()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList } from "@/api/roles"
import { userList, userAdd, userEdit, userDelete } from "@/api/userInfo"
import { Message } from "element-ui"
import { Notification } from 'element-ui';
export default {
  data() {
    return {
      txt: {
        create: '创建用户',
        edit: '编辑用户'
      },
      dialogStatus: 'create',
      dialogIsShow: false,
      userList: [],
      userDetail: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        role_id: ''
      },
      roleData: []
    }
  },
  created() {
    this.getUserList()
    this.getRolesList()
  },
  methods: {
    resetTemp() {
      this.userDetail = {
        username: '',
        password: '',
        mobile: '',
        email: '',

      }
    },
    addUser() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogIsShow = true
    },
    async getRolesList() {
      const res = await roleList()
      if (res.code === 200) {
        this.roleData = res.data
      }
    },
    async comfirmAddRoles() {
      const userDetail = this.userDetail
      const res = await userAdd(userDetail)
      if (res.code === 200) {
        this.getUserList()
        Message.success(res.msg)
      } else {
        Message.error(res.msg)
      }
      this.dialogIsShow = false
    },
    async getUserList() {
      const res = await userList()
      if (res.code === 200) {
        this.userList = this.handleUserData(res.data)
      }
    },
    handleUserData(data) {
      const datas = data.map(item => {
        item.role_name = item.role_id.role_name
        return item
      })
      return datas
    },
    editUser(row) {
      this.dialogStatus = 'edit'
      this.dialogIsShow = true
      const { _id, username, email, mobile, role_id } = row
      const roleId = role_id._id
      this.userDetail = {
        id: _id,
        username,
        email,
        mobile,
        role_id: roleId
      }
    },
    async comfirmEditUser() {
      const data = this.userDetail
      const res = await userEdit(data)
      if (res.code === 200) {
        this.getUserList()
        this.dialogIsShow = false
        Message.success(res.msg)
      } else {
        Message.error(res.msg)
      }
    },
    async deleteUser(row) {
      const id = row._id
      const res = await userDelete({ id })
      if (res.code === 200) {
        this.getUserList()
        Message.success(res.msg)
      } else {
        Message.error(res.msg)
      }
    }
  }
}
</script>

<style>
.addUser {
  float: right;
  margin-bottom: 20px;
}
</style>