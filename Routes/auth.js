const express= require('express')
const bcrypt=require('bcryptjs')
const router= express.Router();
const config= require('config')
const jwt= require('jsonwebtoken')
const {check,validationResult } = require('express-validator')

const User= require('../models/users')

router.post('/', [check('email','please enter an valid email').isEmail(),
check('password','pass is required').exists()], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;

    try{
        const usuario = await User.findOne({ email })
    if (!usuario)
        return res.status(400).json({errors:'xd'})

    //CHECAR SI LA CONTRASEÑA ES CORRECTA
    const contrasenaValida = await bcrypt.compare(
        password,
        usuario.password)

        if(!contrasenaValida){
            return res.status(400).json({msg:'si'})
        }
        const payload={
            user: {
                id:usuario.id
            }
        }
 
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:360000
        },(err,token)=>{
             if(err) throw err;
             res.json({token})
        });

    }catch(err){
        
       console.log(err)
    }
})


module.exports = router;