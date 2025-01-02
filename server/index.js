import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import cors from 'cors';
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDatabase from './db/db.js';
import bookingRoute from './routes/booking.js';

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));

app.use('/api/booking', bookingRoute);

connectDatabase();

app.get('/', (req,res)=>{
    res.send('hello booking management..')
})

// Handling global error
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`);
});


