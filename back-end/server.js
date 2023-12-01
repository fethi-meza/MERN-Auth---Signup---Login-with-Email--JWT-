const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./DB/DBM')
const UserRout =require('./Router/userRout')
const AuthRout =require('./Router/auth')

require('dotenv').config()
const port = 3000

//connction DB
connectDB();


// midlleware 
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/usres',UserRout)
app.use('/api/usres',AuthRout)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))