import { Router } from "express";
import * as jobcontroller from './job.controller.js'
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.js";
import { multerMiddle } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
const router=Router()

router.post('/addjob',auth(),expressAsyncHandler(jobcontroller.addJob))
router.put('/updatejob',auth(),expressAsyncHandler(jobcontroller.updatejob))
router.delete('/deletejob',auth(),expressAsyncHandler(jobcontroller.deletejob))
router.get('/getjobs',auth(),expressAsyncHandler(jobcontroller.getJobs))
router.get('/getcompanyjobs',auth(),expressAsyncHandler(jobcontroller.getCompanyJobs))
router.post('/applyjob',auth(),multerMiddle({extensions: allowedExtensions.document}).single('document'),expressAsyncHandler(jobcontroller.applyjob))
//we can write pdf directly
export default router;