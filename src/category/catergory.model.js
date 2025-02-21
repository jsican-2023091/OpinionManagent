//Modelo de categoria
import { Schema, model } from "mongoose";

const categorySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: [true, `Name is required`]
        },
        description: {
            type: String,
            required: [true, `Description is required`]
        }
    }
)

export default model('Category', categorySchema)