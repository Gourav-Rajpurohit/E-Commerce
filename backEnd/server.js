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
app.set("trust proxy", 1);

// connect DB only once per instance
let dbReady = false;

const ensureDB = async () => {
  if (!dbReady) {
    await connectDB();
    dbReady = true;
  }
};

app.use(async (req, res, next) => {
  await ensureDB();
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
