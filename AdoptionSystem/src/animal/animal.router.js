import {Router} from 'express'
import  {saveAnimal,getAnimal,getAnimalById,updateAnimal,deleteAnimal} from '../animal/animal.controller.js'

const api = Router()

api.get('/getAnimal',getAnimal)
api.get('/getAnimal/:id',getAnimalById)
api.post('/saveAnimal',saveAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api