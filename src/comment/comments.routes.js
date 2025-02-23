import { Router } from "express"
import { commentSave, deleteComment, getAll, update } from "../comment/comment.controller.js"
import { validSaveComment } from "../../helpers/validators.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()
api.get(
    '/getAll',
    [
        validSaveComment
    ],
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

api.delete(
    '/delete/:id',
    [
        validateJwt
    ],
    deleteComment
)
export default api