const jwt = require('jsonwebtoken')
require('dotenv').config()

function forgotPasswordJwt(user) {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email:user.email
    }
  }

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' })
}

module.exports = {forgotPasswordJwt}