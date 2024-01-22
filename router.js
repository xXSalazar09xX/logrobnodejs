const express=require('express')
const router=express.Router()
const conexion=require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/create', (req, res) => {
    const buscar = req.query.buscar;

    if (buscar) {
        conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (err, resul) => {
            if (err) {
                throw err;
            } else {
                res.render('create', { resul: resul, buscar: buscar });
            }
        });
    } else {
        conexion.query('SELECT * FROM empleados', (err, resul) => {
            if (err) {
                throw err;
            } else {
                res.render('create', { resul: resul });
            }
        });
    }
});
const crud=require('./controllers/crud')

router.post('/store',crud.store)
router.get('/tareas',(req,res)=>{
    conexion.query('SELECT * FROM empleados',(err,resultados)=>{
        if(err)
        throw err
    else
    res.render('tarea',{resultados:resultados})
    })
})
router.post('/tareasguardado',crud.tarea)

module.exports=router