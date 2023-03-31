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

const LG = false;
//#region dirlist
let dirlegacy = [
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

];
let dironedrive = [
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\rsg93\\static\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\okt21\\static\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CBII\\CODE_SAFE\\CODE\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\gsm2_tictactoe\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tnt_code\\_front\\asimple\\js',
	'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tntCode\\js',
];
let dirgit = [
	//middle
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
	'C:\\D\\a01\\chess',

];
let dirmiddle = [
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

];
let dirimportant = [
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
	//'C:\\xampp\\htdocs\\aroot\\_other\\chmultOrig\\js',
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
	// 'C:\\D\\a03\\nodemaster\\all\\mapbox\\mapbox',
	'C:\\D\\a03\\nodemaster\\all\\mybrary\\public\\javascripts',
	// 'C:\\D\\a03\\nodemaster\\all\\openlayers\\map',
	// 'C:\\D\\a03\\nodemaster\\all\\openlayers\\mapTEXT',
	'C:\\xampp\\htdocs\\aroot\\games',
	'C:\\D\\a03\\nodemaster\\basejs',
	'C:\\D\\a03\\nodemaster\\cai',
	'C:\\D\\a03\\nodemaster\\noc',
	'C:\\D\\a03\\nodemaster\\socketstarter',
	'C:\\D\\a04\\_stuff\\_versions\\v4\\basejs',
	'C:\\D\\a04\\_stuff\\_versions\\v4\\game',
	'C:\\D\\a04\\basejs',
	'C:\\D\\a04\\game',
	'C:\\D\\a04',
	// 'C:\\D\\a04\\y\\v2',

];
let dir_accuse_small = [
	'C:\\xampp\\htdocs\\aroot\\games',
	'C:\\D\\a03\\nodemaster\\basejs',
	'C:\\D\\a03\\nodemaster\\cai',
	'C:\\D\\a03\\nodemaster\\noc',
	'C:\\D\\a03\\nodemaster\\socketstarter',
	'C:\\D\\a04\\_stuff\\_versions\\v4\\basejs',
	'C:\\D\\a04\\_stuff\\_versions\\v4\\game',
	'C:\\D\\a04\\basejs',
	'C:\\D\\a04\\game',
	'C:\\D\\a04',
	'C:\\xampp\\htdocs\\aroot\\accuse',

];

let dirlist = LG ? dirimportant : dirlegacy.concat(dironedrive).concat(dirgit).concat(dirmiddle).concat(dirimportant);
//#endregion done

const { lookupSet, replaceAllFast, nundef, firstWordAfter, removeInPlace, stringBefore, stringAfter, isEmpty, dict2list, isdef, jsCopy, sortByFunc, parseCodefile, parseCodefile1, getFunctionSignature, stringBeforeLast, get_keys, sortCaseInsensitive, isEmptyOrWhiteSpace } = require('./basejs/servercode.js');

//#region funcs done
function dropLast(s) { return s.substring(0, s.length - 1); }
function endsWith(s, sSub) { let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length; }
function* entries(obj) {
	let keys = Object.keys(obj);
	sortCaseInsensitive(keys); //.sort();
	for (let key of keys)
		yield [key, obj[key]];
}
function fromFile(filePath) { const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); return data; }
function fromYamlFile(path) { let txt = fromFile(path); return yaml.parse(txt); }
function getCodeFilenames(dir) {
	let files = fs.readdirSync(dir); //__dirname);
	return files.filter(x => endsWith(x, '.js'));
}
function getCompactDatetime(str) {
	var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	hours = ("0" + date.getHours()).slice(-2);
	minutes = ("0" + date.getMinutes()).slice(-2);
	return [date.getFullYear(), mnth, day, hours, minutes].join("-");
}
function getFilesWithout(dir, list) {
	let files = getCodeFilenames(dir);
	//console.log('total files',files.length)
	for (const s of list) files = files.filter(filename => !(filename.toLowerCase().includes(s.toLowerCase())));
	//console.log('filtered files',files.length)
	return files;
}
function getFiles(filenames, dir) {
	let res = [];
	for (const fname of filenames) {
		let path = dir + '\\' + fname + '.js';
		var stats = fs.statSync(path);
		//console.log('keys',Object.keys(stats),stats.mtime,); return;
		var mtime = getCompactDatetime(stats.mtime);
		let ts = stats.mtimeMs; //toTimestamp(mtime);
		//console.log(fname, ts);
		res.push({ fname: fname, path: path, datetime: mtime, timestamp: ts, size: stats.size });
	}
	// res = sortBy(res, prop);
	return res;
}
function getSortedCodefileList(dlist, prop = 'datetime') {
	let res = [];
	if (dlist === undefined) dlist = dirlist;
	for (const dir of dlist) {
		let files = getFilesWithout(dir, ['jQuery', 'old', 'muell', '__', 'trash', 'copy', '.min.js']);
		for (const fname of files) {
			if (fname.startsWith('app') || fname.startsWith('server')) continue;
			let path = dir + '\\' + fname;
			var stats = fs.statSync(path);
			//console.log('keys',Object.keys(stats),stats.mtime,); return;
			var mtime = getCompactDatetime(stats.mtime);
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
function sortClassKeys(di) {
	let classes = dict2list(di.cla, 'key');
	let classesWithoutExtends = classes.filter(x => !x.code.includes(' extends '));

	let keys = sortCaseInsensitive(classesWithoutExtends.map(x => x.key));
	let dinew = {};
	for (const el of keys) { dinew[el] = di.cla[el]; }

	let classesWithExtends = classes.filter(x => x.code.includes(' extends '));

	let MAX = 150, i = 0;
	console.log('starting class loop')
	while (!isEmpty(classesWithExtends)) {
		if (++i > MAX) { console.log("WRONG!!!"); return []; }
		let o = classesWithExtends.find(x => {
			let ext = firstWordAfter(x.code, 'extends', true).trim();
			if (nundef(di.cla[ext])) return true; //Array
			//console.log('extends:', ext);
			return isdef(dinew[ext]);
		});
		if (isdef(o)) { dinew[o.key] = o; removeInPlace(classesWithExtends, o); }
	}
	return Object.keys(dinew);
}
function sortConstKeys(di) {
	let tbd = dict2list(di.const, 'key');
	let donelist = [];

	tbd = sortBy(tbd, x => x.code.length); //sortCaseInsensitive(tbd.map(x => x.key));
	//console.log('tbd',tbd)
	let dinew = {};

	//let keystbd=tbd.map(x=>x.key);
	let MAX = 3000, i1 = 0, i2 = 0, i3 = 0;
	console.log('starting const loop')
	console.log('const keys', tbd.length)
	while (!isEmpty(tbd)) {
		if (++i1 > MAX) { console.log("WRONG!!!"); return donelist; }

		//find a key in keystbd which code does NOT contain any other const
		let o = null;
		i2 = 0;
		for (const c of tbd) {
			if (++i2 > MAX) { console.log("WRONG!!!"); return donelist; }
			i3 = 0;
			let ok = true;
			for (const c1 of tbd) {
				if (++i3 > MAX) { console.log("WRONG!!!"); return donelist; }
				//if (c1.key == 'BRAUN' && c.key == 'ColorDict') console.log('BRAUN!!!',c1)
				if (c1 == c) continue;
				if (c.code.includes(c1.key)) ok = false;
			}
			//if (c.key == 'ColorDict') console.log('ColorDict ok',ok);
			if (ok) { o = c; break; }
		}

		//let o = tbd.find(x => tbd.every(y => y.key != x.key && !x.code.includes(y.key)));
		//console.log('o',o)
		if (isdef(o)) { donelist.push(o); dinew[o.key] = o; removeInPlace(tbd, o); } // console.log('removing',o.key); }
	}

	return donelist; //dinew; //Object.keys(dinew);
}
function sortFuncKeys(di) {
	//let funs = dict2list(di.func, 'key');

	let byfile = {}; //sortBy(funs,'filename');
	for (const k in di.func) {
		let o = di.func[k];
		//console.log('func',k)
		lookupSet(byfile, [o.filename, o.region, k], o);
	}
	let keys = [];
	for (const fname of sortCaseInsensitive(get_keys(byfile))) {
		let di1 = byfile[fname];
		for (const region of sortCaseInsensitive(get_keys(di1))) {
			let di2 = di1[region];
			for (const funcname of sortCaseInsensitive(get_keys(di2))) {
				keys.push(funcname);
			}
		}
	}
	return keys;
}
function sortFuncsByFile(di) {
	//let funs = dict2list(di.func, 'key');

	let byfile = {}; //sortBy(funs,'filename');
	for (const k in di.func) {
		let o = di.func[k];
		//console.log('func',k)
		lookupSet(byfile, [o.filename, k], o);
	}
	let keys = {};
	for (const fname of sortCaseInsensitive(get_keys(byfile))) {
		keys[fname] = [];
		for (const funcname of sortCaseInsensitive(get_keys(byfile[fname]))) {
			keys[fname].push(funcname);
		}
	}
	return keys;
}
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
		console.log('res.dicode', keys);
		//console.log('res.text:\n', res.text);
		res.text = '// ' + stringBeforeLast(file.path, '\\') + '\r\n' + res.text;
		toFile(res.text, `C:\\D\\a03\\nodemaster\\z${i++}.js`);
	}
}
function test10() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let file;
	let i = 0;
	let superdi = {};
	console.log('file count:', list.length); //return;
	for (file of list) {
		//if (file.size < 100) continue; else if (i > 1) break;
		//console.log('...', file.path);
		let text = fromFile(file.path);
		let res = parseCodefile(text, file.fname, false, file, superdi);
		let keys = Object.keys(res.dicode);
		if (keys.length == 0) continue; //keine neuen funcs
		//console.log('res.dicode',keys);
		//console.log('res.text:\n', res.text);

		res.text = '// ' + stringBeforeLast(file.path, '\\') + '\r\n' + res.text;
		//toFile(res.text, `C:\\D\\a03\\nodemaster\\z${i++}.js`);
	}

	let supertext = '', sigtext = '';
	for (const type of ['cla', 'func']) {
		let keys = get_keys(superdi[type]);
		sortCaseInsensitive(keys);
		for (const k of keys) {
			let o = superdi[type][k];
			supertext += o.code + '\r\n';
			sigtext += `//${o.path} ${o.datetime}\r\n${o.sig}\r\n`;
		}
	}
	toFile(supertext, `C:\\D\\a03\\nodemaster\\z_all.js`);
	toFile(sigtext, `C:\\D\\a03\\nodemaster\\z_sig.js`);
	console.log('DONE!')
}
function test11() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let file;
	let superdi = {};
	console.log('file count:', list.length);
	for (file of list) {
		if (file.fname.startsWith('aaasuper') || file.fname.startsWith('z')) continue;
		let text = fromFile(file.path);
		if (text.includes('require')) continue;
		let res = parseCodefile(text, file.fname, false, file, superdi);
	}

	let tsieve = ['func', 'var', 'const', 'cla']; //first one has highest priority!
	let diresult = { var: {}, const: {}, cla: {}, func: {} };
	let allkeys = {};
	for (const type of tsieve) {
		for (const k in superdi[type]) {
			if (allkeys[k]) continue;
			allkeys[k] = diresult[type][k] = superdi[type][k];
			if (k == 'is_key_down') {
				console.log('trage ein', type, k, allkeys[k].path);
			}
		}
	}

	console.log('is_key_down', allkeys.is_key_down)
	console.log('const!!!!', diresult.const.is_key_down)

	let text = '';
	let alltypes = ['const', 'var', 'cla', 'func'];
	for (const type of alltypes) {
		let keys = get_keys(diresult[type]);
		if (type == 'cla' || type == 'func') sortCaseInsensitive(keys);
		else if (type == 'const') keys = sortByFunc(keys, x => diresult[type][x].code.length);

		for (const k of keys) {
			let code = diresult[type][k].code;
			if (!isEmptyOrWhiteSpace(code)) { text += code; }
			delete diresult[type][k].code;
		}
	}
	toFile(text, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(diresult, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	console.log('DONE!');
	return diresult;
}
function test12() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let file;
	let superdi = {};
	console.log('file count:', list.length);
	for (file of list) {
		if (file.fname.startsWith('aaasuper') || file.fname.startsWith('z')) continue;
		let text = fromFile(file.path);
		if (text.includes('require')) continue;
		let res = parseCodefile(text, file.fname, false, file, superdi);
	}

	let supermap = new Map(entries(superdi.func));
	superdi.func = supermap;
	toYamlFile(superdi, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
}
function test13() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let file = list.find(x => x.fname == 'basemin.js');
	let superdi = {};
	let text = fromFile(file.path);
	parseCodefile1(text, file.fname, false, file, superdi);
	let keys = sortCaseInsensitive(Object.keys(superdi.func));
	let res = {};
	for (const k of keys) {
		res[k] = superdi.func[k];
	}

	console.log('funcs:', Object.keys(superdi.func).length);
	toYamlFile(res, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
}
function test14() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let superdi = {};
	for (const file of list) {
		//console.log('path', file.path);
		if (file.path == 'C:\\D\\a04\\game\\all.js') continue;
		let text = fromFile(file.path);
		parseCodefile1(text, file.fname, false, file, superdi);
	}

	let di2 = {};
	let text = '';
	for (const type of ['cla', 'func']) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));
		let res = {};
		for (const k of keys) {
			if (type == 'cla' && isdef(superdi.func[k])) { console.log('skip class', k, superdi.cla[k].path); continue; }
			res[k] = jsCopy(superdi[type][k]);
			let code = res[k].code;
			if (!isEmptyOrWhiteSpace(code)) { text += code; }
			delete res[k].code;
		}
		di2[type] = res;
	}

	console.log('classes:', Object.keys(di2.cla).length);
	console.log('funcs:', Object.keys(di2.func).length);
	toFile(text, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
}
function test15() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let superdi = {};
	for (const file of list) {
		//console.log('path', file.path);
		if (file.path == 'C:\\D\\a04\\game\\all.js') continue;
		let text = fromFile(file.path);
		parseCodefile1(text, file.fname, false, file, superdi);
	}

	let di2 = {};
	let text = '';
	for (const varkey in superdi.var) {
		let code = superdi.var[varkey].code;
		if (!isEmptyOrWhiteSpace(code)) text += code;
	}
	let constlist = sortConstKeys(superdi);
	for (const c of constlist) { text += c.code; }
	text += '\r\n';
	for (const type of ['var', 'const', 'cla', 'func']) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));

		if (type == 'cla') keys = sortClassKeys(superdi);
		let res = {};
		for (const k of keys) {
			if (type == 'cla' && isdef(superdi.func[k])) { console.log('skip class', k, superdi.cla[k].path); continue; }
			res[k] = jsCopy(superdi[type][k]);
			let code = res[k].code;
			if (type != 'const' && type != 'var') { text += code; } // && !isEmptyOrWhiteSpace(code)) { text += code; }
			delete res[k].code;
		}
		di2[type] = res;
	}

	console.log('var:', Object.keys(di2.var).length);
	console.log('const:', constlist.length);
	console.log('classes:', Object.keys(di2.cla).length);
	console.log('funcs:', Object.keys(di2.func).length);
	toFile(text, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
}
function test16() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let superdi = {};
	for (const file of list) {
		//console.log('path', file.path);
		if (file.path.startsWith('C:\\D\\a04\\game\\all')) { console.log('skip file', file.path); continue; }
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { console.log('skip file', file.path); continue; }
		parseCodefile1(text, file.fname, false, file, superdi);
	}

	//delete some var,func,const
	for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver']) { delete superdi.var[k]; }
	for (const k of ['anyColorToStandardString', 'colorNameToHex']) { delete superdi.func[k]; }
	for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	//console.log('hallo!!!!!!!!!')

	let di2 = {};
	let text = '';

	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		text += c.code;
	}

	for (const varkey in superdi.var) {
		if (['lifeView', 'exp', 'Deck'].some(x => x == varkey)) continue;
		let o = superdi.var[varkey];
		if (nundef(superdi.chessvar[varkey])) text += o.code;
	}

	//sonderbehandlung varchess
	// for (const varkey in superdi.var) { let o = superdi.var[varkey]; if (o.fname == 'chess.js') text += o.code; }
	// for (const varkey of superdi.chessvar) { 		let o = superdi.var[varkey]; if (o.fname == 'chess.js') text += o.code; o.code=''; }
	console.log('chess:', Object.keys(superdi.chessvar));
	for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code; } //o.code=''; }

	text += '\r\n';
	for (const type of ['var', 'const', 'cla', 'func']) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));

		if (type == 'cla') keys = sortClassKeys(superdi);
		let res = {};
		for (const k of keys) {

			let code = superdi[type][k].code;
			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

			if (type == 'cla' && isdef(superdi.func[k])) { console.log('skip class', k, superdi.cla[k].path); continue; }
			res[k] = jsCopy(superdi[type][k]);
			//let code = res[k].code;
			if (type != 'const' && type != 'var') { text += code; }
			delete res[k].code;
		}
		di2[type] = res;
		console.log('', type, Object.keys(di2[type]).length);
	}

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
	}
	toFile(text, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
}


//#endregion done

//#region andere functionen
function test17() {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, false, file, superdi);
	}

	//delete some var,func,const
	for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver', 'pstOpponent', 'pstSelf']) { delete superdi.var[k]; }
	for (const k of ['anyColorToStandardString', 'colorNameToHex', 'update']) { delete superdi.func[k]; }
	for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	// *** synthesize z_all.js and z_all.yaml ***
	let di2 = {};
	let text = '';

	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		text += c.code.trim() + '\r\n';
	}

	let varkeys = Object.keys(superdi.var);
	for (const varkey of varkeys) {
		if (['lifeView', 'exp', 'Deck', 'gridsize'].some(x => x == varkey)) { delete superdi.var[varkey]; continue; }

		// let ch1 = varkey[0];
		if ((nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) && varkey == varkey.toLowerCase() && varkey != 'c52') { delete superdi.var[varkey]; continue; }
		// if (varkey != 'c52' && ch1 != 'd' && !varkey.startsWith('brd')) { delete superdi.var[varkey]; continue; }
		// if (varkey.length <= 3) { delete superdi.var[varkey]; continue; }
		// let ch2 = varkey[1];
		// if (ch2 != ch2.toUpperCase) { delete superdi.var[varkey]; continue; }

		// if (varkey != 'c52' && !varkey.startsWith('d') && varkey.length <= 3 && varkey.toLowerCase() == varkey) {
		// 	//console.log('discard var', varkey);
		// 	delete superdi.var[varkey];
		// 	continue;
		// }
		let o = superdi.var[varkey];
		//console.log('h2',o)
		// if (!isEmptyOrWhiteSpace(o.code) && (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey]))) text += o.code;
		if (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) text += o.code.trim() + '\r\n';
	}

	//sonderbehandlung varchess
	for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code.trim() + '\r\n'; } //o.code=''; }

	let justcode = {};
	let history = {};
	text += '\r\n';
	//console.log('text',text)
	for (const type of ['var', 'const', 'cla', 'func']) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));

		if (type == 'cla') keys = sortClassKeys(superdi);
		let res = {};
		for (const k of keys) {

			let code = superdi[type][k].code;

			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

			if (type == 'cla' && isdef(superdi.func[k])) { continue; } //console.log('skip class', k, superdi.cla[k].path); 
			res[k] = jsCopy(superdi[type][k]);
			//let code = res[k].code;
			if (type != 'const' && type != 'var') { text += code.trim() + '\r\n'; }

			justcode[k] = res[k].code.trim();
			delete res[k].code;
			history[k] = res[k].history;
			delete res[k].history;
		}
		di2[type] = res;
		console.log('', type, Object.keys(di2[type]).length);
	}

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
		for (const k in justcode) {
			justcode[k] = replaceAllFast(justcode[k], pair[0], pair[1]);
		}
	}
	toFile(text, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);
}
function compact_code_with_regions(js_path) {
	let list = getSortedCodefileList(dirlist, 'datetime');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, true, file, superdi);
	}

	//delete some var,func,const
	for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver', 'pstOpponent', 'pstSelf']) { delete superdi.var[k]; }
	for (const k of ['anyColorToStandardString', 'colorNameToHex', 'update']) { delete superdi.func[k]; }
	for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	// *** synthesize z_all.js and z_all.yaml ***
	let di2 = {};
	let text = '//#region consts\r\n';

	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		text += c.code.trim() + '\r\n';
	}

	text += '//#endregion\r\n//#region vars\r\n';
	let varkeys = Object.keys(superdi.var);
	for (const varkey of varkeys) {
		if (['lifeView', 'exp', 'Deck', 'gridsize'].some(x => x == varkey)) { delete superdi.var[varkey]; continue; }

		// let ch1 = varkey[0];
		if ((nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) && varkey == varkey.toLowerCase() && varkey != 'c52') { delete superdi.var[varkey]; continue; }
		// if (varkey != 'c52' && ch1 != 'd' && !varkey.startsWith('brd')) { delete superdi.var[varkey]; continue; }
		// if (varkey.length <= 3) { delete superdi.var[varkey]; continue; }
		// let ch2 = varkey[1];
		// if (ch2 != ch2.toUpperCase) { delete superdi.var[varkey]; continue; }

		// if (varkey != 'c52' && !varkey.startsWith('d') && varkey.length <= 3 && varkey.toLowerCase() == varkey) {
		// 	//console.log('discard var', varkey);
		// 	delete superdi.var[varkey];
		// 	continue;
		// }
		let o = superdi.var[varkey];
		//console.log('h2',o)
		// if (!isEmptyOrWhiteSpace(o.code) && (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey]))) text += o.code;
		if (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) text += o.code.trim() + '\r\n';
	}

	//sonderbehandlung varchess
	for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code.trim() + '\r\n'; } //o.code=''; }

	let justcode = {};
	let history = {};
	text += '//#endregion\r\n';
	//console.log('text',text)
	for (const type of ['var', 'const', 'cla', 'func']) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));

		if (type == 'cla') keys = sortClassKeys(superdi);
		if (type == 'func') keys = sortFuncKeys(superdi);
		let res = {};
		let curfilename = null, curregion = null;
		for (const k of keys) {

			let code = superdi[type][k].code;

			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

			if (type == 'cla' && isdef(superdi.func[k])) { continue; } //console.log('skip class', k, superdi.cla[k].path); 
			let o = res[k] = jsCopy(superdi[type][k]);
			console.log('', o.filename, o.region, k)
			//let code = res[k].code;
			if (type == 'cla') { text += code.trim() + '\r\n'; }
			else if (type == 'func') {
				//check if have new filename
				let samefilename = o.filename == curfilename;
				let sameregion = samefilename && o.region == curregion;
				if (curfilename != null && !sameregion) {
					text += `\r\n//#endregion ${curregion}\r\n`;
				}
				if (curfilename != null && !samefilename) {
					text += `\r\n//#endregion ${curfilename}\r\n`;
				}
				if (!samefilename) {
					curfilename = o.filename;
					text += `\r\n//#region ${curfilename}\r\n`;
				}
				if (!sameregion) {
					curregion = o.region;
					text += `\r\n//#region ${curregion}\r\n`;
				}
				text += code.trim() + '\r\n';
			}
			justcode[k] = res[k].code.trim();
			delete res[k].code;
			history[k] = res[k].history;
			delete res[k].history;
		}
		di2[type] = res;
		console.log('', type, Object.keys(di2[type]).length);
	}

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
		for (const k in justcode) {
			justcode[k] = replaceAllFast(justcode[k], pair[0], pair[1]);
		}
	}
	toFile(text, isdef(js_path) ? js_path : `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);
}
function _myproject_aroot(js_path) {
	let filenames = ['basemin', 'legacy', 'apiserver', 'apisimphp', 'gamehelpers', 'onclick', 'select', 'sim', 'start'];
	let list = getFiles(filenames, 'C:\\xampp\\htdocs\\aroot\\bundle');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, true, file, superdi);
	}

	//delete some var,func,const
	// for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver', 'pstOpponent', 'pstSelf']) { delete superdi.var[k]; }
	// for (const k of ['anyColorToStandardString', 'colorNameToHex', 'update']) { delete superdi.func[k]; }
	// for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	// *** synthesize z_all.js and z_all.yaml ***
	let di2 = {};
	let text = '';

	// text = '//#region consts\r\n';

	// let constlist = sortConstKeys(superdi);
	// for (const c of constlist) {
	// 	let constkey = c.key;
	// 	if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
	// 	if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
	// 	text += c.code.trim() + '\r\n';
	// }

	// text += '//#endregion\r\n//#region vars\r\n';
	// let varkeys = Object.keys(superdi.var);
	// for (const varkey of varkeys) {
	// 	if (['lifeView', 'exp', 'Deck', 'gridsize'].some(x => x == varkey)) { delete superdi.var[varkey]; continue; }

	// 	// let ch1 = varkey[0];
	// 	if ((nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) && varkey == varkey.toLowerCase() && varkey != 'c52') { delete superdi.var[varkey]; continue; }
	// 	// if (varkey != 'c52' && ch1 != 'd' && !varkey.startsWith('brd')) { delete superdi.var[varkey]; continue; }
	// 	// if (varkey.length <= 3) { delete superdi.var[varkey]; continue; }
	// 	// let ch2 = varkey[1];
	// 	// if (ch2 != ch2.toUpperCase) { delete superdi.var[varkey]; continue; }

	// 	// if (varkey != 'c52' && !varkey.startsWith('d') && varkey.length <= 3 && varkey.toLowerCase() == varkey) {
	// 	// 	//console.log('discard var', varkey);
	// 	// 	delete superdi.var[varkey];
	// 	// 	continue;
	// 	// }
	// 	let o = superdi.var[varkey];
	// 	//console.log('h2',o)
	// 	// if (!isEmptyOrWhiteSpace(o.code) && (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey]))) text += o.code;
	// 	if (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) text += o.code.trim() + '\r\n';
	// }

	// //sonderbehandlung varchess
	// for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code.trim() + '\r\n'; } //o.code=''; }

	// text += '//#endregion\r\n';
	//console.log('text',text)
	let justcode = {};
	let history = {};
	let cuelist = ['func']; //['var', 'const', 'cla', 'func'];
	for (const type of cuelist) {
		let keys = sortCaseInsensitive(Object.keys(superdi[type]));

		if (type == 'cla') keys = sortClassKeys(superdi);
		if (type == 'func') keys = sortFuncKeys(superdi);
		let res = {};
		let curfilename = null, curregion = null;
		for (const k of keys) {

			let code = superdi[type][k].code;

			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

			if (type == 'cla' && isdef(superdi.func[k])) { continue; } //console.log('skip class', k, superdi.cla[k].path); 
			let o = res[k] = jsCopy(superdi[type][k]);
			console.log('', o.filename, o.region, k)
			//let code = res[k].code;
			if (type == 'cla') { text += code.trim() + '\r\n'; }
			else if (type == 'func') {
				//check if have new filename
				// let samefilename = o.filename == curfilename;
				// let sameregion = samefilename && o.region == curregion;
				// if (curfilename != null && !sameregion) {
				// 	text += `\r\n//#endregion ${curregion}\r\n`;
				// }
				// if (curfilename != null && !samefilename) {
				// 	text += `\r\n//#endregion ${curfilename}\r\n`;
				// }
				// if (!samefilename) {
				// 	curfilename = o.filename;
				// 	text += `\r\n//#region ${curfilename}\r\n`;
				// }
				// if (!sameregion) {
				// 	curregion = o.region;
				// 	text += `\r\n//#region ${curregion}\r\n`;
				// }
				text += code.trim() + '\r\n';
			}
			justcode[k] = res[k].code.trim();
			delete res[k].code;
			history[k] = res[k].history;
			delete res[k].history;
		}
		di2[type] = res;
		console.log('', type, Object.keys(di2[type]).length);
	}

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
		for (const k in justcode) {
			justcode[k] = replaceAllFast(justcode[k], pair[0], pair[1]);
		}
	}
	toFile(text, isdef(js_path) ? js_path : `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);
}
function __myproject_aroot(js_path) {
	let filenames = ['basemin', 'legacy', 'apiserver', 'apisimphp', 'gamehelpers', 'onclick', 'select', 'sim', 'cards'];
	let list = getFiles(filenames, 'C:\\xampp\\htdocs\\aroot\\bundle');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, true, file, superdi);
	}

	//delete some var,func,const
	for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver', 'pstOpponent', 'pstSelf']) { delete superdi.var[k]; }
	for (const k of ['anyColorToStandardString', 'colorNameToHex', 'update']) { delete superdi.func[k]; }
	for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	// *** synthesize z_all.js and z_all.yaml ***
	let di2 = {};
	let text = '';

	//#region constants
	text = '//#region consts\r\n';
	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		text += c.code.trim() + '\r\n';
	}
	//#endregion constants

	//#region vars
	text += '//#endregion\r\n\r\n//#region vars\r\n';
	let varkeys = Object.keys(superdi.var);
	for (const varkey of varkeys) {
		if (['lifeView', 'exp', 'Deck', 'gridsize'].some(x => x == varkey)) { delete superdi.var[varkey]; continue; }

		// let ch1 = varkey[0];
		if ((nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) && varkey == varkey.toLowerCase() && varkey != 'c52') { delete superdi.var[varkey]; continue; }
		// if (varkey != 'c52' && ch1 != 'd' && !varkey.startsWith('brd')) { delete superdi.var[varkey]; continue; }
		// if (varkey.length <= 3) { delete superdi.var[varkey]; continue; }
		// let ch2 = varkey[1];
		// if (ch2 != ch2.toUpperCase) { delete superdi.var[varkey]; continue; }

		// if (varkey != 'c52' && !varkey.startsWith('d') && varkey.length <= 3 && varkey.toLowerCase() == varkey) {
		// 	//console.log('discard var', varkey);
		// 	delete superdi.var[varkey];
		// 	continue;
		// }
		let o = superdi.var[varkey];
		//console.log('h2',o)
		// if (!isEmptyOrWhiteSpace(o.code) && (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey]))) text += o.code;
		if (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) text += o.code.trim() + '\r\n';
	}

	//sonderbehandlung varchess
	for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code.trim() + '\r\n'; } //o.code=''; }

	//#endregion vars
	text += '//#endregion\r\n\r\n//#region classes\r\n';

	let justcode = {};
	let history = {};

	//region classes
	let keys = sortClassKeys(superdi);
	let res = {};
	for (const k of keys) {
		let code = superdi.cla[k].code;
		if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

		if (isdef(superdi.func[k])) { continue; }
		let o = res[k] = jsCopy(superdi.cla[k]);
		text += code.trim() + '\r\n';
		justcode[k] = res[k].code.trim();
		delete res[k].code;
		history[k] = res[k].history;
		delete res[k].history;
	}
	di2.cla = res;

	text += '//#endregion\r\n\r\n';
	//#endregion classes

	//#region func
	let prevtype, prevfile;
	let byfile = sortFuncsByFile(superdi);
	res = {};
	let filenamelist = sortCaseInsensitive(Object.keys(byfile));
	for (const filename of filenamelist) {
		text += `//#region ${filename}\r\n`;
		let keys = sortCaseInsensitive(byfile[filename]);
		// console.log('byfile', filename, keys); // return;
		for (const k of keys) {
			let code = superdi.func[k].code;
			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;
			let o = res[k] = jsCopy(superdi.func[k]);
			console.log('', o.filename, o.region, k)
			text += code.trim() + '\r\n';
			justcode[k] = res[k].code.trim();
			delete res[k].code;
			history[k] = res[k].history;
			delete res[k].history;
		}
		text += `//#endregion ${filename}\r\n\r\n`;
	}
	di2.func = res;
	console.log('func', Object.keys(di2.func).length);
	//#endregion func

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
		for (const k in justcode) {
			justcode[k] = replaceAllFast(justcode[k], pair[0], pair[1]);
		}
	}
	toFile(text, isdef(js_path) ? js_path : `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);
}
//#endregion

// let superdi = make_superdi();
// console.log('superdi', Object.keys(superdi.const.CORNERS0)); //redoCodebase();
function make_superdi() {
	let filenames = ['basemin', 'legacy', 'apiserver', 'apisimphp', 'gamehelpers', 'onclick', 'select', 'sim', 'cards'];
	let list = getFiles(filenames, 'C:\\xampp\\htdocs\\aroot\\SAFE\\bundle');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, true, file, superdi);
	}
	return superdi;
}
function get_current_superdi(dir) {

	//load current codebase dicts
	let diall = fromYamlFile(dir + 'z_all.yaml'); // const var cla func
	let dicode = fromYamlFile(dir + 'z_allcode.yaml'); // names
	let dihistory = fromYamlFile(dir + 'z_allhistory.yaml'); // names
	//console.log(diall.func.arrTake);
	//reconstruct superdi!
	let superdi = {};
	for (const type in diall) {
		for (const k in diall[type]) {
			let o = diall[type][k];
			o.code = dicode[k];
			o.history = dihistory[k];
			lookupSet(superdi, [type, k], o);
		}
	}
	return superdi;
}
function assemble_consts(superdi) {
	let text = '//#region consts\r\n';
	let text2 = '//#region consts\r\n';
	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		//if (constkey == 'GFUNC') continue;
		let code = c.code;
		//if (constkey == 'GFUNC') console.log('code', code, code.includes('colorDarker'))
		let skip = false;
		for (const k in superdi.func) { if (code.includes(k + '(') || code.includes(k + ',')) { skip = true; break; } }
		for (const k in superdi.cla) { if (code.includes(k + '(') || code.includes(k + ',') || skip) { skip = true; break; } }
		if (code.includes('=>')) { replaceConstByFunc(superdi, c); skip = true; }

		if (skip) text2 += code.trim() + '\r\n'; else text += code.trim() + '\r\n';
	}
	text += '//#endregion\r\n\r\n';
	text2 += '//#endregion\r\n\r\n';
	return [text, text2];
}
function replaceConstByFunc(di, el) {
	let [key, code] = [el.key, el.code];
	delete di.const[el];

	let params = stringBefore(code, '=>').trim();
	let body = stringAfter(code, '=>').trim();
	if (params.includes('(')) {
		params = stringBefore(params, ')');
		params = stringAfter(params, '(');
	} else params = '';
	let text = `function ${key}(${params}) {\r\n`;
	if (body.startsWith('{')) {
		text += stringAfter(body, '{');
		text = stringBeforeLast(text, '}') + '}';
	} else {
		text += 'return ' + body + '}';
	}
	let o = el;
	o.code = text;
	o.sig = getFunctionSignature(stringBefore(text,'\r\n'), key);
	if (o.region == 'const') o.region = 'func'; //o.filename;
	o.type = 'func';
	di.func[key] = o;
}
function assemble_dicts(superdi) {
	let justcode = {};
	let history = {};
	for (const type in superdi) {
		for (const k in superdi[type]) {
			let o = superdi[type][k];
			justcode[k] = o.code;
			history[k] = o.history;
			delete superdi[type][k].code;
			delete superdi[type][k].history;
		}
	}
	return [superdi, justcode, history];
}

redoCodebase();
function redoCodebase() {

	let dir = 'C:\\xampp\\htdocs\\aroot\\base\\cb2\\';
	let superdi = get_current_superdi(dir);
	let [text, rejected] = assemble_consts(superdi);

	toFile(text, dir + 'allglobalshuge.js');
	toFile(rejected, dir + 'allglobalsrejected.js');

	let [di2, justcode, history] = assemble_dicts(superdi);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);

}


function mybundle(js_path) {
	let filenames = ['basemin', 'legacy', 'apiserver', 'apisimphp', 'gamehelpers', 'onclick', 'select', 'sim', 'cards'];
	let list = getFiles(filenames, 'C:\\xampp\\htdocs\\aroot\\bundle');
	let superdi = {};
	for (const file of list) {
		let text = fromFile(file.path);
		if (text.includes('= require(') || text.includes(' ol.')) { continue; } //console.log('skip file', file.path); 
		parseCodefile1(text, file.fname, true, file, superdi);
	}

	//delete some var,func,const
	for (const k of ['c', 'circle', 'uniqueIdEngine', 'maxWidthPreserver', 'pstOpponent', 'pstSelf']) { delete superdi.var[k]; }
	for (const k of ['anyColorToStandardString', 'colorNameToHex', 'update']) { delete superdi.func[k]; }
	for (const k of ['RLAYOUT']) { delete superdi.const[k]; }

	//convert const to var for duplicates
	let ckeys = Object.keys(superdi.const);
	for (const k of ckeys) {
		let co = superdi.const[k];
		let va = superdi.var[k];
		if (isdef(co) && isdef(va)) {
			//schau welches neuer ist!
			let better = co.timestamp > va.timestamp ? co : va;
			//beide als var eintragen!
			if (better == co) {
				let o = jsCopy(co);
				o.type = 'var';
				o.code.replace('const', 'var');
				o.sig.replace('const', 'var');
				superdi.var[k] = o;
				delete superdi.const[k];
			} else {
				delete superdi.const[k];
			}
		} else if (k == 'MyEasing') {
			let o = jsCopy(co);
			o.type = 'var';
			o.code.replace('const', 'var');
			o.sig.replace('const', 'var');
			superdi.var[k] = o;
			delete superdi.const[k];
		}
	}

	// *** synthesize z_all.js and z_all.yaml ***
	let di2 = {};
	let text = '';

	//#region constants
	text = '//#region consts\r\n';
	let constlist = sortConstKeys(superdi);
	for (const c of constlist) {
		let constkey = c.key;
		if (['cx', 'PORT', 'SERVER', 'SERVERRURL'].some(x => x == constkey)) { delete superdi.const[constkey]; continue; }
		if (isdef(superdi.func[constkey]) || isdef(superdi.cla[constkey])) { delete superdi.const[constkey]; continue; }
		text += c.code.trim() + '\r\n';
	}
	//#endregion constants

	//#region vars
	text += '//#endregion\r\n\r\n//#region vars\r\n';
	let varkeys = Object.keys(superdi.var);
	for (const varkey of varkeys) {
		if (['lifeView', 'exp', 'Deck', 'gridsize'].some(x => x == varkey)) { delete superdi.var[varkey]; continue; }

		// let ch1 = varkey[0];
		if ((nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) && varkey == varkey.toLowerCase() && varkey != 'c52') { delete superdi.var[varkey]; continue; }
		// if (varkey != 'c52' && ch1 != 'd' && !varkey.startsWith('brd')) { delete superdi.var[varkey]; continue; }
		// if (varkey.length <= 3) { delete superdi.var[varkey]; continue; }
		// let ch2 = varkey[1];
		// if (ch2 != ch2.toUpperCase) { delete superdi.var[varkey]; continue; }

		// if (varkey != 'c52' && !varkey.startsWith('d') && varkey.length <= 3 && varkey.toLowerCase() == varkey) {
		// 	//console.log('discard var', varkey);
		// 	delete superdi.var[varkey];
		// 	continue;
		// }
		let o = superdi.var[varkey];
		//console.log('h2',o)
		// if (!isEmptyOrWhiteSpace(o.code) && (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey]))) text += o.code;
		if (nundef(superdi.chessvar) || nundef(superdi.chessvar[varkey])) text += o.code.trim() + '\r\n';
	}

	//sonderbehandlung varchess
	for (const varkey in superdi.chessvar) { let o = superdi.var[varkey]; text += o.code.trim() + '\r\n'; } //o.code=''; }

	//#endregion vars
	text += '//#endregion\r\n\r\n//#region classes\r\n';

	let justcode = {};
	let history = {};

	//region classes
	let keys = sortClassKeys(superdi);
	let res = {};
	for (const k of keys) {
		let code = superdi.cla[k].code;
		if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;

		if (isdef(superdi.func[k])) { continue; }
		let o = res[k] = jsCopy(superdi.cla[k]);
		text += code.trim() + '\r\n';
		justcode[k] = res[k].code.trim();
		delete res[k].code;
		history[k] = res[k].history;
		delete res[k].history;
	}
	di2.cla = res;

	text += '//#endregion\r\n\r\n';
	//#endregion classes

	//#region func
	let prevtype, prevfile;
	let byfile = sortFuncsByFile(superdi);
	res = {};
	let filenamelist = sortCaseInsensitive(Object.keys(byfile));
	for (const filename of filenamelist) {
		text += `//#region ${filename}\r\n`;
		let keys = sortCaseInsensitive(byfile[filename]);
		// console.log('byfile', filename, keys); // return;
		for (const k of keys) {
			let code = superdi.func[k].code;
			if (['colorDict', 'VectorLayer', 'lCard'].some(x => code.includes(x))) continue;
			let o = res[k] = jsCopy(superdi.func[k]);
			console.log('', o.filename, o.region, k)
			text += code.trim() + '\r\n';
			justcode[k] = res[k].code.trim();
			delete res[k].code;
			history[k] = res[k].history;
			delete res[k].history;
		}
		text += `//#endregion ${filename}\r\n\r\n`;
	}
	di2.func = res;
	console.log('func', Object.keys(di2.func).length);

	//global text replacements
	for (const pair of [['anyColorToStandardString', 'colorFrom']]) {
		text = replaceAllFast(text, pair[0], pair[1]);
		for (const k in justcode) {
			justcode[k] = replaceAllFast(justcode[k], pair[0], pair[1]);
		}
	}
	toFile(text, isdef(js_path) ? js_path : `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.js`);
	toYamlFile(di2, `C:\\D\\a03\\nodemaster\\z_all${LG ? 'LG' : ''}.yaml`);
	toYamlFile(justcode, `C:\\D\\a03\\nodemaster\\z_allcode${LG ? 'LG' : ''}.yaml`);
	toYamlFile(history, `C:\\D\\a03\\nodemaster\\z_allhistory${LG ? 'LG' : ''}.yaml`);
}

//dirlist = ['C:\\D\\a04','C:\\D\\a04\\game'];
dirlist = dir_accuse_small;
let js_outputpath = `C:\\xampp\\htdocs\\aroot\\hallo\\all.js`;
//myproject_aroot(js_outputpath); //test10(); //test6();//let arr = test6();//CODE.text=fromFile()










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
