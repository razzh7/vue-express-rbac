const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  mobile: {
    type: String
  },
  email: {
    type: String,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  }
})

const Users = mongoose.model('user', user)

module.exports = Users
