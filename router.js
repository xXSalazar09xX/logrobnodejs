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
router.get('/total', (req, res) => {
    conexion.query( `
    SELECT fechaContratacion, SUM(salario) as totalSalarios
    FROM empleados
    WHERE pagado = 1
    GROUP BY fechaContratacion
    ORDER BY fechaContratacion
  `, (err, empleadosPorFecha) => {
      if (err) {
        console.error('Error al consultar salarios por fecha: ' + err.stack);
      }
      conexion.query( `
      SELECT SUM(salario) as totalSalariosGeneral
      FROM empleados
      WHERE pagado = 1
    `, (err, resultadoTotalSalarios) => {
        if (err) {
          console.error('Error al consultar total general de salarios: ' + err.stack);
        }
  
        const totalSalariosGeneral = resultadoTotalSalarios[0].totalSalariosGeneral;
  
        res.render('pagado', { empleadosPorFecha, totalSalariosGeneral });
      });
    });
  });
  
module.exports=router