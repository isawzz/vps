function mStyle(elem, styles, unit = 'px') {

	elem = toElem(elem);
	let bg, fg;
	if (isdef(styles.bg) || isdef(styles.fg)) {
		[bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
	}
	if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
		let rtop = '' + valf(styles.upperRounding, 0) + unit;
		let rbot = '' + valf(styles.lowerRounding, 0) + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	}
	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	if (isdef(styles.round)) styles['border-radius'] = '50%';

	for (const k in styles) {
		let val = styles[k];
		if (k == 'vmargin') styles.mabottom = styles.matop = val;
		else if (k == 'hmargin') styles.maleft = styles.maright = val;
		else if (k == 'vpadding') styles.pabottom = styles.patop = val;
		else if (k == 'hpadding') styles.paleft = styles.paright = val;
	}

	for (const k in styles) {
		let val = styles[k];
		let key = k;
		//console.log('key',key)
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
		else if (k == 'font' && !isString(val)) {
			//font would be specified as an object w/ size,family,variant,bold,italic
			// NOTE: size and family MUST be present!!!!!!! in order to use font param!!!!
			let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
			let ff = f.family;
			let fv = f.variant;
			let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
			let fs = isdef(f.italic) ? 'italic' : f.style;
			if (nundef(fz) || nundef(ff)) return null;
			let s = fz + ' ' + ff;
			if (isdef(fw)) s = fw + ' ' + s;
			if (isdef(fv)) s = fv + ' ' + s;
			if (isdef(fs)) s = fs + ' ' + s;
			elem.style.setProperty(k, s);
			continue;
		} else if (k.toLowerCase() == 'classname') {
			mClass(elem, styles[k]);
		} else if (k == 'border') {
			//console.log('________________________YES!')
			if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
			if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
		} else if (k == 'ajcenter') {
			elem.style.setProperty('justify-content', 'center');
			elem.style.setProperty('align-items', 'center');
		} else if (k == 'layout') {
			if (val[0] == 'f') {
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'flex');
				elem.style.setProperty('flex-wrap', 'wrap');
				let hor, vert;
				if (val.length == 1) hor = vert = 'center';
				else {
					let di = { c: 'center', s: 'start', e: 'end' };
					hor = di[val[1]];
					vert = di[val[2]];

				}
				let justStyle = val[0] == 'v' ? vert : hor;
				let alignStyle = val[0] == 'v' ? hor : vert;
				elem.style.setProperty('justify-content', justStyle);
				elem.style.setProperty('align-items', alignStyle);
				switch (val[0]) {
					case 'v': elem.style.setProperty('flex-direction', 'column'); break;
					case 'h': elem.style.setProperty('flex-direction', 'row'); break;
				}
			} else if (val[0] == 'g') {
				//layout:'g_15_240' 15 columns, each col 240 pixels wide
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'grid');
				let n = allNumbers(val);
				let cols = n[0];
				let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
				elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
				elem.style.setProperty('place-content', 'center');
			}
		} else if (k == 'layflex') {
			elem.style.setProperty('display', 'flex');
			elem.style.setProperty('flex', '0 1 auto');
			elem.style.setProperty('flex-wrap', 'wrap');
			if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
		} else if (k == 'laygrid') {
			elem.style.setProperty('display', 'grid');
			let n = allNumbers(val);
			let cols = n[0];
			let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
			elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
			elem.style.setProperty('place-content', 'center');
		}

		//console.log(key,val,isNaN(val));if (isNaN(val) && key!='font-size') continue;
		//if (k == 'bg') console.log('style', k, key, val, bg)

		if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
		else if (key == 'background-color') elem.style.background = bg;
		else if (key == 'color') elem.style.color = fg;
		else if (key == 'opacity') elem.style.opacity = val;
		else if (key == 'wrap') elem.style.flexWrap = 'wrap';
		else if (startsWith(k, 'dir')) {
			//console.log('.................................................!!!!!!!!!!!!!!!!!!!!!!!')
			//console.log('val',val);
			isCol = val[0] == 'c';
			elem.style.setProperty('flex-direction', 'column'); //flexDirection = isCol ? 'column' : 'row';
			//in order for this to work, HAVE TO set wmax or hmax!!!!!!!!!!!!!
			// if (isCol && nundef(styles.hmax)) { //?????????????? WTF??????????????????
			// 	let rect = getRect(elem.parentNode); //console.log('rect', rect);
			// 	elem.style.maxHeight = rect.h * .9;
			// 	elem.style.alignContent = 'start';
			// } else if (nundef(styles.wmax)) elem.style.maxWidth = '90%';
		} else if (key == 'flex') {
			if (isNumber(val)) val = '' + val + ' 1 0%';
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else {
			//console.log('set property',key,makeUnitString(val,unit),val,isNaN(val));
			//if ()
			elem.style.setProperty(key, makeUnitString(val, unit));
		}
	}
}


//#region get word at caret in textarea
function returnWord(text, caretPos) {
	var index = text.indexOf(caretPos);
	var preText = text.substring(0, caretPos);
	if (preText.indexOf(" ") > 0) {
		var words = preText.split(" ");
		return words[words.length - 1]; //return last word
	} else if (preText.indexOf("\n") > 0) {

		var words = preText.split("\n");
		return words[words.length - 1]; //return last word
	} else {
		return preText;
	}
}

function alertPrevWord() {
	var ta = document.getElementById("textArea");
	var caretPos = getCaretPosition(ta)
	var word = returnWord(ta.value, caretPos);
	if (word != null) {
		alert(word);
	}

}

function getCaretPosition(ctrl) {
	var caret_pos = 0;   // IE Support
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		caret_pos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		caret_pos = ctrl.selectionStart;
	return (caret_pos);
}

//#endregion

function create_day() {
	// available: j l q u x y z
	let list = 'action bath caffeine dunder essen fam ges haushalt interrupt kitchen meditate notion odf piano relax sleep therapy violin walk';
	list = 'action chillax lesen klavier pause random sleep walk';
	let body = 'gehen liegen sitzen';
	let communicate = 'stille musik hoeren sprechen';
	let mind = 'denken ges musik reden spiel tv';
	let channels = 'bliss observer ego'; //'future now past';
	let ego = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let negsubjects = 'finance leute moving nasi prison oasis reise';
	let possubjects = 'beethoven freiheit games klavier math music number programming spaz tod zauber';
	let moods = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let poswords = 'himmel engel math algebra skyblue klavier beethoven spaziergang backen office redmond microsoft games';
	let negwords = 'wien menschen oasis immobilien geld finanzen erledigungen termin nasi prison past future taxes';

	//ich haett so gern einen job bei ms aber dazu muss ich das ego bisschen reduzieren
	//was muss ich machen um einen job bei ms zu bekommen? ist das nicht ein valid goal egal jetzt ob ich es tatsaechlich realisiere, einfach es in my mind so gestalten
	//ein jms besteht in: 
	//- prog 9-5 dh 8x60=500' per day, 3k' per week
	//- design documents schreiben: do NOT write code without plan!
	//- dazwischen sind paar meetings: die muss ich auch simulieren
	//- I have a boss / manager who tells me what the requirements are
	//- there are timelines and deadlines
	//- there is some learning / edu involved as well!
	//- best practice has to be followed

	//clearly, a portfolio and a skill set is what I need!
	//ich muss eine loesung finden fuer:
	// - vergessen von gelerntem
	// - unter zeitdruck arbeiten koennen
	// - energie-mangel during day
	// - vereinbarung mit real-life pflichten (fam stuff)

}
function eval_code() {
	let code = G.textarea.value;

	// let statements = code.split(';').map(x=>x.trim());
	// for(const st of statements) eval(st)
	eval(code);
}

function create_fiddle1(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && ev.ctrlKey && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == 'Escape' && !isEmpty(AU.list)) {
			au_reset();
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'ArrowDown' && ev.ctrlKey && !isEmpty(AU.list) ) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && ev.ctrlKey && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else {
			let [w,prefix]=getTextAreaCurrentWord(AU.ta);
			console.log('current word',w,prefix);
			AU.prefix=prefix;
			au_show_list();
		}
	}
}
function create_fiddle0(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == ' ' || k == ')') {
			AU.previous = AU.prefix;
			//if completed existing function, now is the time to display params!
			if (isdef(AU.fnames[AU.previous])) {
				let w = AU.selected = AU.previous;
				//AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
				AU.uebernommen = DA.funcs[w];
				//show(popup)
				popup.innerHTML = AU.previous + '(' + AU.uebernommen.params + ')';
			} else {
				au_reset();
			}
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'Backspace' && AU.prefix.length > 1) {
			AU.prefix = AU.prefix.slice(0, -1);
			au_show_list();
		} else if (k == 'ArrowDown' && !isEmpty(AU.list)) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (isLetter(k) || k == '_') {
			//console.log('pressed letter', k); //YES!
			if (isEmpty(AU.prefix)) AU.selectionEnd = AU.ta.selectionEnd;
			AU.prefix += k;
			au_show_list();

		} else if (k != 'Shift') {
			au_reset();
			//console.log('ELSE!!!!!!!!!')
		}
	}
}

function getTextAreaCurrentWord_(el) {
	let line = '', word = '';
	if (el instanceof HTMLTextAreaElement) {
		let s = el.value;
		let i_caret = el.selectionStart;
		let i_last_break_before_caret = s.lastIndexOf('\n', i_caret - 1);
		if (i_last_break_before_caret < 0) i_last_break_before_caret = 0;
		let i_next_break = s.indexOf('\n', i_caret);
		if (i_next_break < 0) i_next_break = s.length - 1;
		let i_caret_within_line = i_caret - i_last_break_before_caret;
		line = s.slice(i_last_break_before_caret + 1, i_next_break);

		let i_space_before = line.lastIndexOf(' ', i_caret_within_line - 1);
		if (i_space_before < 0) i_space_before = 0;

		let i_space_after = line.indexOf(' ', i_caret_within_line);
		if (i_space_after < 0) i_space_after = line.length - 1;

		word = line.slice(i_space_before, i_space_after);

	}
	//document.getElementById('result').innerHTML = '"'+line+'"';
	return word;
}
function mSidebar() {
	let d = document.body;
	mDiv(d, { float: 'left', h: '100vh' }, 'dSidebar', 'HALLO', 'section');
}


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

