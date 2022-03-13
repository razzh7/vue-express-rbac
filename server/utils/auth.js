const jwt = require('jsonwebtoken')
const SECRET = 'jklyf78s3@2askj#.fd$asd' // 应用密钥

async function verifyToken(req, res, next) {
  const auth = req.headers.authorization
  if(!auth) {
    return res.send({ 
      error: '拒绝访问,请携带token访问',
      status: 404
    })
  }
  const token = auth.split(' ').pop()
  req.verifyToken = jwt.verify(token, SECRET)
  if (req.verifyToken) {
    next()
  }
}

module.exports = {
  verifyToken
}