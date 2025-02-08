import { Router } from "express";
import { deleteUser, getUser, getUserById, updatePassword, updateUser } from "../user/user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { updateUserValidator } from "../../middlewares/validators.js";
const api = Router()


api.get('/', validateJwt, getUser)
api.get('/getUser/:id', validateJwt, getUserById)
api.put('/putUser/:id', [validateJwt, updateUserValidator], updateUser)
api.delete('/deleteUser/:id', validateJwt, deleteUser)
api.post('/contra',updatePassword)

export default api;