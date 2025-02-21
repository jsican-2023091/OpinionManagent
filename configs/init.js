import Category from "../src/category/catergory.model.js"
import User from "../src/user/user.model.js"
import { encrypt } from "../utils/encrypt.js"

export const createAdminUser = async () => {
    try {
        const existingUser = await User.findOne({ username: 'admin' })
        if (existingUser) {
            console.log('Admin user already exists')
            return
        }

        const passwordHash = await encrypt('admin123')

        const user = new User(
            {
                name: 'Admin',
                surname: 'User',
                username: 'admin',
                email: 'admin@gmail.com',
                password: passwordHash,
                role: 'ADMIN'
            }
        )

        await user.save()
    } catch (err) {
        console.error(
            'Error creating admin user',
            err
        )
    }
}

export const createCategory = async() => {
    try {
        const existingCategory = await Category.findOne({ name: 'Categoria default'})
        if (existingCategory) {
            console.log('Category default already exists')
            return
        }
        const category = new Category(
            {
                name: 'Categoria default',
                description: 'Default'
            }
        )

        await category.save()
    } catch (err) {
        console.error(
            'Error creating admin user', 
            err
        )
        
    }
}
