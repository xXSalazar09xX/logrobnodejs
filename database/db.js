const mysql=require('mysql')

const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'loogrob'
})
conexion.connect((err)=>{
    if(err){
    console.log('error:'+err)
    return
    }else
    console.log('conexion exitosa')
})
module.exports=conexion