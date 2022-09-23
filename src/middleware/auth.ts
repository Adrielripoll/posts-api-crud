import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const AuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.header('authorization-token')
    if(!token) return response.status(401).json({ message: 'Unauthorized' })

    try{
        jwt.verify(token, process.env.TOKEN_SECRET!)
        next()
    }catch(error){
        return response.status(401).json({ message: 'Unauthorized' })
    }
    
}

export default AuthMiddleware