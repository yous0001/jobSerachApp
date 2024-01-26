import { Router } from 'express'
import * as companycontroller from './company.controller.js'
import { auth } from '../../middlewares/auth.js';
import { validation } from '../../middlewares/validation.js';
import { addcompanyschema, updateompanyschema } from './company.validationschema.js';
import expressAsyncHandler from 'express-async-handler';

const router =Router()

router.post('/addcompany',validation(addcompanyschema),auth(),expressAsyncHandler(companycontroller.addCompany))
router.put('/updatecompany',validation(updateompanyschema),auth(),expressAsyncHandler(companycontroller.updateCompany))
router.delete('/deletecompany',auth(),expressAsyncHandler(companycontroller.deleteaccount))
router.get('/getcompanydata/:companyId',auth(),expressAsyncHandler(companycontroller.Getcompanydata))
router.get('/searchOnCompany',auth(),expressAsyncHandler(companycontroller.searchOnCompany))

export default router;