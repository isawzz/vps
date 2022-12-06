const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors');
app.use(cors());
app.use(express.static('..'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const { DATABASE_URL, PORT } = require('../conf')
const mongoose = require('mongoose')
mongoose.connect(DATABASE_URL, {})
const db = mongoose.connection;
db.on('error', x => console.log(x))
db.once('open', () => console.log('connected to mongoose'))

app.get('/', (req, res) => {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname+'/index.html');
});

app.listen(PORT);
