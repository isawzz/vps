const express = require('express');
const app = express();
app.use(express.static(__dirname + '/..')); //Serve root directory
app.use(express.json());

//#region cors
const cors = require('cors');
app.use(cors()); //live-server: brauch ich cors!
//#endregion

//#region fs
const yaml = require('js-yaml');
const yaml2 = require('yaml');
const fs = require('fs');
function toYamlFile(data, filePath) { fs.writeFileSync(filePath, yaml2.stringify(data), 'utf8'); }
function fromYamlFile(filePath) { const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); return yaml.load(data); }
//#endregion

//#region data access
const db = require('../basejs/baseminserver.js'); console.log('test',db.nundef(undefined));
const DB = fromYamlFile('../y/db.yaml');

//#endregion

//#region POST
app.post('/post/json', function (req, res) {
	let o = req.body; // console.log(req.body);
	if (o.filename && o.data) { toYamlFile(o.data, '../y/' + o.filename + '.yaml'); }
	res.send({result:'DONE'}); //need to send json object!
});
app.post('/update', function (req, res) {
	let o = req.body; console.log(req.body);
	if (db.isdef(DB)) { let list = db.lookup(DB, ['appdata',o.table]); list[o.i] = o.rec; if (o.save===true) toYamlFile(DB,'../y/db.yaml'); }
	res.send({cmd:'update',rec:o.rec}); //need to send json object!
});

//#endregion

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
app.get('/file', (req, res) => { let filename = `../y/${req.query.name}.yaml`; res.send(fromYamlFile(filename)); });
app.get('/test', (req, res) => { res.send('<h1>Hello world</h1>'); });
app.get('/files', (req, res) => {
	var files = fs.readdirSync(`../y/${req.query.dir}`); //'../y/appdata'); //`/y/${req.query.dir}/`);
	console.log('files', files);
	res.send(files);
});

//#region socket.io
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origins: '*', } });//live-server: brauch ich cors!

// io.on('connection', (socket) => { console.log('a user connected'); }); //testing

io.on('connection', (socket) => {
	handle_connect(socket.id);
	socket.on('message', handle_message);
	socket.on('update', handle_update);
	socket.on('disconnect', handle_disconnect); // ()=>handle_disconnect(socket.id));
});
function handle_connect(id) { console.log('connected', id); io.emit('message', 'someone logged in!'); }
function handle_disconnect(x) { console.log('disconnected', x); io.emit('message', x); }
function handle_message(x) { console.log('got message', x); io.emit('message', x); }
function handle_update(x) { console.log('got update', x); io.emit('update', x); }
//#endregion

server.listen(3000, () => { console.log('listening on ' + 3000); });