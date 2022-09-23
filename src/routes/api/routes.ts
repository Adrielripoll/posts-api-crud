import { Router } from 'express'
import PostController from '../../controllers/PostController'
import PostValidator from '../../validators'
import { body } from 'express-validator/src/middlewares/validation-chain-builders'

const router = Router()

router.post('/api/posts',
 
    PostValidator.storeAndUpdate([
    body('title').isString().isLength({ min: 3 }).withMessage('title must be string and have 3 or more characters'), 
    body('body').isString().isLength({ min: 5 }).withMessage('body must be string and have 5 or more characters'),
    body('tags').isArray({min: 1})]),

    PostController.store)

router.get('/api/posts', PostController.list)
router.get('/api/posts/:id', PostController.getOne)

router.put('/api/posts/:id',

    PostValidator.storeAndUpdate([
    body('title').isString().isLength({ min: 3 }).withMessage('title must be string and have 3 or more characters'), 
    body('body').isString().isLength({ min: 5 }).withMessage('body must be string and have 5 or more characters'),
    body('tags').isArray({min: 1})]), 
    
    PostController.update)

router.delete('/api/posts/:id', PostController.delete)


export default router