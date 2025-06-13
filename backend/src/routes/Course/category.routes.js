import express from "express";
import { addCategory, getCategory} from "../../controller/Course/category.controller.js";
const router = express.Router();

router.get('/getcategory',getCategory)
router.post('/addcategory',addCategory)


export default router