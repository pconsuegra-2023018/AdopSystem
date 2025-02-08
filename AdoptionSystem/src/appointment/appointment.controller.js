import Appointment from '../appointment/appointment.model.js'

export const addAppointment = async(req,res)=>{
    try{
        let data = req.body
        let appointment = new Appointment(data)
        let appointmentexist = await Appointment.findOne({dateAppointment: data.dateAppointment})
        if(!appointmentexist){
            await appointment.save()
            return res.send({message: 'appointment saved'})
        }
        return res.send({message: 'Date registered'})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'General error', er})
    }
}

export const getAppointment = async(req,res)=>{
    try{
        let appointment = await Appointment.find()
        if(!appointment) return res.status(404).send({message: `Appointments don't found`})
        return res.send({message: 'appointment found', appointment})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'General error', er})
    }
}

export const getAppointmentById = async(req,res)=>{
    try{
        let {id} = req.params
        let appointment = await Appointment.findById(id)
        if(!appointment) return res.status(404).send({message: `Appointment doesn't found`})
        return res.send({message: 'appointment found', appointment})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'General error', er})
    }
}

export const updateAppointment = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let appointment = await Appointment.findByIdAndUpdate(id,data,{new:true})
        if(!Appointment.findById(id))return res.status(404).send({message: `Appointment doesn't found`})
        return res.send({message: 'appointment updated', appointment})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'General error', er})
    }

}

export const deleteAppointment = async(req,res)=>{
    try{
        let {id} = req.params
        let appointment = await Appointment.findById(id)
        if(!appointment) return res.status(404).send({message: `Appointment doesn't exist`})
        await Appointment.deleteOne(appointment)
        return res.send({message: 'appointment deleted'})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'General error', er})
    }
}