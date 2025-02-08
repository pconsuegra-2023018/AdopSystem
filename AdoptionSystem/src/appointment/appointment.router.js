import { Router } from "express";
import { addAppointment, deleteAppointment, getAppointment, getAppointmentById, updateAppointment } from "./appointment.controller.js";

const api = Router()

api.get('/getAppointment', getAppointment)
api.get('/getAppintmentById/:id', getAppointmentById)
api.post('/saveAppointment', addAppointment)
api.put('/updateAppointment/:id',updateAppointment)
api.delete('/deleteAppointment/:id',deleteAppointment)

export default api;