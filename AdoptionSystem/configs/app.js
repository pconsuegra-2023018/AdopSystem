//Levantar servir express(HTTP)

//Modular | + efectiva + legible | trabajo en funciones

'use strict'

//ECModules | ESModules
import express  from 'express'//Servidor(HTTP)
import morgan from 'morgan'//Logs
import helmet from 'helmet'//Seguridad para HTTP
import cors from 'cors'//Acceso al API
import authRoutes from '../src/auth/auth.router.js'
import userRoutees from '../src/user/user.router.js'
import appointmentRoutes from '../src/appointment/appointment.router.js'
import animalRoutes from '../src/animal/animal.router.js'
import { limiter } from '../middlewares/rate.limit.js'
//Configuracion de express
const config = (app)=>{
    app.use(express.json())//Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)//validar la solicitud en x tiempo
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/user',userRoutees)
    app.use(appointmentRoutes)
    app.use(animalRoutes)
}



//Ejecutamos el servidor
export const initServer = ()=>{
    const app = express()//Instancia de express
    try{
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port${process.env.PORT} `)
    }catch(err){
        console.error('Server init failed' , err)
    }

}
