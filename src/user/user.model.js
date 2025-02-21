//Modelo de usuario
import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [25, `Can´t be overcome 25 characters`],
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            maxLength: [25, `Can´t be overcome 25 characters`],
            required: [true, 'Surname is required']
        },
        username: {
            type: String,
            required: [true, 'User is required'],
            unique: true, 
            maxLength: [15, `Can´t be overcome 25 characters`]
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 25 characters`]
        },
        profilePicture : {
            type: String 
        },
        role: {
            type: String,
            required: [true, `Role is required`],
            enum: ['ADMIN', 'USER']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)