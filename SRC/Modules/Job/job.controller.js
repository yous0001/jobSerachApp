import Job from "../../../DB/Models/Job.model.js"
import Application from "../../../DB/Models/application.model.js"
import Company from "../../../DB/Models/company.model.js"
import User from "../../../DB/Models/user.model.js"
import cloudinaryConnection from "../../utils/cloudinary.js"

export const addJob=async(req,res,next)=>{
    const {title,location,workingtime,seniorylevel,technicalSkills,softSkills}=req.body
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const jobcreated=await Job.create({title,location,workingtime,seniorylevel,technicalSkills,softSkills,addBy:userid})
    return res.status(201).json({message:"job has created successfully",
    jobcreated})
}
//we can use _id for this apis but i want to try this thing because we always use _id
export const updatejob=async(req,res,next)=>{
    const {title,location,workingtime,seniorylevel,technicalSkills,softSkills}=req.body
    const {oldtitle}=req.query
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const updatedjob=await Job.findOneAndUpdate({addBy:userid,title:oldtitle},{title,location,workingtime,seniorylevel,technicalSkills,softSkills},{new:true})
    if(!updatedjob) return res.status(404).json({message:"updated failed"})
    return res.status(201).json({message:"job has updated successfully",
    updatedjob})
}

export const deletejob=async(req,res,next)=>{
    const {oldtitle}=req.query
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="company_HR")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const deletedjob=await Job.findOneAndDelete({addBy:userid,title:oldtitle})
    if(!deletedjob) return res.status(404).json({message:"updated failed"})
    return res.status(201).json({message:"job has deleted successfully"})
}


export const getJobs=async(req,res,next)=>{
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    const jobs=await Job.find()
    const jobAndCompany=[]
    for(const job of jobs){
        let company=await Company.findOne({companyHr:job.addBy},'companyname companyEmail')
        jobAndCompany.push({job,company})
    }
    return res.status(200).json({message:"done",jobAndCompany})
}


export const getCompanyJobs=async(req,res,next)=>{
    const {companyname}=req.query;
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    const company=await Company.findOne({companyname})
    if(!company) return res.status(404).json({message:"company is not found"})
    const jobs=await Job.find({addBy:company.companyHr})
    if(!jobs) return res.status(404).json({message:"company don't have any jobs"})
    return res.status(200).json({message:"done",jobs})
}


export const applyjob=async(req,res,next)=>{
    const {jobId,technicalSkills,softSkills}=req.body
    const userid=req.authData._id
    const user=await User.findById(userid)
    if(!user) return res.status(404).json({message:"user not found"})
    if(!(user.role=="user")){
        return res.status(401).json({message:"user is unauthorized"})
    }
    const job=Job.findById(jobId)
    if(!job){
        return res.status(404).json({message:"job not found"})
    }
    const mypdf=await cloudinaryConnection().uploader.upload(req.file.path,{
        folder:"jobcv",
        use_filename:true,
        unique_filename:false
    })
    const application=await Application.create({userId:userid,jobId,technicalSkills,softSkills,userresume:mypdf})
    return res.status(200).json({ message: "User data:",application})
}