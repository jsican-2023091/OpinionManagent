//Lógica de Publicación
import Publication from '../publication/publication.models.js'

export const publicationSave = async(req, res) => {
    try {
        let data = req.body
        let publication = new Publication(data)
        await publication.save()

        return res.send(
            {
                success: true,
                message: `Author's post saved ${publication.author} and ${publication.title}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error',
                err
            }
        )
    }
}

//Actualizar
export const publicationUpdate = async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const updatePubli = await Publication.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updatePubli) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Publication updated succesfully'
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

//GetAll
export const getAll = async(req, res) => {
    const { limit, skip} = req.query
    try {
        const publications = await Publication.find()
        .skip(skip)
        .limit(limit)
        if(!publications.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Publications not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Publication found',
                total: publications.length,
                publications
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
        const { id } = req.params.id
        const publication = await Publication.findById(id)
        if(!publication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Publication found',
                publication
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

//Delete Publication
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id // Asume que el usuario autenticado está en req.user

        const publication = await Publication.findById(id)
        if (!publication) {
            return res.status(404).send({
                success: false,
                message: 'Publication not found, not deleted'
            })
        }

        // Verificar si el usuario autenticado es el autor de la publicación
        if (publication.author.toString() !== userId) {
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to delete this publication'
            })
        }

        await Publication.findByIdAndDelete(id)

        return res.send({
            success: true,
            message: 'Publication deleted successfully'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
