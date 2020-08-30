const express= require('express')
const bcrypt=require('bcryptjs')
const router= express.Router();
const config= require('config')
const jwt= require('jsonwebtoken')
const authmid=require('../middlewares/authUser')

const {check,validationResult } = require('express-validator')

const User= require('../models/users')


router.get('/', authmid, async(req,res)=>{
    try{
      user= await User.findById(req.user.id).select('-password')
          res.json(user)
    }catch(err){
             console.log(err)
    }

})

router.post('/', [check('name','Please fill the name´s field').not().isEmpty(),
check('email','Enter a Valid E-mail').isEmail(),
check('password', 'Enter a PASSWORD with 6 o more characters').isLength({min:6})

],async (req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }
   const {name,password,email}=req.body;

   try{
       let user= await User.findOne({email})

       if(user){
         return  res.status(400).json({msg:'User exists'})
       }
       user=new User({
           name,
           email,
           password
       })

       const salt= await bcrypt.genSalt(10);

       user.password= await bcrypt.hash(password,salt)

       await user.save();

       const payload={
           user: {
               id:user.id
           }
       }

       jwt.sign(payload,config.get('jwtSecret'),{
           expiresIn:360000
       },(err,token)=>{
            if(err) throw err;
            res.json({token})
       });
    
   }catch(err){
       console.log(err.message)
       res.status(500)
   }
})


module.exports = router;