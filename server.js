const express= require('express');
const app = express();
const usuarios= require('./Routes/users');
const auth=require('./Routes/auth')
const contacts = require('./Routes/contacts')
const conectDB= require('./Config/db')
const cors=require('cors')


//llama a la funcion para conectar a la DB
conectDB();     

//body parser
app.use(express.json({extended:false}))
app.use(cors())


app.use('/api/users',usuarios);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);
const  PORT=process.env.PORT||5000;

app.listen(PORT,()=>
    console.log('server up'));