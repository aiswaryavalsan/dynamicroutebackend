const express=require('express');
const router=express.Router();
const userController=require('../controllers/user')
router.post('/add-user',userController.addUser);
router.get('/add-user',userController.getaddUser);
router.delete('/:id',userController.postDeleteUser)
module.exports=router;