//Modelo de comentario
import  { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        content:{
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, `Content is required`]
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:[true, 'Author is required']
        },
        publication:{
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [ true, 'Publication is required'] 
        }
    }
)

export default model('Comment', commentSchema)