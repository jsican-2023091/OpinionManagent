import { body } from "express-validator"
import { validateErrors, validateErrorWithoutImg } from './validate.error.js'
import { existUsername } from "./db.validators"

export const registerValidation = [
    body('name', 'Name cannot be empty')
    .notEmpty(),
    body('surname', 'Surname cannot be empty')
    .notEmpty(),
    body('username', 'Username cannot be empty')
    .notEmpty()
    .custom(existUsername),
    body('password', 'Password cannot be empty')
    .notEmpty()
    .custom(existUsername),
    body('email', 'Email cannot be empty')
    .notEmpty()
    .isEmail(),

    validateErrors
]

//login
export const loginValidation = [
    body('userLoggin', 'Username or Email cannot be empty')
        .notEmpty(),
        // .isLowercase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .isLength()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrorWithoutImg
]

//update user
export const updateUserValidation = [
    body('name', 'Name cannot be empty')
    .optional(),
    body('surname', 'Surname cannot be empty')
    .optional(),
    body('username', 'Username cannot be empty')
    .optional(),
    body('email', 'Email cannot be empty')
    .notEmpty()
    .isEmail(),
    validateErrorWithoutImg
]


// Categoria
export const validRegisCategory = [
    body('name', 'Name cannot be empty, and can´t be overcome 50 characters')
        .notEmpty()
        .isLength({max: 50}),
    body('description', 'Description cannot be empty, and can´t be overcome 50 characters')
        .notEmpty()
        .isLength({max: 50}),
    validateErrorWithoutImg
]

export const validUpdatedCategory = [
    body('name', 'Name cannot be empty, and can´t be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    body('description', 'Description cannot be empty, and can´t be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    validateErrorWithoutImg
]