import mongoose, { Schema } from "mongoose";

const applicationschema=new Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    technicalSkills:{
        type:Array,
        required:true
    },
    softSkills:{
        type:Array,
        required:true
    },
    userresume:{
        type:Object
    }
},{timestamps:true})

const Application=mongoose.model('application',applicationschema)

export default Application;