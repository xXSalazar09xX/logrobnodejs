const express=require('express')
const app=express()
const path=require('path')

const expressLayouts=require('express-ejs-layouts')

app.set('view engine','ejs')
app.set('port',process.env.PORT||3000)

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',require('./router'))

app.listen(app.get('port'),()=>{
    console.log(`conectado a http://localhost:${app.get('port')}`)
})