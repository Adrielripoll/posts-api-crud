import { Post } from '../src/models/post';
import { connect, connection } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import server from '../src/routes/api/index'

describe('Post', () => {
    beforeAll(() => {
        connect(process.env.MONGO_URI!, (error) => {
            if(error) throw new Error('Connection to tests failed')
        })
    })

    beforeEach(async () => {
        await Post.deleteMany()
    })

    afterAll((done) => {
        connection.close(done())
    })

    describe('Access Denied', () => {
        it('should return 401 when provided token is invalid for any route', async () => {
            const response = await request(server).get('/api/posts?page=0').set('authorization-token', 'invalid_token') 
            expect(response.status).toBe(401)   
        })
    })

    describe('Create operation', () => {
        it('should create a post', async () => {
        
            const postPayload = {
                title: 'Jest Post',
                body: 'This is Jest test description',
                tags: ['jest', 'mongodb', 'node', 'supertest']
            }
    
            const response = await request(server).post('/api/posts').set('authorization-token', process.env.AUTH_TOKEN!).send(postPayload)
            
            expect(response.status).toBe(201)
        })
    
        it('should return 400 when provided data are invalid', async () => {
            const postPayload = {
                title: '',
                body: 10,
                tags: []
            }
    
            const response = await request(server).post('/api/posts').set('authorization-token', process.env.AUTH_TOKEN!).send(postPayload)
            expect(response.status).toBe(400)
        })
    })

    describe('Read all operation', () => {
        it('should return all posts paginated from database', async () => {

            await Post.create({
                _id: uuidv4(),
                title: 'Jest Post',
                body: 'This is Jest test description',
                tags: ['jest', 'mongodb', 'node', 'supertest']
            })
    
            const response = await request(server).get('/api/posts?page=0').set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(200)
            expect(response.body.length).toBeGreaterThan(0)
        })
    
        it('should return 404 when posts were not found', async () => {
            const response = await request(server).get('/api/posts').set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(404)
        })
    
        it('should return 404 when page provided dont exists', async () => {
            const response = await request(server).get('/api/posts?page=10&limit=10').set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(404)
        })
    })
    

    describe('Read one operation', () => {
        it('should get one post from database', async () => {
        
            const postPayload = await Post.create({
                _id: uuidv4(),
                title: 'Jest Post',
                body: 'This is Jest test description',
                tags: ['jest', 'mongodb', 'node', 'supertest']
            })
    
            const response = await request(server).get(`/api/posts/${postPayload._id}`).set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(200)
            expect(response.body).not.toBeNull()
        })  
    
        it('should return 404 when post was not found', async () => {
            const _id = uuidv4()
            const response = await request(server).get(`/api/posts/${_id}`).set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(404)
        })
    })
    

    describe('Update operation', () => {
        it('should update an post', async () => {
            const post = await Post.create({
                _id: uuidv4(),
                title: 'Post',
                body: 'Post body',
                tags: ['post']
            })
    
            const postUpdate = {
                title: 'Post updated',
                body: 'Post body updated',
                tags: ['post', 'updated']
            }
    
            const response = await request(server).put(`/api/posts/${post._id}`).send(postUpdate).set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(200)
        })
    
        it('should return 400 when data provided to update a post are invalid', async () => {
            const post = await Post.create({
                _id: uuidv4(),
                title: 'Post',
                body: 'Post body',
                tags: ['post']
            })
    
            const postUpdate = {
                title: '',
                body: 10,
                tags: []
            }
    
            const response = await request(server).put(`/api/posts/${post._id}`).set('authorization-token', process.env.AUTH_TOKEN!).send(postUpdate)
            expect(response.status).toBe(400)
        })
    
        it('should return 404 when post to be updated was not found', async () => {
            const _id = uuidv4()
    
            const postUpdate = {
                title: 'Post updated',
                body: 'Post body updated',
                tags: ['post', 'updated']
            }
    
            const response = await request(server).put(`/api/posts/${_id}`).set('authorization-token', process.env.AUTH_TOKEN!).send(postUpdate)
            expect(response.status).toBe(404)
        })
    })

    describe('Delete operation', () => {
        it('should delete a post from database', async () => {
            const post = await Post.create({
                _id: uuidv4(),
                title: 'Post',
                body: 'Post body',
                tags: ['post']
            })

            const response = await request(server).delete(`/api/posts/${post._id}`).set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(200)
        })
    
        it('should return 404 when post to be deleted was not found', async () => {
            const _id = uuidv4()
            const response = await request(server).delete(`/api/posts/${_id}`).set('authorization-token', process.env.AUTH_TOKEN!)
            expect(response.status).toBe(404)
        })
    })
    
})