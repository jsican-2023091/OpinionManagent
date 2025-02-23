import { Router } from "express"
import { findbyTitle, getAll, publicationSave, publicationUpdate } from "../publication/publication.controller.js"
import { validSavePublication } from "../../helpers/validators.js"

const api = Router()

api.get(
    '/getAll',
    getAll
)

api.post(
    '/save',
    [
        validSavePublication
    ],
    publicationSave
)

api.put(
    '/update/:id',
    publicationUpdate
)

api.get(
    '/title',
    findbyTitle
)

export default api