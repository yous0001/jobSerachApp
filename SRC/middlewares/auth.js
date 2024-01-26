import jwt from 'jsonwebtoken'
import User from '../../DB/Models/user.model.js'
export const auth=()=>{
    return async (req,res,next)=>{
        try {
            const {accesstoken}=req.headers
        if(!accesstoken){
            return next(new Error('please login first',{cause:400}))
        }
        if(!accesstoken.startsWith(process.env.tokenPrefix)){
            return next(new Error('invalid prefix',{cause:400}))
        }
        const token =accesstoken.split(process.env.tokenPrefix)[1]
        const decodedData=jwt.verify(token,process.env.tokenSignature)
        if(!decodedData||!decodedData.id){
            return next(new Error('invalid token payload',{cause:404}))
        }
        const user=await User.findById(decodedData.id)
        if(!user)return next(new Error('please signup first',{cause:404}))
        req.authData=user;
        next()
        } catch (error) {
            next(new Error('catch Error in auth middleware',{cause:500}))
        }
        
    }
}