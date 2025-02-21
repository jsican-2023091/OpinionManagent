import { Router } from "express"
import { categoryRegister, deleteCate, getAll, update } from "./category.controller.js"

const api = Router()
api.get(
    '/getAll',
    getAll
)

api.post(
    '/save',
    categoryRegister
)
api.delete(
    '/delete/:id',
    deleteCate
)
api.put(
    '/update/:id',
    update
)

export default api