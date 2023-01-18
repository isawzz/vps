const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");

const cors = require('cors');
app.use(cors());
//const io = new Server(server);//ohne cors reicht das:

app.use(express.static(__dirname + '')); //Serve root directory

//#region game code: global server data
const G={}; //global live game data stored on server
function update_player_move(player,data){
	if (!G.players) G.players={};
	if (!G.players[player]) G.players[player]={};
	G.players[player].move = move;
}
//#endregion

for (const name of ['game', 'wise', 'ntest']) {
	app.get('/' + name, (req, res) => {
		res.sendFile(__dirname + '/' + name + '/index.html');
	});
}

//#region POST
const yaml = require('yaml');
const fs = require('fs');
function toYamlFile(data, filePath) { fs.writeFileSync(filePath, yaml.stringify(data), 'utf8'); }
app.use(express.json());
app.post('/post/json', function (request, response) {
	let o = request.body;
	console.log(request.body);
	//save object received as yaml file
	//dazu brauch ich einen filename!!!
	//if this thing has a 'filename' 'data' props, save as yaml
	if (o.filename && o.data) { toYamlFile(o.data, './y/' + o.filename + '.yaml'); }
	else if (o.move && o.player) { update_player_move(o.player,o.move);}

	//send a reponse, no need to reload or redirect anything!
	o.checked = "wie bitte? YES!";
	response.send(request.body);

});

//#endregion


let port = 3000;
server.listen(port, () => console.log('listening on port ' + port));
