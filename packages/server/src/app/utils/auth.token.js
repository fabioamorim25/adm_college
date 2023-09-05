import jwt from 'jsonwebtoken'

export const generateToken = (userId,userRole) => {
  const token = jwt.sign({ id: userId,role: userRole}, process.env.SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN
  })
  return token
}