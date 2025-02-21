import { Router } from "express"
import { commentSave, getAll, update } from "../comment/comment.controller.js"

const api = Router()
api.get(
    '/getAll',
    getAll
)

api.post(
    '/save',
    commentSave
)

api.put(
    '/update/:id',
    update
)
export default api