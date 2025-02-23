 import { Router } from "express"
import { deleteUser, getAll, getOne, updateUser } from "./user.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

 const api = Router()

 api.get(
    '/getAll',
    [
      validateJwt
    ],
    getAll
 )

 api.put(
   '/updated/:id',
   [
    validateJwt
   ],
   updateUser
 )

 api.delete(
  '/delete/:id',
  [
    validateJwt
  ],
  deleteUser
 )

 api.get(
  '/get/:id',
  getOne
 )
 export default api