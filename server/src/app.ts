import { Request, Response } from "express";

const Routes = require('./router/index')

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')



const app = express();


const corsOption = {
    origin:['http://127.0.0.1:5173','http://localhost:5173'],
    credentials:true,          
    optionSuccessStatus:200,
}
app.use(cors(corsOption));


app.use(morgan('tiny'))
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1', Routes())
app.get('/api/v2', (req: Request, res: Response) => {
    res.json({ message: "Ok" })

})

const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} `)
})