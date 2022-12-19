
//#region old server.js
function server01() {
	//#region game code: ***NOPE*** global server data
	// const G = {}; //global live game data stored on server
	// function update_player_move(player, move) {
	// 	if (!G.players) G.players = {};
	// 	if (!G.players[player]) G.players[player] = {};
	// 	G.players[player].move = move;
	// }
	//#endregion

	//#region Config: stored in config.yaml and appdata.yaml and tables.yaml
	const Config = fromYamlFile('../y/config.yaml') ?? {};
	const Appdata = fromYamlFile('../y/appdata.yaml') ?? {};
	const Tables = fromYamlFile('../y/tables.yaml') ?? [];
	//#endregion
}

function server00() {
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

	//#region game code: global server data
	// const G = {}; //global live game data stored on server
	// function update_player_move(player, move) {
	// 	if (!G.players) G.players = {};
	// 	if (!G.players[player]) G.players[player] = {};
	// 	G.players[player].move = move;
	// }
	//#endregion

	//#region Config: stored in config.yaml and appdata.yaml and tables.yaml
	const Config = fromYamlFile('../y/config.yaml') ?? {};
	const Appdata = fromYamlFile('../y/appdata.yaml') ?? {};
	//for (const k in data) { Config.apps[k].data = data[k]; }
	const Tables = fromYamlFile('../y/tables.yaml') ?? [];

	//console.log('db loaded', DB);
	// function db_save() { toYamlFile(Config, '../y/db.yaml'); }
	// function db_set(key, o) { Config[key] = o; db_save(); }
	// function db_add(key, o) { Config[key].push(o); db_save(); }
	// app.post('/db/init/code', function (req, res) { db_set('code', req.body); res.send(Config); });
	// app.post('/db/add/code', function (req, res) { db_add('code', req.body); res.send(Config); });

	//#endregion

	//#region POST
	app.post('/post/json', function (req, res) {
		let o = req.body; // console.log(req.body);
		if (o.filename && o.data) { toYamlFile(o.data, '../y/' + o.filename + '.yaml'); }
		// else if (o.player && o.move) { update_player_move(o.player, o.move); }
		// else { toYamlFile(o, '../y/test.yaml'); }
		o.checked = true;
		res.send(o); //need to send json object!
	});

	//#endregion

	app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
	app.get('/file', (req, res) => { let filename = `../y/${req.query.name}.yaml`; res.send(fromYamlFile(filename)); });
	// app.get('/save', (req, res) => { db_save(); res.send(Config); });
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

}




//#endregion

//unused!
function fitbit_present(dParent, app) {
	console.log('dParent', dParent);
	//mClear(dParent);
	mLinebreak(dParent);
	let d = mDiv(dParent, { bg: 'blue', fg: 'yellow' });
	DA.app.div = d;
	let steps = lookupSet(app, ['today', 'steps'], 0);
	let d1 = mEditNumber('steps', steps, d, () => save_app_data(app), {})
	DA.app.div_edit = d1;
}
function save_app_data() {
	let val = Number(DA.app.div_edit.innerHTML)
	console.log('val', val);
}

