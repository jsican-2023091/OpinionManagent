import { Router } from "express"
import { login, register, test } from "./auth.conctroller.js"

const api = Router()
//Rutas publicas
api.get(
    '/test',
    test
)

//Privadas
api.post(
    '/register',
    register
)
api.post(
    '/login',
    login
)
//Exportar
export default api