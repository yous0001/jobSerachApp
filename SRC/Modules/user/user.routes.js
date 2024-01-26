import { Router } from "express";
import * as usercontroller from './user.controller.js'
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.js";
import { validation } from "../../middlewares/validation.js";
import { signinschema, signupschema, updateschema } from "./user.validationschema.js";


const router=Router()

router.post('/signup',validation(signupschema),expressAsyncHandler(usercontroller.signup))
router.post('/signin',validation(signinschema),expressAsyncHandler(usercontroller.signin))

router.put('/update',validation(updateschema),auth(),expressAsyncHandler(usercontroller.updateAccount))
router.put('/updatepassword',auth(),expressAsyncHandler(usercontroller.updatepassword))
router.delete('/delete',auth(),expressAsyncHandler(usercontroller.deleteAccount))

router.get('/getUserAccountData',auth(),expressAsyncHandler(usercontroller.getUserAccountData))
router.get('/getanotherprofile',expressAsyncHandler(usercontroller.getAnotherProfileData))
router.get('/getAccountsOfRecveryEmail',expressAsyncHandler(usercontroller.getAllaccountsForRecoveryEmail))


export default router;