const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const Roles = require('../model/roles')
const Menu = require('../model/menu')
const Roles_Menu = require('../model/roles_menu')
const utils = require('../utils/data')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const qs = require('qs');

// 获取所有角色
router.get('/roles', auth.verifyToken, async (req, res) => {
  const roles = await Roles.find().select('-__v')

  res.send(utils.datas(200, roles))
})

// 增加角色
router.post('/roles/add', auth.verifyToken, urlencodedParser, async (req, res) => {
    if (req.body) {
      const addRoles = new Roles(req.body)
      await addRoles.save()
      return res.send(utils.datas(200, null, '添加用户角色成功！'))
    } else {
      return res.send(utils.datas(400, null, '添加失败'))
    }
})

// 编辑角色
router.post('/roles/edit', auth.verifyToken, urlencodedParser, async (req, res) => {
    const { id } = req.body
    try {
      await Roles.findByIdAndUpdate({ _id: id }, req.body)     
      res.send(utils.datas(200, null, '编辑角色成功！'))
    } catch (error) {
      res.send(utils.datas(400, null, error.message))
    }
})

// 删除角色
router.post('/roles/delete', auth.verifyToken, urlencodedParser, async (req, res) => {
  const { id } = req.body
  try {
    await Roles.findByIdAndDelete(id)
    res.send(utils.datas(200, null, '删除成功！'))
  } catch (error) {
    res.send(utils.datas(400, null, error.message))
  }
  
})

// 获取菜单栏——用于角色授权菜单显示与默认勾选
router.get('/roles/auth', auth.verifyToken, urlencodedParser, async(req, res) => {
  const { id } = req.query
  getMenu().then(async (datas) => {
    const menu = datas
    const roles_menu = await Roles_Menu.find({
      roles_id: id
    })
    return res.send(utils.datas(0, {
      menu,
      roles_menu
    }, '获取用户菜单成功！'))
  })
})
// 登录时获取角色对应的菜单栏
router.post('/roles/authMenu', auth.verifyToken, urlencodedParser, async(req, res) => {
  const result = qs.parse(req.body) // Resolve Error Cast to ObjectId failed for value "" (type string) at path "roles_id" for model "roles_menu"
  const { id } = result
  const menu = await Roles_Menu.find({ roles_id: id }).populate('menu_id')
  if (menu) {
    return res.send(utils.datas(200, menu))
  }

})
// 角色授权
router.post('/roles/doAuth', auth.verifyToken, urlencodedParser, async(req, res) => {
  const result = qs.parse(req.body)
  const { id, menu_node } = result
  // 1、删除Roles_Menu表中当前角色下的所有权限

  await Roles_Menu.deleteMany({roles_id: id })

  // 2、把当前角色的所有权限添加到Roles_Menu表中

  for (const menu_id of menu_node) {
    const roles_menu = new Roles_Menu({
      roles_id: id,
      menu_id: menu_id
    })
    await roles_menu.save()
  }

  return res.send(utils.datas(200, null, '角色授权成功！'))

})

function getMenu() {
  return new Promise((resolve, reject) => {
      const menu = Menu.aggregate([
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
    ])
    resolve(menu)
  })
}
module.exports = router