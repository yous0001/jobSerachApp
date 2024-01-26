import User from "../../../DB/Models/user.model.js";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";


//=======================================signup api=================================================================
export const signup=async (req,res,next)=>{
const {firstName,lastName,email,password,recoveryEmail,DOB,mobileNumber,role} =req.body
let userName=firstName+" "+lastName;
const isEmailDuplicate=await User.findOne({email})

//email check
if(isEmailDuplicate){
    return res.status(409).json({message:"email is already exists"})
}
//phone check
const isPhoneDuplicate=await User.findOne({mobileNumber})
if(isPhoneDuplicate){
    return res.status(409).json({message:"mobile number is already exists"})
}
//we write + before saltrounds because it's string and we need 
const hashedpassword =bcrypt.hashSync(password,+process.env.saltRounds)
const createduser =await User.create({firstName,lastName,userName,email,password:hashedpassword,recoveryEmail,DOB,mobileNumber,role})
if(!createduser){
    return res.status(500).json({message:"user registeration failed"})
}
return res.status(201).json({message:"user registeration success",createduser})

}

//===================================================signin api========================================================

export const signin=async(req,res,next)=>{
    const {email,mobileNumber,password}=req.body;
    const user = await User.findOne({
        $or:[
            {mobileNumber},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({message:"invalid login credintals"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,user.password)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"invalid login credintals"})
    }

    //generate web token
    //2 required parameters
    //first is object of data that we want to put in token
    //second is signature
    const token =jwt.sign({id:user._id,username:user.userName,useremail:user.email},process.env.tokenSignature,
    {expiresIn:'1d'})
    //token will expire after 1 day
    const updateduser=await User.findByIdAndUpdate(user._id,{status:'online'},{new:true})
    return res.status(200).json({message:"login success",token})

    //if you want to send request don't forget to put accesstoken_ as prefix
}

//===================================update Account====================================================
export const updateAccount=async(req,res,next)=>{
    const {email,mobileNumber,recoveryEmail,DOB,lastname,firstname}=req.body
    const isEmailDuplicate=await User.findOne({email})

    //email check
    if(isEmailDuplicate){
        return res.status(409).json({message:"email is already exists"})
    }
    //phone check
    const isPhoneDuplicate=await User.findOne({mobileNumber})
    if(isPhoneDuplicate){
        return res.status(409).json({message:"mobile number is already exists"})
    }

    const updateduser=await User.findByIdAndUpdate(req.authData._id,
    {email,mobileNumber,recoveryEmail,DOB,lastname,firstname},
    {new:true})
    if(!updateduser) return res.status(400).json({message:"updated failed"})
    return res.status(200).json({message:"updated success",
    newData:updateduser})

    


   

} 
//==================================delete account=====================================================
export const deleteAccount=async(req,res,next)=>{
    const deleteduser=await User.findByIdAndDelete(req.authData._id)
        if(!deleteduser) return res.status(400).json({message:"deleted failed"})
        return res.status(200).json({message:"deleted success"})

} 
//===================================get user account data==============================================
export const getUserAccountData=async(req,res,next)=>{
    return res.status(200).json({
        message:"done",
        data:req.authData
    })


} 
//======================================get profile data for another user===============================================
export const getAnotherProfileData=async(req,res,next)=>{
    const {userid}=req.query
    const user=await User.findById(userid,'userName email')
    if(!user){
        return res.status(404).json({
            message:"user not found"

        })
    }
    return res.status(200).json({
        message:"done",
        user
    })

} 
//==========================================update password=============================================================
export const updatepassword=async(req,res,next)=>{
    const {oldpassword,password}=req.body
    const user=await User.findById(req.authData._id)
    const isPasswordCorrect=bcrypt.compareSync(oldpassword,user.password)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"uncorrect password"})
    }

    const updateduser=await User.findByIdAndUpdate(req.authData._id,
        {password},
        {new:true})
        if(!updateduser) return res.status(400).json({message:"updated failed"})
        return res.status(200).json({message:"updated success",
        newData:updateduser})
}
//==========================================forget password=============================================================
export const forgetpassword=async(req,res,next)=>{


}
//======================================get all accounts associated to recovery email===================================
export const getAllaccountsForRecoveryEmail=async(req,res,next)=>{
    const {recoveryEmail}=req.query
    const users=await User.find({recoveryEmail})
    if(!users){
        return res.status(404).json({
            message:"no user associated to this email"

        })
    }
    return res.status(200).json({
        message:"done",
        users
    })
}