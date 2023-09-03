import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN
  })
  return token
}