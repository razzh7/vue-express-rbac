const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'jklyf78s3@2askj#.fd$asd' // 应用密钥
const auth = require('../utils/auth')
const utils = require('../utils/data')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 查看所有用户
router.get('/findUsers', async(req, res) => {
  const users = await Users.find().populate('role_id')
  return res.send(users)
})

// 注册用户
router.post('/register', urlencodedParser, async(req, res) => {
  const { username, password, mobile, email, role_id } = req.body
  await Users.create({
    username,
    password,
    mobile,
    email,
    role_id
  })
  return res.send(utils.datas(0, null, '您已成功注册'))
})

// 登录
router.post('/login', urlencodedParser, async(req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({ username })
  if (!user) {
    return res.send(utils.datas(400, null, '不存在这个用户，请检查用户名是否输入正确')) // 不允许用户重名
  }

  const match = await bcrypt.compare(password, user.password) // 用户传来的密码和用户数据库中的密码比较
  const userId = await Users.findById(user._id)
  if (match) {
    const token = jwt.sign({ // JWT加密
      id: user._id, // 对user唯一标实JWT加密
    }, SECRET, { expiresIn: 60 * 6000 }) // 设置过期时间30min
    return res.send({
      code: 0,
      data: {
        user: {
          userId: userId._id,
          roles_id: userId.role_id,
          token,
          msg: '登录成功'
        }
      }
    })
  } else {
    return res.send(utils.datas(304, null, '密码错误！'))
  }

})

// 个人信息
router.get('/user/profile', auth.verifyToken, async (req, res) => {
  const userId = req.verifyToken.id
  const userDetail = await Users.findById({ _id: userId })
  res.send(userDetail)
})

// 获取用户列表
router.get('/user/userList', auth.verifyToken, async (req, res) => {
  let userList = await Users.find().select("-password -__v").populate('role_id') // select: 不返回用户密码和版本号
  if (userList) {
    res.send(utils.datas(200, userList))
  } else {
    res.send(utils.datas(500, userList, '获取失败'))
  }
})

// 管理员添加用户
router.post('/user/add', auth.verifyToken, urlencodedParser, async(req, res) => {
  const addUser = new Users(req.body)
  const result =  await addUser.save()
  if (result) {
    res.send(utils.datas(200, null, '添加用户成功！'))
  } else {
    res.send(utils.datas(400, null, '添加用户失败'))
  }

})

// 管理员编辑用户
router.post('/user/edit', auth.verifyToken, urlencodedParser, async(req, res) => {
  const { id } = req.body
  try {
    const result = await Users.findOneAndUpdate({ _id: id }, req.body)
    res.send(utils.datas(200, null, '修改成功！'))
  } catch(err) {
    res.send(utils.datas(400, null, '修改失败'))
  }
})

// 管理员删除用户
router.post('/user/delete', auth.verifyToken, urlencodedParser, async(req, res) => {
  const { id } = req.body

  try {
    await Users.findByIdAndDelete(id)
    res.send(utils.datas(200, null, '删除成功！'))
  } catch(err) {
    res.send(utils.datas(400, null, err))
  }
})

module.exports = router