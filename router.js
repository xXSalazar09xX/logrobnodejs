const express=require('express')
const router=express.Router()
const conexion=require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/create', (req, res) => {

   
   
        conexion.query('SELECT * FROM empleados', (err, resul) => {
            if (err) {
                throw err;
            } else {
                res.render('create', { resul: resul });
            }
        });
    }
)
const crud=require('./controllers/crud')

router.post('/store',crud.store)

module.exports=router