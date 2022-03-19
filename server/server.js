const express = require('express')
require('./database/db')
const cors = require('cors')
const user = require('./router/user')
const roles = require('./router/roles')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()

app.use(cors())
app.use(express.json())
app.use(user)
app.use(roles)
app.use(urlencodedParser)

app.get('/', (res, req) => {
  req.send('Hello World')
})

app.listen(6001, () => {
  console.log('6001端口已启动！')
})