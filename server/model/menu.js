const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: {
    type: String
  },
  pid: {
    type: mongoose.Schema.Types.Mixed
  },
  path: {
    type: String
  },
  title: {
    type: String
  },
  component: {
    type: String
  },
  redirect: {
    type: String
  },
  icon: {
    type: String
  }
})
const Menu = mongoose.model('user_menus', Schema)

module.exports = Menu