const conexion=require('../database/db')

exports.store=(req,res)=>{
    const nombre=req.body.nombre
    const fechaContratacion=req.body.fechaContratacion
    const salario=req.body.salario
    const horasTrabajadas=req.body.horasTrabajadas
    const departamento=req.body.departamento
const pagado= Math.round(Math.random())
if (!nombre || !fechaContratacion || !salario || !horasTrabajadas || !departamento) {
    return res.status(400).send('Todos los campos son obligatorios.');
}
    conexion.query('INSERT INTO empleados SET ?',{nombre:nombre,fechaContratacion:fechaContratacion,salario:salario,horasTrabajadas:horasTrabajadas,departamento:departamento},(err,results)=>{
        if(err)
        throw err
    else
    res.redirect('/create')
    })
}
exports.tarea = (req, res) => {
    const { id_empleado, horas } = req.body;


    conexion.query('SELECT horasTrabajadas FROM empleados WHERE id = ?'
    , [id_empleado], (err, resultadosEmpleado) => {
        if (err) {
            console.log(err);
        }

        const horasTrabajadas = resultadosEmpleado[0].horasTrabajadas;

        if (horasTrabajadas < horas) {
          const m='horas de tarea mayores a las horas trabajadas.';
            return res.render('tareasm',{m});
        } else {
            const nuevaTarea = {
                nombre: req.body.nombre,
                horas: req.body.horas,
                id_empleado: req.body.id_empleado
            };

            conexion.query('INSERT INTO tareas SET ?'
            , nuevaTarea, (err) => {
                if (err) {
                    console.log(err);
                }

                return res.redirect('/');
            });
        }
    });
};

