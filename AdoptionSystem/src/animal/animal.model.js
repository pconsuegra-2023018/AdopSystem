import {Schema, model} from 'mongoose'

const animalSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength:[25, 'Can`t be overcome 25 characteres']
        },
        description:{
            type: String,
            required: [true, 'description is required'],
            maxLength:[45, 'Can`t be overcome 45 characteres']
        },
        age:{
            type: String,
            required: [true, 'Age is required'],
            maxLength:[10, 'Can`t be overcome 10 characteres']
        },
        type:{
            type: String,
            required: [true, 'type is required'],
            maxLength:[10, 'Can`t be overcome 10 characteres']

        },
        keeper:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }
)

export default model('Animal',animalSchema)