//Modelo de usuario

import  {Schema, model} from 'mongoose'

const userSchema = Schema(
    {
        name:{
            type: String,
            //Mongo Validations (middLeware | Intermediario que valida el parámetro antes de guardar)
            required: [true, 'Name is required'],
            maxLength:[25, 'Can`t be overcome 25 characteres']
        },
        surname:{
            type: String,
            required: [true, 'Surname is required'],
            maxLength:[25, 'Can`t be overcome 25 characteres']
        },
        username:{
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'],//NO SE PUEDE DUPLICAR EL VALOR
            lowercase: true,
            maxLength:[15, 'Can`t be overcome 15 characteres']
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            //Vamos a ver que pasa si no es único
            unique: true
            //Validación personalizada 
            /* match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]//Rage para validar Email ( Momentanea ) */
        },
        password:{
            type:String,
            required: [true, 'Password is required'],
            minLength:[8, 'Password must be 8 characteres'],
            maxLength:[100, 'Can`t be overcome 16 characteres'],
            /* match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/g] */
        },
        profilePicture:{
            type:String
        },
        phone:{
            type: String,
            required: [true, ''],
            minLength: [8, `Phone must be 8 numbers`],
            maxLength: [15, `Can't be overcome 15 characteres`],
            /* match: [/^\+[0-9]{1,3} [0-9]{4}-[0-9]{4}$/] */
        },
        role:{
           type: String,
           required: [true, 'Role is required'],
           uppercase: true,
           enum: ['ADMIN', 'CLIENT']

        }

    }
)

//Modificar el toJSON -> toObject para excluir datos en la respuesta
userSchema.methods.toJSON = function(){
    const{ __v, password, ...user} = this.toObject()//Sirve para convertir un documento de MongoDB a javascript
    return user
}
//Crear y exportar el modelo
export default model('User', userSchema)