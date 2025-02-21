//Modelo de publicación  
import { Schema, model } from "mongoose"

const publicationSchema = Schema(
    {
        title:{
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Title is required']
        },
        content:{
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, `Content is required`]
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, `Category is required`]
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, `Author is required`]
        }
    }
)

export default model('Publication', publicationSchema)