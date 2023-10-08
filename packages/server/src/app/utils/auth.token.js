import jwt from 'jsonwebtoken'

export const generateToken = (userId,userRole) => {
  const token = jwt.sign({ id: userId,role: userRole}, process.env.SECRET, {
    expiresIn: "3000000000000"
  })
  
  return token
}