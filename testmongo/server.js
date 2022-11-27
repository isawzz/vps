require('dotenv').config();
console.log('NODE_ENV',process.env.NODE_ENV)
console.log('db is',process.env.DATABASE_URL)

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

const cors = require('cors');
app.use(cors());

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL,{})
// const db = mongoose.connection
// db.on('error',x=>console.log(x))
// db.once('open',()=>console.log('connected to mongoose'))

app.use('/', indexRouter);
app.use('/authors', authorsRouter); //NOTE: path is composed together with paths in ./routes/authors.js

app.listen(process.env.PORT)










