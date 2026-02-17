import 'dotenv/config'
import compression from 'compression'
import './config/passport.js'
import './config/cloudinary.js'

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productsRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

const app = express()

// connect DB only once per instance
await connectDB();

app.use(express.json())
app.use(cors())
app.use(compression())

app.use('/api/user', userRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send("API working")
})

export default app;
