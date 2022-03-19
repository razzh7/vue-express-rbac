<template>
  <div class="permission-user">
    <el-card>
      <el-button @click="addUser" class="addUser">添加用户</el-button>
      <el-table :data="userList" stripe border>
        <el-table-column label="用户姓名" prop="username" align="center" />
        <el-table-column label="用户手机" prop="mobile" align="center" />
        <el-table-column label="用户邮箱" prop="email" align="center" />
        <el-table-column label="用户角色" prop="role_name" align="center" />
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
        <el-form-item label="用户密码">
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
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="comfirmAddRoles">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList } from "@/api/roles"
import { userList, userAdd } from "@/api/userInfo"
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
      console.log(1432542,this.userDetail)
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