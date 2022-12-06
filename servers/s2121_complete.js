const express = require('express')
const app = express()

app.use(express.static('..'))
app.use(express.json());

//#region cors
const cors = require('cors');
app.use(cors());
//#endregion

//#region body-parser
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
//#endregion

//#region fs
const yaml = require('js-yaml');
const fs = require('fs');
function toYamlFile(data, filePath) { fs.writeFileSync(filePath, JSON.stringify(data), 'utf8'); }
function fromYamlFile(filePath) { const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); return yaml.load(data); }
//#endregion

//#region game code: global server data
const G = {}; //global live game data stored on server
function update_player_move(player, move) {
	if (!G.players) G.players = {};
	if (!G.players[player]) G.players[player] = {};
	G.players[player].move = move;
}
//#endregion

//#region DB: stored in db.yaml 
const DB = fromYamlFile('../y/db.yaml') ?? {}; //global DB
console.log('db loaded', DB);
function db_save() { toYamlFile(DB, '../y/db.yaml'); }
//#endregion

//#region mongoDB
const { DATABASE_URL, PORT } = require('../conf')
const mongoose = require('mongoose')
mongoose.connect(DATABASE_URL, {})
const db = mongoose.connection;
db.on('error', x => console.log(x))
db.once('open', () => console.log('connected to mongoose'))
//#endregion

//#region POST
app.post('/post/json', function (req, res) {
	let o = req.body; // console.log(req.body);
	if (o.filename && o.data) { toYamlFile(o.data, '../y/' + o.filename + '.yaml'); }
	else if (o.move && o.player) { update_player_move(o.player, o.move); }
	else { toYamlFile(o, '../y/test.yaml'); }
	o.checked = true;
	res.send(o); //need to send json object!
});

//#endregion

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
app.get('/file', (req, res) => { let filename = `../y/${req.query.name}.yaml`; res.send(fromYamlFile(filename)); });
app.get('/save', (req, res) => { db_save(); res.send(DB); });
app.get('/test', (req, res) => { res.send('<h1>Hello world</h1>'); });


app.listen(2121);
