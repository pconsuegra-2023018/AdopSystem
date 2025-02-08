//Validar campos en las rutas
import {body} from 'express-validator'
import { validateErrors, validateErrorsWithouthFiles } from './validate.errors.js'
import { existEmail, existUsername, notRequiredField } from '../utils/db.validators.js'

//Arreglo de validaciones (por cada ruta)
export const registerValidator =[
    body('name','Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username','username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email','Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty')
        .notEmpty().isMobilePhone(),
    validateErrors
]

export const updateUserValidator = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username,  {req})=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=>existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('phone')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
        validateErrorsWithouthFiles//Despues modificar

]