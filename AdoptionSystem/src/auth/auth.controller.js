//Gestjionar lógica de autenticación
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
//HACER TEST PARA VER SI FUNCIONAN LAS CONEXIONES
export const test =(req,res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
} 

//Register
export const  register = async(req,res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Crear el objeto del modelo agregandole los datos capturados
        let user = new User(data)
        //Encriptar la password(2)
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        user.role ='CLIENT'
        //Asignar profilePicture
        user.profilePicture = req.file.filename ?? null
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfly, can be logged with username: ${user.username} `})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err})
    }
}

//Login
export const login = async(req,res)=>{
    try{
        //Capturar los datos(body)
        let {userLoggin, password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or:[//subfuncion OR | espera un [] de busquedas
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        //{username} = {username: username}
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid : user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({ 
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        

        }
        
        //Verificar que la contraseña exista
            //MÁS ADELANTE: GENERAR EL TOKEN
        //Responder al usuario
        return res.status(400).send({message:'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function',err})
    }
}