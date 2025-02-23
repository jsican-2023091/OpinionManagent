//Logica de Comentario 
import Comment from '../comment/comment.model.js'

export const commentSave = async(req, res) => {
    try {
        let data = req.body
        let comment = new Comment(data)
        await comment.save()
        return res.send(
            {
                success: true,
                message: `Registred succesfully, The author of the comment ${comment.author}`
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

//getAll
export const getAll = async(req, res) => {
    const { limit , skip } = req.query
    try {
        const comments = await Comment.find()
        .skip(skip)
        .limit(limit)
        .populate(
            {
                path: 'publication',
                select: 'title content -_id'
            }
        )
        .populate(
            {
                path: 'author',
                select: 'name surname -_id'
            }      
        )

        if(comments.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Comments found',
                total: comments.length,
                comments
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error'
            }
        )
    }
}

//GetOne
export const getOne = async(req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id)
        if(!comment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )
        return res.status(500).send(
            {
                success: true,
                message: 'Comment found',
                comment
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

//Update
export const update = async(req, res) => {
    const id = req.params.id
    const data = req.body
    
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Comment updated successfully',
                updateComment
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

//Eliminar Comentario
export const deleteComment = async(req, res)=>{
    const { id } = req.params
    const { ...data } = req.body
    try {
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found, not deleted'
                }
            )
        }
        //Verificamos que sea el autor
        if(comment.author.toString() !== req.user.uid && req.user.role !== 'ADMIN'){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not authorized to delete this comment'
                }
            )
        }
        //Eliminar el comentario
        await Comment.findByIdAndDelete(id)
        return res.send(
            {
                success: true,
                message: 'Comment deleted successfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when deleting this Comment',
                err
            }
        )
    }
}