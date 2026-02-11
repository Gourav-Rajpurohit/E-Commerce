import dotenv from 'dotenv'
import compression from 'compression'
dotenv.config();

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productsRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'


const app = express()
// const port = process.env.PORT || 4000
const port = 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use(compression())

//API Endpoints

app.use('/api/user', userRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
// console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY)
app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, () => console.log(`server started over port ${port}`)) 