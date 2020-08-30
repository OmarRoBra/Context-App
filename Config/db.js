const  mongoose= require('mongoose');
const config = require('config')
const db =  config.get('mongoURI')

const conectDb= async ()=>{
    try{
     await  mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
        
    }) 
    console.log('DB conected')
    }catch(err){
        console.log(err.message)
        //esto hace que cuando haya un error la accion se termine con fallo
        process.exit(1)
    }

  
}
module.exports= conectDb;