const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const Roles = require('../model/roles')
const Menu = require('../model/profile')
const utils = require('../utils/data')

// 获取所有角色
router.get('/roles', auth.verifyToken, async (req, res) => {
  const roles = await Roles.find().select('-__v')

  res.send(utils.datas(0, roles))
})

// 增加角色
router.post('/roles/add', auth.verifyToken, async (req, res) => {
    const addRoles = new Roles(req.body)
    await addRoles.save()
    res.send(utils.datas(0, null, '添加用户角色成功！'))
})

// 编辑角色
router.post('/roles/edit', auth.verifyToken, async (req, res) => {
    const { id } = req.body
    await Roles.findByIdAndUpdate({ _id: id }, req.body)
    
    res.send(utils.datas(0, null, '编辑角色成功！'))
})

// 删除角色
router.post('/roles/delete', auth.verifyToken, async (req, res) => {
  const { id } = req.body
  await Roles.findByIdAndDelete(id)

  res.send(utils.datas(0, null, '删除角色成功！'))
})

// 获取角色权限列表
router.get('/roles/list', auth.verifyToken, async(req, res) => {
  const { id } = req.body // 后面再讲
  const list = await Menu.find()
  res.send(utils.datas(0, list, '获取权限列表成功！'))

})

// 获取菜单栏
router.get('/roles/auth', auth.verifyToken, async(req, res) => {
  const menu = await Menu.aggregate([
      {
        $lookup: {
            from: 'user_menus',
            localField: '_id',
            foreignField: 'pid',
            as: 'children'
        }
      },
      {
        $match: {
            "pid": '0'
        }
      },
  ]).project({_id: 0, pid: 0})
  return res.send(utils.datas(0, menu, '获取用户菜单成功！'))
})

module.exports = router