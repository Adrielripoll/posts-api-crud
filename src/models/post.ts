import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
    _id: { type: String },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{
        type: String,
        required: true
    }]
})

export const Post = mongoose.model('Post', postSchema)