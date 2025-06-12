import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.js'
import topicRoutes from './Routes/topic.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/test',(req,res)=>{
    res.status(200).json('Server running');
})

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: ${process.env.PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

