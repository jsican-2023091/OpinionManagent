//Middlewares
'use strict'
import { findUser } from '../helpers/db.validators.js'
import jwt from 'jsonwebtoken'

//Validar token
export const validateJwt = async(req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(400).send(
            {
                message: 'Unauthorized'
            }
        )
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findUser(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - Unauthorized'
            }
        )

        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send(
            {
                message: 'Invalid token or expired'
            }
        )
    }
}

//Validacion por roles
export const isAdmin = async(req, res, next)=>{
    try {
        const { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                succes: false,
                message: `You dont have acces | username ${user.username}`
            }
        )
        next()
    } catch (err) {
        console.error(err)
        return res.statuts(403).send(
            {
                succes: false,
                message: 'Unauthorized role'
            }
        )
    }
}