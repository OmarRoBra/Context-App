const express= require('express')
const {check,validationResult}= require('express-validator/check')
const authmid=require('../middlewares/authUser')

const router= express.Router();
const User= require('../models/users')
const Contacts= require('../models/contacts');
router.get('/',authmid, async(req,res)=>{
    try{
        const contacts= await Contacts.find({user:req.user.id}).sort({date:-1})
        res.json(contacts);

    }catch{
         console.log(err.message);
         res.status(500).send('error')
    }
})

router.post('/',authmid,[check('name','name is required').not().isEmpty()],async (req,res)=>{
    const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }
   const {name,type,email,phone}=req.body;
   try{
           neeew= new Contacts({
               name,
               type,
               email,
               phone,
               user:req.user.id
           })

           const contactSaved= await neeew.save()
           res.json(contactSaved)
   }catch(err){
       res.status(500).send('err')
        console.log(err)
   }

})
router.delete('/:id',authmid,async (req,res)=>{
    
   try{
    proyecto=await Contacts.findByIdAndRemove({_id:req.params.id})
    res.json({msg:'Tarea eliminada'})
     }catch(error){
         console.log(error);
         res.status(400).json({msg:error})
     }

})
router.put('/:id',[check('name','name is required').not().isEmpty()],async (req,res)=>{
    const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }
   const {name,type,email,phone}=req.body;
   neeew= ({
    name,
    type,
    email,
    phone,
    
})
    try{
      
 
            const contactSaved= await Contacts.findByIdAndUpdate({_id:req.params.id},neeew)
            res.json(contactSaved)
    }catch(err){
        res.status(500).send('err')
         console.log(err)
    }
 
})


module.exports = router;