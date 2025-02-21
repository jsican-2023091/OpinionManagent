import { Router } from "express"
import { getAll, publicationSave, publicationUpdate } from "../publication/publication.controller.js"

const api = Router()

api.get(
    '/getAll',
    getAll
)

api.post(
    '/save',
    publicationSave
)

api.put(
    '/update/:id',
    publicationUpdate
)

export default api