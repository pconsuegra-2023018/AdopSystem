'use strict'
 
import { checkPassword, encrypt} from '../../utils/encryp.js'
import User from '../user/user.model.js'
 
/* export const saveUser= async(req,res)=>{
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
 
} */
 
export const getUser = async(req,res)=>{
    try{
        const {limit = 20, skip=0} = req.query
        let users = await User.find()
            .skip(skip)
            .limit(limit)

        if(!users) return res.status(404).send(
            {
                success: false,
                message: `Users don't found`
                
            }
        )
            return res.send(
                {   
                    success: true,
                    message: 'Users found', user: users

                }
            )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General Error', err})
    }
}
 
export const getUserById = async(req,res)=>{
    try{
        let {id} = req.params
        let user = await User.findById(id)
        if(!user) return res.send(
            {
                message: `User don't found`

            }
        )
            return res.send(
                {
                    message: 'User found', user
                }
            )
    }catch(er){
        console.error(err)
        return res.status(500).send(
            {
                message: 'Generate Error', err

            }
        )
    }
}
 
export const updateUser = async(req,res)=>{
    try{
    let {id} = req.params
    let data = req.body
    let user = await User.findByIdAndUpdate(id,data,{new:true})
        return res.send(
            {
                message: 'User updated', 
                user: user

            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'Generate Error', err

            }
        )
    }
}
 
export const deleteUser = async(req,res)=>{
    try{
        let {id} = req.params
        let user = await User.findById(id)
        if(!user) return res.send(
            {
                message: `User don't found`

            }
        )
        await User.deleteOne(user)
        return res.send(
            {
                message: 'Users deleted'

            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'Generate Error', err

            }
        )
    }
}

export const updatePassword=async(req,res)=>{
    try{
        let {userPassword, oldPassword, newPassword} =req.body
        let user = await User.findOne({username: userPassword})
        if(await  checkPassword(user.password, oldPassword)){
            await User.updateOne({username: user.username},{ $set:{password:await encrypt(newPassword)} })
            
            return res.send(
                {
                    message:'Password updated', user

                }
            )
        }
        return res.status(400).send(
            {
                message: 'Invalid credentials'

            }
        )
    }catch(er){
        console.error(er)
        return res.status(400).send(
            {
                message: 'General Error' , er

            }
        )
    }
}