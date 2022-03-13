const mongoose = require('mongoose')
const d = new Date()

const Schema = new mongoose.Schema({
  role_name: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  add_time: {
    type: Number,
    default: d.getDate()
  }
})

const Roles = mongoose.model('roles', Schema)

module.exports = Roles