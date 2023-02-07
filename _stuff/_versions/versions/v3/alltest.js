

var Info, ColorDi, Items = {}, DA = {}, Card = {}, TO = {};


var DB, M = {}, S = {}, Z, U = null, PL, G = null, C = null, UI = {}, Users, Tables, Basepath, Serverdata = {}, Clientdata = {};




var Config, Syms, SymKeys, ByGroupSubgroup, KeySets, C52, Cinno, C52Cards;



var SERVERURL, Socket = null, SERVER = 'localhost', PORT = 3000, LIVE_SERVER, NODEJS, SINGLECLIENT;





var x = {
	"loc":
	{
		"actions":
		{
			"_set":
				[{
					"_tuple":
						[{
							"_set":
								[{ "ID": "91", "val": "Corner[91]", "type": "obj" },
								{ "ID": "92", "val": "Corner[92]", "type": "obj" },
								{ "ID": "93", "val": "Corner[93]", "type": "obj" },
								{ "ID": "94", "val": "Corner[94]", "type": "obj" },
								{ "ID": "95", "val": "Corner[95]", "type": "obj" },
								]
						}]
				}]
		}
	}
}



var Q, TOQ, AkQ;




var lastUpdate = 0;




var palette = null;


const CODE = {
	paths: [],
	funcs: {},
	consts: {},
	index: [],
};

const RED = '#e6194B';


async function _start() {
	set_run_state_no_server();
	onpagedeactivated(() => { saveEnv(); dbSave(); });
	await load_syms();
	await load_db();
	let dicode = CODE.di = await route_path_yaml_dict('../y/z_all.yaml');
	let kwindow = get_keys(window);
	test100();
}

function set_run_state_no_server() {
	set_run_state(true, false, 3000, true, true, true, false);
}

function set_run_state_local() {
	set_run_state(true, false, 3000, true, false, true, true);
}

function set_run_state_vps() {
	set_run_state(false, false, 3000, false, false, false, true);
}

function onpagedeactivated(handler) {
	document.addEventListener('visibilitychange',
		() => {
			console.log('visibilityState', document.visibilityState);
			if (document.visibilityState !== 'visible') handler();
		});
}

function saveEnv() {
	fiddleSave();
}

function dbSave() {
	if (NODEJS) {
		let route = `/post/json`;
		let o = { filename: 'db', data: DB }
		let callback = () => console.log('saved db');
		post_json(route, o, callback);
		console.log('full route', route);
	} else console.log('not saved - no app running!')
}

async function load_syms(path) {
	if (nundef(path)) path = '../base/assets/';
	Syms = await route_path_yaml_dict(path + 'allSyms.yaml');
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = await route_path_yaml_dict(path + 'symGSG.yaml');
	KeySets = getKeySets();
	Info = await route_path_yaml_dict(path + 'lists/info.yaml');
	C52 = await route_path_yaml_dict(path + 'c52.yaml');
	create_card_assets_c52();
	assertion(Syms, 'Syms undefined!');
}

async function load_db() { DB = await route_path_yaml_dict('../y/db.yaml'); Config = DB; }

async function route_path_yaml_dict(url) {
	let data = await fetch(url);
	let text = await data.text();
	let dict = jsyaml.load(text);
	return dict;
}

function get_keys(o) { return Object.keys(o); }

function set_run_state(singleclient = true, sockets = false, port = 3000, localhost = true, testing = true, liveserver = true, nodejs = true) {
	SERVER = localhost ? '127.0.0.1' : '216.250.112.218';
	PORT = port;
	SERVERURL = `http:/` + `${SERVER}:${PORT}`;
	NODEJS = nodejs;
	LIVE_SERVER = liveserver;
	TESTING = testing;
	SINGLECLIENT = singleclient;
	if (sockets) {
		Socket = liveserver ? io(SERVERURL) : io();
		Socket.on('message', x => console.log('got message', x));
		Socket.on('disconnect', x => console.log('got disconnect', x));
		Socket.on('update', x => console.log('got update', x));
	}
	console.log('SERVER:' + SERVERURL, 'LIVE:' + LIVE_SERVER, 'Socket:' + Socket, TESTING ? 'TESTING' : '', SINGLECLIENT ? 'SINGLE' : '');
}

function fiddleSave() {
	if (isdef(dFiddle)) {
		let codelist = arrChildren(dFiddle).slice(1).filter(x => !isEmptyOrWhiteSpace(x.value)).map(x => x.value);
		localStorage.setItem('codelist', JSON.stringify(codelist));
		lookupSetOverride(DB, ['env', 'fiddle'], codelist);
	} else console.log('fiddle closed - not saved')
}

function post_json(url, o, callback) {
	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(o)
	}).then(response => response.json()).then(response => callback(response));
}

function nundef(x) { return x === null || x === undefined; }

function getKeySets() {
	makeCategories();
	let res = {};
	for (const k in Syms) {
		let info = Syms[k];
		if (nundef(info.cats)) continue;
		for (const ksk of info.cats) {
			lookupAddIfToList(res, [ksk], k);
		}
	}
	res.animals = getAnimals();
	res.nature = getNature();
	localStorage.setItem('KeySets', JSON.stringify(res));
	return res;
}

function create_card_assets_c52() {
	let ranknames = { A: 'Ace', K: 'King', T: '10', J: 'Jack', Q: 'Queen' };
	let suitnames = { S: 'Spades', H: 'Hearts', C: 'Clubs', D: 'Diamonds' };
	let rankstr = '23456789TJQKA';
	let suitstr = 'SHDC';
	sz = 100;
	let di = {};
	for (const r of toLetters(rankstr)) {
		for (const s of toLetters(suitstr)) {
			let k = r + s;
			let info = di[k] = { key: k, val: 1, irank: rankstr.indexOf(r), isuit: suitstr.indexOf(s), rank: r, suit: s, color: RED, c52key: 'card_' + r + s, w: sz * .7, h: sz, sz: sz, ov: .25, friendly: `${isNumber(r) ? r : ranknames[r]} of ${suitnames[s]}`, short: `${r}${s}` };
			info.isort = info.isuit * 13 + info.irank;
		}
	}
	C52Cards = di;
	return di;
}

function assertion(cond) {
	if (!cond) {
		let args = [...arguments];
		for (const a of args) {
			console.log('\n', a);
		}
		throw new Error('TERMINATING!!!')
	}
}

function update(time) {
	var t = time - lastUpdate;
	lastUpdate = time;
	ball.update(t);
	ai.update();
	requestAnimationFrame(update);
}

function isdef(x) { return x !== null && x !== undefined; }

function arrChildren(elem) { return [...toElem(elem).children]; }

function isEmptyOrWhiteSpace(s) { return isEmpty(s.trim()); }

function lookupSetOverride(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				return null;
			} else {
				d[k] = val;
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (nundef(d[k])) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}

function makeCategories() {
	let keys = Categories = {
		animal: getGSGElements(g => g == 'Animals & Nature', s => startsWith(s, 'animal')),
		clothing: getGSGElements(g => g == 'Objects', s => s == 'clothing'),
		emotion: getGSGElements(g => g == 'Smileys & Emotion', s => startsWith(s, 'face') && !['face-costume', 'face-hat'].includes(s)),
		food: getGSGElements(g => g == 'Food & Drink', s => startsWith(s, 'food')),
		'game/toy': (['sparkler', 'firecracker', 'artist palette', 'balloon', 'confetti ball'].concat(ByGroupSubgroup['Activities']['game'])).sort(),
		gesture: getGSGElements(g => g == 'People & Body', s => startsWith(s, 'hand')),
		job: ByGroupSubgroup['People & Body']['job'],
		mammal: ByGroupSubgroup['Animals & Nature']['animal-mammal'],
		music: getGSGElements(g => g == 'Objects', s => startsWith(s, 'musi')),
		object: getGSGElements(g => g == 'Objects', s => true),
		place: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'place')),
		plant: getGSGElements(g => g == 'Animals & Nature' || g == 'Food & Drink', s => startsWith(s, 'plant') || s == 'food-vegetable' || s == 'food-fruit'),
		sport: ByGroupSubgroup['Activities']['sport'],
		tool: getGSGElements(g => g == 'Objects', s => s == 'tool'),
		transport: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'transport')),
	};
	let incompatible = DA.incompatibleCats = {
		animal: ['mammal'],
		clothing: ['object'],
		emotion: ['gesture'],
		food: ['plant', 'animal'],
		'game/toy': ['object', 'music'],
		gesture: ['emotion'],
		job: ['sport'],
		mammal: ['animal'],
		music: ['object', 'game/toy'],
		object: ['music', 'clothing', 'game/toy', 'tool'],
		place: [],
		plant: ['food'],
		sport: ['job'],
		tool: ['object'],
		transport: [],
	}
}

function lookupAddIfToList(dict, keys, val) {
	let lst = lookup(dict, keys);
	if (isList(lst) && lst.includes(val)) return;
	lookupAddToList(dict, keys, val);
}

function getAnimals() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		if (startsWith(sg, 'anim')) result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}

function getNature() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}

function toLetters(s) { return [...s]; }

function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }

function toElem(d) { return isString(d) ? mBy(d) : d; }

function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/gm, '');
}

function getGSGElements(gCond, sCond) {
	let keys = [];
	let byg = ByGroupSubgroup;
	for (const gKey in byg) {
		if (!gCond(gKey)) continue;
		for (const sKey in byg[gKey]) {
			if (!sCond(sKey)) continue;
			keys = keys.concat(byg[gKey][sKey]);
		}
	}
	return keys.sort();
}

function startsWith(s, sSub) {
	return s.substring(0, sSub.length) == sSub;
}

function lookup(dict, keys) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null;
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}

function isList(arr) { return Array.isArray(arr); }

function lookupAddToList(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (d[k] === undefined) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}

function isString(param) { return typeof param == 'string'; }

function mBy(id) { return document.getElementById(id); }

function last(arr) {
	return arr.length > 0 ? arr[arr.length - 1] : null;
}


