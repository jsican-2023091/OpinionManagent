import { Router } from "express"
import { categoryRegister, deleteCate, getAll, update } from "./category.controller.js"
import { isAdmin, validateJwt } from '../../middleware/validate.jwt.js'

const api = Router()
api.get(
    '/getAll',
    getAll
)

api.post(
    '/save',
    [
        validateJwt,
        isAdmin
    ],
    categoryRegister
)
api.delete(
    '/delete/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteCate
)
api.put(
    '/update/:id',
    [
        validateJwt,
        isAdmin
    ],
    update
)

export default api