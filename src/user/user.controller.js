//Logica de usuario
import User from '../user/user.model.js'
import { checkPassword } from '../../utils/encrypt.js'

//Editar usaario
export const updateUser = async(req, res)=>{
    const { id } = req.params
    const { role, ...data } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully :)',
                updateUser
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding User',
                err
            }
        )
    }
}

//GetAll
export const getAll = async(req, res) => {
    const { limit, skip } = req.query
    try {
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found',
                total: users.length,
                users
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//GetOne
export const getOne = async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Eliminación de cuenta de usuario
export const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        let password = req.body

        const user = await User.findById(id)
        if (!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )

        // Verificar contraseña
        const isMatch = await checkPassword(user.password, password)
        if (!isMatch) return res.status(400).send(
            {
                success: false,
                message: 'Incorrect password, can not deleted the user'
            }
        )

        // Elimina
        await User.findByIdAndDelete(id)

        return res.send(
            {
                success: true,
                message: `User ${user.name} deleted successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
