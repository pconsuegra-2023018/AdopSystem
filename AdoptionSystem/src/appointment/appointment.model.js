import { model, Schema } from "mongoose";

const appointmentSchema = Schema(
    {
        keeper:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        pet:{
            type: Schema.Types.ObjectId,
            ref: 'Animal',
            required: [true, 'Pet is required']
        },
        dateAppointment:{
            type: Date,
            required: [true, 'Date is required']
        },
        description:{
            type:String,
            required: [true, 'Description is required'],
            maxLength: [55, `Can't be overcome 55 characteres`],

        }
    }
)

export default model('Appointment',appointmentSchema)