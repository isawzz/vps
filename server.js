//#region basic express app
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const yaml = require('yaml');
const fs = require('fs');
app.use(cors());
app.use(express.static(__dirname + '')); //Serve root directory
app.use(express.json());
//#endregion done

//#region dirlist
let dirlist = [
	//legacy (DATA):
	'C:\\DATA\\dev\\js\\02harris\\_global',
	'C:\\DATA\\dev\\js\\02harris\\manyCars',
	'C:\\DATA\\dev\\js\\02harris\\wipgame',
	'C:\\DATA\\dev\\js\\02harris\\ch9',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch01\\examples',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch02\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch03\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch04\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch07\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch09\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch10\\scripts',
	// 'C:\\DATA\\dev\\js\\03seidlin\\ch11\\scripts',
	'C:\\DATA\\dev\\js\\03seidlin\\ch12\\scripts',
	'C:\\DATA\\dev\\js\\06verou',
	'C:\\DATA\\dev\\js\\07joeames\\js',
	'C:\\DATA\\dev\\js\\08cardGame1\\script',
	'C:\\DATA\\dev\\js\\16kaefer\\js',
	'C:\\DATA\\dev\\js\\19lifeGame\\version1',
	'C:\\DATA\\dev\\js\\20testPongApp',
	'C:\\DATA\\dev\\js\\23Animations_CSS_JS\\_my\\clock\\js',
	'C:\\DATA\\dev\\js\\23Animations_CSS_JS\\_my\\learning\\final\\js',
	'C:\\DATA\\dev\\js\\24memory',
	'C:\\DATA\\dev\\js\\25nnImage\\scripts',
	'C:\\DATA\\dev\\js\\26udaCanvas',
	'C:\\DATA\\dev\\js\\28cards\\test02',
	'C:\\DATA\\dev\\js\\31p0',
	'C:\\DATA\\dev\\js\\32t0\\grid',
	'C:\\DATA\\dev\\js\\33cardGameStarter',
	'C:\\DATA\\dev\\js\\40cardSolitaire\\cg01',
	'C:\\DATA\\dev\\js\\42deckOfCards\\test02',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\work2',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\work',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\wCOMMON\\js',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\wCOMMON\\js\\rsgTypes',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid2\\js',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid2\\rsg',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid0\\static\\front\\js',
	'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid0\\static\\rsg\\js',
	'C:\\DATA\\dev_2020\\CODEBASE\\tnt_code\\_front\\asimple\\js',
	'C:\\DATA\\dev_2020\\CODEBASE\\tnt_code\\_front\\front_console\\js',
	'C:\\DATA\\dev_2020\\CODEBASE\\okt21\\static\\js',
	'C:\\DATA\\dev_2020\\CODEBASE\\work\\nov08\\js',

	//middle
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\rsg93\\static\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\okt21\\static\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CBII\\CODE_SAFE\\CODE\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\gsm2_tictactoe\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tnt_code\\_front\\asimple\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tntCode\\js',
	'C:\\D\\a00\\git_archive\\testing\\BASE\\features',
	'C:\\D\\a00\\git_archive\\testing\\BASE',
	'C:\\D\\a00\\git_archive\\test01\\public\\BASE',
	'C:\\D\\a00\\git_archive\\test01\\public\\t99',
	'C:\\D\\a00\\FLASK\\step4\\base\\js',
	'C:\\D\\a00\\FLASK\\step4\\base\\features',
	'C:\\D\\a00\\git_archive\\vid_old\\static\\rsg\\js',
	'C:\\D\\a00\\git_archive\\vid_old\\static\\front\\js',
	'C:\\D\\a00\\git_archive\\vid\\frontend\\static\\rsg\\js',
	'C:\\D\\a00\\git_archive\\vid\\frontend\\static\\front\\js',
	'C:\\D\\a00\\git_archive\\gsmTester\\C',
	'C:\\D\\a00\\git_archive\\gsmTester\\DIE',
	'C:\\D\\a00\\git_archive\\gsmTester\\DOC',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\done',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\measureArrange',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\R',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\testing',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\types',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\uiCreation',
	'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js',
	'C:\\D\\a00\\git_archive\\gsmTester\\SPGAME',
	'C:\\D\\a00\\git_archive\\gsmTester\\SPNEW',
	'C:\\D\\a00\\git_archive\\cardTests\\_test\\ex03',
	'C:\\D\\a00\\git_archive\\cardTests\\simple01',
	'C:\\D\\a00\\git_archive\\cardTests\\ex06_fromScratch',
	'C:\\D\\a00\\git_archive\\eximple\\static',
	'C:\\D\\a00\\git_archive\\eximple\\static\\games',
	'C:\\D\\a00\\git_archive\\dycon_ui_test\\base\\js',
	'C:\\D\\a00\\git_archive\\course-player-socketio\\public\\t99',
	'C:\\D\\a00\\git_archive\\asstest\\CODE',
	'C:\\D\\a00\\git_archive\\asstest\\SIMPLE',
	'C:\\D\\a00\\git_archive\\animaludos\\public\\work',
	'C:\\D\\a00\\git_archive\\animaludos\\public\\work\\done',
	'C:\\D\\a00\\git_archive\\also\\MZZ',
	'C:\\D\\a00\\git_archive\\also\\BASE',
	'C:\\D\\a00\\git_archive\\also\\BASE\\features',
	'C:\\D\\a00\\git_archive\\animaludos\\public',
	'C:\\D\\a00\\git_archive\\animaludos\\public\\BASE',
	'C:\\D\\a00\\git_archive\\animaludos\\public\\BASE\\features',
	'C:\\D\\a00\\git_archive\\abra',
	'C:\\D\\a00\\hive\\hive',
	'C:\\D\\a00\\TESTING\\base\\js',
	'C:\\D\\a00\\TESTING\\cosensus',
	'C:\\D\\a00\\TESTING\\easy',
	'C:\\D\\a00\\TESTING\\feedback',
	'C:\\D\\a00\\TESTING\\games',
	'C:\\D\\a00\\TESTING\\index_palette',
	'C:\\D\\a00\\videmo\\frontend\\static\\front\\js',
	'C:\\D\\a00\\videmo\\frontend\\static\\rsg\\js',
	'C:\\D\\a00\\videmo\\games\\catan\\_rsg',
	'C:\\D\\a00\\videmo\\games\\ttt\\_rsg',
	'C:\\D\\a00\\vid\\vid0\\static\\front\\js',
	'C:\\D\\a00\\vid\\vid0\\static\\rsg\\js',
	'C:\\D\\a00\\vid\\work2',
	'C:\\D\\a00\\vid\\wCOMMON\\js\\rsgTypes',
	'C:\\D\\a00\\vid\\wCOMMON\\js',
	'C:\\D\\a00\\vid\\vid2\\js',
	'C:\\D\\a00\\vid\\vid2\\rsg',
	'C:\\D\\a01\\chatApp\\public\\BASE',
	'C:\\D\\a01\\chatApp\\public\\BASE\\features',
	'C:\\D\\a01\\chatApp\\public\\work',
	'C:\\D\\a01\\chatApp\\public\\work\\done',
	'C:\\D\\a01\\chatApp\\public',
	'C:\\D\\a01\\chess',
	// more important:
	'C:\\xampp\\htdocs\\aroot\\_other\\perlen\\work\\done',
	'C:\\xampp\\htdocs\\aroot\\_other\\perlen\\work',
	'C:\\xampp\\htdocs\\aroot\\_other\\perlen',
	'C:\\xampp\\htdocs\\aroot\\_other\\bella\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\bg\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\bg4\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\canyonglen',
	'C:\\xampp\\htdocs\\aroot\\_other\\cards',
	'C:\\xampp\\htdocs\\aroot\\_other\\caristo',
	'C:\\xampp\\htdocs\\aroot\\_other\\chatas\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\chatas2',
	'C:\\xampp\\htdocs\\aroot\\_other\\chmultOrig\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\feedback',
	'C:\\xampp\\htdocs\\aroot\\_other\\frontend',
	'C:\\xampp\\htdocs\\aroot\\_other\\happy',
	'C:\\xampp\\htdocs\\aroot\\_other\\hive',
	'C:\\xampp\\htdocs\\aroot\\_other\\klavier',
	'C:\\xampp\\htdocs\\aroot\\_other\\phpchat\\public\\socket.io-client\\lib',
	'C:\\xampp\\htdocs\\aroot\\_other\\simply\\js',
	'C:\\xampp\\htdocs\\aroot\\_other\\v0_chatas',
	'C:\\xampp\\htdocs\\aroot\\base\\js',
	'C:\\xampp\\htdocs\\aroot\\base\\code',
	'C:\\xampp\\htdocs\\aroot\\belinda\\js',
	'C:\\xampp\\htdocs\\aroot\\belinda\\features',
	'C:\\xampp\\htdocs\\aroot\\cosensus',
	'C:\\xampp\\htdocs\\aroot\\easy',
	'C:\\xampp\\htdocs\\aroot\\iconViewer\\js',
	'C:\\xampp\\htdocs\\aroot\\rechnung',
	'C:\\xampp\\htdocs\\aroot\\simple',
	'C:\\xampp\\htdocs\\aroot\\videos\\js',
	'C:\\D\\a03\\nodemaster\\all\\caba',
	'C:\\D\\a03\\nodemaster\\all\\canvas\\lib',
	'C:\\D\\a03\\nodemaster\\all\\canvas\\noc',
	'C:\\D\\a03\\nodemaster\\all\\canvas\\smooth',
	'C:\\D\\a03\\nodemaster\\all\\cita',
	'C:\\D\\a03\\nodemaster\\all\\coding\\public\\javascripts',
	'C:\\D\\a03\\nodemaster\\all\\favicontester',
	'C:\\D\\a03\\nodemaster\\all\\fileupload\\public',
	'C:\\D\\a03\\nodemaster\\all\\fractals\\nature',
	'C:\\D\\a03\\nodemaster\\all\\fractals\\nn\\031_FlappyBird\\P5',
	'C:\\D\\a03\\nodemaster\\all\\fractals\\plant',
	'C:\\D\\a03\\nodemaster\\all\\fractals\\tree',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf90',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf91',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leafp',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf94',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\leafstreetview',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\mapgame',
	'C:\\D\\a03\\nodemaster\\all\\leaflet\\routing',
	'C:\\D\\a03\\nodemaster\\all\\mapbox\\mapbox',
	'C:\\D\\a03\\nodemaster\\all\\mybrary\\public\\javascripts',
	'C:\\D\\a03\\nodemaster\\all\\openlayers\\map',
	'C:\\D\\a03\\nodemaster\\all\\openlayers\\mapTEXT',
	'C:\\xampp\\htdocs\\aroot\\games',
	'C:\\D\\a03\\nodemaster\\basejs',
	'C:\\D\\a03\\nodemaster\\cai',
	'C:\\D\\a03\\nodemaster\\noc',
	'C:\\D\\a03\\nodemaster\\socketstarter',
	'C:\\D\\a04\\basejs',
	'C:\\D\\a04\\game',

];
//#endregion done

const { parseCodefile, stringBeforeLast, startsWith } = require('./game/_bau1.js');

//#region funcs done
function endsWith(s, sSub) { let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length; }
function fromFile(filePath) { const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); return data; }
function getCodeFilenames(dir) {
	let files = fs.readdirSync(dir); //__dirname);
	return files.filter(x => endsWith(x, '.js'));
}
function getFilesWithout(dir, list) {
	let files = getCodeFilenames(dir);
	for (const s of list) files = files.filter(x => !x.includes(s));
	return files;
}
function getSortedCodefileList(dlist, prop = 'datetime') {
	let res = [];
	if (dlist === undefined) dlist = dirlist;
	for (const dir of dlist) {
		let files = getFilesWithout(dir, 'old', 'muell', '__', 'trash', 'copy', 'min.js');
		for (const fname of files) {
			if (fname.startsWith('app') || fname.startsWith('server')) continue;
			let path = dir + '\\' + fname;
			var stats = fs.statSync(path);
			//console.log('keys',Object.keys(stats),stats.mtime,); return;
			var mtime = stats.mtime;
			let ts = stats.mtimeMs; //toTimestamp(mtime);
			//console.log(fname, ts);
			res.push({ fname: fname, path: path, datetime: mtime, timestamp: ts, size: stats.size });
		}
	}
	res = sortBy(res, prop);
	// res.map(x => console.log('', x.fname, x.datetime))
	// console.log('count:',res.length)
	return res;
}
function listFiles(dir) {
	let files = fs.readdirSync(dir); //__dirname);
	console.log('files', files);
}
function sortBy(arr, key) { arr.sort((a, b) => (a[key] < b[key] ? -1 : 1)); return arr; }
function toFile(data, filePath) { fs.writeFileSync(filePath, data, 'utf8'); }
function toTimestamp(strDate) { const dt = Date.parse(strDate); return dt / 1000; }
function toYamlFile(data, filePath) { fs.writeFileSync(filePath, yaml.stringify(data), 'utf8'); }

//#endregion done

//#region tests
function test0() {
	let dir = 'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\rsg93\\static\\js';
	let files = fs.readdirSync(dir); //__dirname);
	console.log('files', files);
}
function test1() { for (const dir of dirlist) listFiles(dir); }
function test2() {
	let dir = dirlist[0];
	let files = getCodeFilenames(dir);
	console.log('files', files)
}
function test3() {
	let dir = dirlist[0];
	let files = getFilesWithout(dir, 'old', 'muell', '__', 'trash');
	console.log('files', files)
}
function test4() {
	let dir = dirlist[0];
	let files = getFilesWithout(dir, 'old', 'muell', '__', 'trash', 'copy', 'min.js');
	console.log('files', files)
	let file = files[0];
	let text = fromFile(dir + '\\' + file);
	console.log('text', text);
	toFile(text, __dirname + '\\y\\z.js')
}
function test5_stat() {
	let dir = dirlist[0];
	let files = getFilesWithout(dir, 'old', 'muell', '__', 'trash', 'copy', 'min.js');
	for (const fname of files) {
		let path = dir + '\\' + fname;
		var stats = fs.statSync(path);
		var mtime = stats.mtime;
		console.log(fname, mtime);
	}
}
function test6() {
	//let dir = dirlist[0];
	let res = [];
	for (const dir of dirlist) {
		let files = getFilesWithout(dir, 'old', 'muell', '__', 'trash', 'copy', 'min.js');
		for (const fname of files) {
			let path = dir + '\\' + fname;
			var stats = fs.statSync(path);
			//console.log('keys',Object.keys(stats),stats.mtime,); return;
			var mtime = stats.mtime;
			let ts = stats.mtimeMs; //toTimestamp(mtime);
			//console.log(fname, ts);
			res.push({ fname: fname, path: path, datetime: mtime, timestamp: ts });
		}
	}
	res = sortBy(res, 'datetime');
	res.map(x => console.log('', x.fname, x.datetime))
	console.log('count:', res.length)
	return res;
}
function test7() {
	let list = getSortedCodefileList();
	let f = list[Math.floor(Math.random() * list.length)];
	console.log('chosen:', f.fname, f.path)
	let text = fromFile(f.path);
	let res = parseCodefile(text, f.fname);
	toFile(res.text, 'C:\\D\\a03\\nodemaster\\z1.js');
	return res;
}
function test8() {
	let list = getSortedCodefileList(dirlist, 'size');
	let file;
	for (const l of list) {
		file = l;
		//console.log(l.path, l.size);
		if (l.size > 1600) break;
	}
	console.log('...', file.path)
	let text = fromFile(file.path);
	//console.log('text', text);
	let res = parseCodefile(text, file.fname, false);
	//console.log('res.text:\n', res.text);
	res.text = '// ' + stringBeforeLast(file.path, '\\') + '\r\n' + res.text;
	toFile(res.text, 'C:\\D\\a03\\nodemaster\\z1.js');

}
function test9() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let file;
	let i = 0;
	for (file of list) {
		if (file.size < 100) continue; else if (i > 1) break;
		console.log('...', file.path);
		let text = fromFile(file.path);
		let res = parseCodefile(text, file.fname, false);
		let keys = Object.keys(res.dicode);
		if (keys.length == 0) continue;
		console.log('res.dicode',keys);
		//console.log('res.text:\n', res.text);
		res.text = '// ' + stringBeforeLast(file.path, '\\') + '\r\n' + res.text;
		toFile(res.text, `C:\\D\\a03\\nodemaster\\z${i++}.js`);
	}
}
//#endregion done




const CODE = { text: '' };
test9(); //test6();




//let arr = test6();


//CODE.text=fromFile()















//#endregion


//#region unused
// const { Server } = require("socket.io");
// const io = new Server(server);//ohne cors reicht das:

//game G code
const G = {}; //global live game data stored on server
function update_player_move(player, data) {
	if (!G.players) G.players = {};
	if (!G.players[player]) G.players[player] = {};
	G.players[player].move = move;
}
//#endregion

for (const name of ['game', 'wise', 'ntest']) { app.get('/' + name, (req, res) => { res.sendFile(__dirname + '/' + name + '/index.html'); }); }

//#region POST
app.post('/post/json', function (request, response) {
	let o = request.body;
	console.log(request.body);
	//save object received as yaml file
	//dazu brauch ich einen filename!!!
	//if this thing has a 'filename' 'data' props, save as yaml
	if (o.filename && o.data) { toYamlFile(o.data, './y/' + o.filename + '.yaml'); }
	else if (o.move && o.player) { update_player_move(o.player, o.move); }

	//send a reponse, no need to reload or redirect anything!
	o.checked = "wie bitte? YES!";
	response.send(request.body);

});

//#endregion

let port = 3000;
server.listen(port, () => console.log('listening on port ' + port));
