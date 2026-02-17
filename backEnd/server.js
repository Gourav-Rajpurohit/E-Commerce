import 'dotenv/config'
import compression from 'compression'
import './config/passport.js'

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productsRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import passport from 'passport'

const app = express()

let isConnected = false;

const init = async () => {
  if (!isConnected) {
    await connectDB();
    await connectCloudinary();
    isConnected = true;
  }
};

app.use(async (req, res, next) => {
  await init();
  next();
});

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
