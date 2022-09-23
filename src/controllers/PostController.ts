import { IPostData } from '../interfaces/post';
import { Request, Response } from 'express'
import { Post } from '../models/post' 
import { v4 as uuidv4 } from 'uuid'

class PostController {
    public static async store(request: Request, response: Response) {    
        const data: IPostData = request.body
        
        await Post.create({...data, _id: uuidv4()})

        return response.status(201).json({ message: 'Post has been created' })
    }

    public static async list(request: Request, response: Response): Promise<Response<IPostData[]>> {
        const perPage: number = Number(request.query.limit) || 5
        const page: number = Number(request.query.page) || 0

        const allPosts = await Post.find().limit(perPage).skip(perPage * page)
        if(allPosts.length == 0) return response.status(404).json({ message: 'Posts or page not found' })

        return response.status(200).json(allPosts)

    }

    public static async getOne(request: Request, response: Response): Promise<Response<IPostData>> {
        const { id } = request.params

        const postById = await Post.findOne({ _id: id })
        if(!postById) return response.status(404).json({ message: 'Post not found' })

        return response.status(200).json(postById)
    }

    public static async update(request: Request, response: Response) {
        const { id } = request.params
        const data = request.body

        const postUpdated = await Post.findOneAndUpdate({ _id: id }, data)
        if(!postUpdated) return response.status(404).json({ message: 'Post update failed because was not found' })
        
        return response.status(200).json({ message: 'Post has been updated' })
    }

    public static async delete(request: Request, response: Response) {
        const { id } = request.params

        const postDeleted = await Post.findOneAndDelete({ _id: id })
        if(!postDeleted) return response.status(404).json({ message: 'Post delete failed because was not found' })
       
        
        return response.status(200).json({ message: 'Post has been deleted' })
    }
}

export default PostController


