import User from "../../../DB/Models/user.model.js"
import Company from "../../../DB/Models/company.model.js"
import Job from "../../../DB/Models/Job.model.js"

export const addCompany=async(req,res,next)=>{
    const {companyname,description,industry,address,numberOfEmployee,companyEmail}=req.body
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }

    const isCompanyNameDuplicate=await Company.findOne({companyname})
    //companyname check
    if(isCompanyNameDuplicate){
        return res.status(409).json({message:"company name is already exists"})
    }

    const isEmailDuplicate=await Company.findOne({companyEmail})
    //email check
    if(isEmailDuplicate){
        return res.status(409).json({message:"email is already exists"})
    }
    const companyCreated=await Company.create({companyname,description,industry,address,numberOfEmployee,companyEmail,companyHr:userid})
    return res.status(201).json({message:"company has created successfully",
    companyCreated})
    
}

export const updateCompany=async(req,res,next)=>{
    const {companyname,description,industry,address,numberOfEmployee,companyEmail}=req.body
    const {companyOldName}=req.query
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    

    const isCompanyNameDuplicate=await Company.findOne({companyname})
    //companyname check
    if(isCompanyNameDuplicate){
        return res.status(409).json({message:"company name is already exists"})
    }

    const isEmailDuplicate=await Company.findOne({companyEmail})
    //email check
    if(isEmailDuplicate){
        return res.status(409).json({message:"email is already exists"})
    }
    if(!companyOldName){
        return res.status(404).json({message:"old companyname is not exists"})
    }

    const company=await Company.findOne({companyname:companyOldName})
    if(!company) return res.status(404).json({message:"company not found"})
    if(!(company.companyHr.equals(userid))){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const updatedcompany=await Company.findByIdAndUpdate(company._id,
        {companyname,description,industry,address,numberOfEmployee,companyEmail},
        {new:true})
    if(!updatedcompany) return res.status(400).json({message:"updated failed"})
    return res.status(200).json({message:"updated success",
    newData:updatedcompany})
}

export const deleteaccount=async(req,res,next)=>{
    const {companyname}=req.query
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const company=await Company.findOne({companyname})
    if(!company) return res.status(404).json({message:"company not found"})
    if(!(company.companyHr.equals(userid))){
        return res.status(401).json({message:"user is unauthorized"})}
    const deletedcompany=await Company.findByIdAndDelete(company._id)
    if(!deletedcompany) return res.status(400).json({message:"deleted failed"})
    return res.status(200).json({message:"deleted success"})
    
}

export const searchOnCompany=async(req,res,next)=>{
    const {companyname}=req.query
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    const companies=await Company.find({companyname},'companyname companyEmail')
    if(!companies){
        return res.status(404).json({
            message:"no companies have that name"
        })
    }
    return res.status(200).json({
        message:"done",
        companies
    })
}

export const Getcompanydata=async(req,res,next)=>{
    const {companyId}=req.params;
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const company=await Company.findById(companyId)
    if(!company) return res.status(404).json({message:"company is not found"})
    const jobs=await Job.find({addBy:company.companyHr})
    if(!jobs) return res.status(404).json({message:"company don't have any jobs"})
    return res.status(200).json({message:"done",
    jobs})
}
