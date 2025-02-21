import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { createAdminUser, createCategory } from "./configs/init.js"

config()


const startApp = async () => {
    try {
        await connect()

        await createAdminUser()

        await createCategory()
        initServer()
    } catch (err) {
        console.error(
                {
                    message: 'Error initializing application:',
                    err
                }
            )
    }
}

startApp()
