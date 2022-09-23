import app from './routes/api/index'
import { config } from 'dotenv'
import { connect } from 'mongoose'

config()

connect(process.env.MONGO_URI!, (error) => {
    if(error) {
        console.log(error)
        throw new Error('Database connection failed');
    }
})

app.listen(process.env.SERVER_PORT, () => console.log(`Running on port ${process.env.SERVER_PORT}`))
                                  