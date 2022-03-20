const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  roles_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_menus'
  }
})
const Roles_Menu = mongoose.model('roles_menu', Schema)

module.exports = Roles_Menu