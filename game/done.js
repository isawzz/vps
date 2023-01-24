//#region app
function generic_present(d, g) {

	let ui = ui_type_tile(g, d); return;
}
function get_app_presenter(id) {
	let di = {};
	return di[id] || generic_present;
}
//#endregion

//#region basemin NEW
//#endregion

//#region canvas loop
function set_context(item) {
	CONTEXT = isDict(item) ? item
		: isString(item) && isdef(Items[item]) ? Items[item]
			: isNumber(item) && isdef(Items[`_${item}`]) ? Items[`_${item}`]
				: get_values(Items)[0];
}
function reset_context() { CONTEXT = null; }
function startloop() { FR = 30; DA.interval = setInterval(update_draw_items, 1000 / FR) }
function pauseloop() { clearInterval(DA.interval); }
function update_draw_items() {
	//curitems = isdef(CONTEXT) ? isList(CONTEXT)?CONTEXT: [CONTEXT] : get_values(Items);
	for (const item of get_values(Items)) {
		//let item = Items[id];
		if (isdef(item.update)) item.update(item); //else console.log('id', id, 'no draw')
		if (isdef(item.draw)) item.draw(item); //else console.log('id', id, 'no draw')
	}
}
function rPosition(o) {
	let [xoff, yoff] = isdef(o.origin) ? [-o.origin.x, -o.origin.y] : [0, 0];
	return [o.x, o.y] = [rNumber(0, o.w) + xoff, rNumber(0, o.h) + yoff];
}
function rnPosition(o, speed) {
	let [xoff, yoff] = isdef(o.origin) ? [-o.origin.x, -o.origin.y] : [0, 0];
	return [o.x, o.y] = [rNoise('x', 0, o.w, speed) + xoff, rNoise('y', 0, o.h, speed) + yoff];
}
function rNoise(channel, min, max, speed = 0.02) {
	if (nundef(Perlin.channels[channel])) Perlin.channels[channel] = rNumber(0, 10000);
	let lastx = Perlin.channels[channel];
	if (nundef(speed)) speed = Perlin.speed;
	lastx += speed;
	Perlin.channels[channel] = lastx;
	let r01 = rPerlin(lastx);
	let n = map_range(r01, 0, 1, min, max);
	return n;
}
function rInc(o, prop, min, max) { o[prop] += rNumber(min, max); return o[prop]; }
//#endregion

//#region canvas draw+update
function draw_random_walk(item) {
	//console.log('id',item.id,item.x,item.y)
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	cEllipse(rInc(item, 'x', -2, 2), rInc(item, 'y', -2, 2), 30, 20, { bg: 'blue', fg: 'green' }, 0, cx);
}
function draw_perlin_x(item) {
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	let r = rPerlin(item.x);
	item.r = map_range(r, 0, 1, -item.w / 2, item.w / 2);
	cEllipse(item.r, 0, 25, 25, { bg: 'white' }, 0, cx);
	item.x += .02;
}
function draw_perlin_xy(item) {
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	item.randx = valf(item.randx, 0) + .01;
	item.randy = valf(item.randy, 10000) + .02;
	item.x = map_range(rPerlin(item.randx), 0, 1, -item.w / 2, item.w / 2);
	item.y = map_range(rPerlin(item.randy), 0, 1, -item.h / 2, item.h / 2);
	cEllipse(item.x, item.y, 25, 25, { bg: 'white' }, 0, cx);
}

//#endregion

//#region fiddle
function fiddleAdd(dParent, content, idx) {
	let ta = AU.ta = mTextarea(3, null, dParent, { fz: 16, padding: 10, family: 'tahoma', w: '100%', box: true });
	ta.addEventListener('keydown', fiddleControlHandler);
	DA.tribute.attach(ta);
	DA.tas.push(ta);
	ta.addEventListener('tribute-replaced', fiddleMessageHandler);
	if (isdef(content)) ta.value = content; 
	if (isdef(idx)) mInsertAt(dParent,ta,idx); //TESTEN!!!!!!!!!!!!!
	ta.focus();
}
function fiddleControlHandler(ev) {
	if (ev.ctrlKey) {
		let instance = DA.tribute; //.events.shouldDeactivate(ev);
		instance.isActive = false;
		instance.hideMenu();

		//console.log('ev.key', ev.key)
		if (ev.key == 'Enter') {
			runcode(ev.target.value);
		} else if (ev.key == '+' || ev.key == '=') {
			evStop(ev);
			fiddleAdd(dFiddle);
		} else if (ev.key == '-' || ev.key == '_') {
			//remove all empty fiddles
			evStop(ev);
			let empty = DA.tas.filter(x => isEmptyOrWhiteSpace(x.value));
			let elfocus = document.activeElement;
			let nofocus = false;
			for (const ta of empty) { if (ta == elfocus) nofocus = true; ta.remove(); }
			DA.tas = arrMinus(DA.tas, empty);
			if (isEmpty(DA.tas)) fiddleAdd(dFiddle);
			else if (nofocus) { AU.ta = DA.tas[0]; AU.ta.focus(); }
		} else if (ev.key == 'ArrowDown') {
			let ta = AU.ta = arrNext(DA.tas, AU.ta);
			ta.focus();
		} else if (ev.key == 'ArrowUp') {
			let ta = AU.ta = arrPrev(DA.tas, AU.ta);
			ta.focus();
		}
	}
}
function fiddleInit(dParent) {
	dFiddle = valf(dParent,dTable); 
	dMessage = mDiv(dFiddle, { w: '100%', bg: 'dimgray', fg: 'yellow', box: true, hpadding: 10 }, 'dMessage', 'enter code:');
	getGlobals();
	let list = Globals.function.map(x => ({ key: x.key, value: x.key + '(' }));
	DA.tas = [];

	var tributeAttributes = {
		autocompleteMode: true,
		//trigger: ' ',
		//noMatchTemplate: '', //null, //' ',
		noMatchTemplate: () => {
			return '<span style:"visibility: hidden;"></span>';
		},
		//values: function (text, cb) {			fiddleSearch(text, cb);		},
		values: fiddleSearch,
		selectTemplate: function (item) {
			//console.log('item',item)
			if (typeof item === 'undefined') return null;
			if (this.range.isContentEditable(this.current.element)) {
				return '<span contenteditable="false"><a>' + item.original.key + '</a></span>';
			}
			return item.original.value;
		},
		menuItemTemplate: function (item) {
			//console.log('item',item)
			return item.string;
		},
		replaceTextSuffix: '(',
		menuShowMinLength: 1,
	};
	var trib = DA.tribute = new Tribute(Object.assign({ menuContainer: dParent, }, tributeAttributes));

	//from localStorage get how many fiddles there should be plus content
	let saved = localStorage.getItem('codelist');
	let codelist = saved ? JSON.parse(saved) : [];
	//console.log('saved',saved)
	if (codelist.length == 0) codelist = [`console.log('hallo');`];
	for (const code of codelist) {
		fiddleAdd(dFiddle, code);
	}
	//create that many fiddles, at least 1 empty fiddle
	setTimeout(() => dFiddle.children[0].focus(), 100);
}
function fiddleMessageHandler(ev) {
	//console.log('Original Event:', ev.detail.event);
	//console.log('Matched item:', ev.detail.item);
	//if matched item is of type function
	let key = ev.detail.item.original.key;
	let item = window[key];
	if (typeof item == 'function') {
		//jetzt will ich param info!
		let d = mBy('dMessage');
		d.innerHTML = stringBefore(item.toString(), ') {') + ')';
	}

}
function fiddleSave() {
	if (isdef(dFiddle)) {
		let codelist=arrChildren(dFiddle).slice(1).filter(x=>!isEmptyOrWhiteSpace(x.value)).map(x => x.value);
		localStorage.setItem('codelist', JSON.stringify(codelist));
		lookupSetOverride(DB,['env','fiddle'],codelist);
	}else console.log('fiddle closed - not saved')
}
function fiddleSearch(text, callback) {
	//console.log('text', text)
	let list = Globals.function;
	let list1 = list.filter(x => startsWith(x.key, text));
	callback(list1);
}
function runcode(code, callback = null) {
	let x = eval(code);
	if (callback) callback(x); else console.log('result:', x);
}


//#endregion

//#region game
function collect_game_specific_options(game) {
	let poss = DB.games[game].options;
	if (nundef(poss)) return;
	let di = {};
	for (const p in poss) {
		let fs = mBy(`d_${p}`);
		//console.log('fs',fs, 'key',p);
		let val = get_checked_radios(fs)[0];
		di[p] = isNumber(val) ? Number(val) : val;
	}
	return di;
}
function create_random_players(n = 1) {
	//first player is solo player Ludwig van Beethoven
	let colors = rWheel(n);
	let res = [{ name: 'mimi', playmode: 'human', color: colors[0] }];
	let names = rChoose(MyNames, n - 1); // rName(n-1); 
	if (!isList(names)) names = [names];

	for (let i = 1; i < n; i++) {
		let pl = { name: names[i - 1], playmode: 'bot', color: colors[i], strategy: 'random' };
		res.push(pl);
	}
	return res;
}
function ev_to_gname(ev) { evNoBubble(ev); return evToTargetAttribute(ev, 'gamename'); }
function stop_game() { console.log('stopgame'); }
function start_game() {
	let gamename = DA.gamename;
	let options = collect_game_specific_options(gamename);
	//console.log('options nach collect',options)
	let players = DA.playerlist ? DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode, strategy: valf(x.strategy, options.strategy, 'random') })) : create_random_players(options.nplayers);
	//console.log('players are', players);
	_start_game(gamename, players, options); hide('dMenu');
	//console.log('startgame'); 
}
function _start_game(gamename, players, options) {
	//user is players[0] alle anderen sind robots
	//get setup
	//start game
}

function cancel_game() { iClear('dMenu'); } //console.log('cancelgame'); }


//#endregion

//#region Items i tags
function iTag(tags = ['canvas', 'textarea', 'a'], ignore_empty = true) {
	//every kind of tag in tags collect all such elements, give them ids, add them as Items
	for (const t of tags) {
		let uis = Array.from(document.getElementsByTagName(t));
		if (ignore_empty) uis = uis.filter(d => !isEmpty(d.innerHTML));
		//console.log('tagged:', uis.length, uis.map(x => x.id).join(','))
		for (const ui of uis) {
			if (isEmptyOrWhiteSpace(ui.id)) ui.id = getUID(); //console.log('id', ui.id);

			iAdd({}, { div: ui });
		}
	}
	setTimeout(show_tagged, 100);
}
function show_tagged() {
	if (isdef(DA.tags)) get_values(DA.tags).map(x => x.remove());

	let tpop = mPopup('', document.body)
	DA.tags = {};
	for (const id in Items) {
		//let d = iDiv(item);
		let el = mBy(id); //iDiv(item);
		if (nundef(el)) {
			//improper formatted item!!! or item without ui!!!
			let item = Items[id];
			el = iDiv(item);
			if (nundef(el)) continue;
			if (nundef(item.live)) { item.live = { div: el }; el.id = id; delete Items[id].div; }
		}
		console.log('id', id)
		let r = getRect(el);
		let dtag = mDiv(tpop, { fz: 12, bg: 'black', fg: 'white', hpadding: 4, rounding: 12 }, null, id)
		mPos(dtag, r.l, r.t);
		DA.tags[id] = dtag;
		// let d1 = mDiv(d, { fz: 12, bg: 'black', fg: 'white', hpadding: 4, rounding: 12 }, null, d.id);
		// mPlace(d1, 'tr', 2, 2);
	}
}
function iCollect(tags = ['div']) {
	//all elements of tag in tags that are non empty and have id are entered as Items
	for (const t of tags) {
		let divs = Array.from(document.getElementsByTagName(t)).filter(d => !isEmptyOrWhiteSpace(d.id) && !isEmpty(d.innerHTML));
		//console.log('show_ids', divs.length, divs.map(x => x.id).join(','))
		for (const d of divs) {
			iAdd({}, { div: d });
		}
	}
}
function show_div_ids() {
	let divs = Array.from(document.getElementsByTagName('div')).filter(d => !isEmptyOrWhiteSpace(d.id) && !isEmpty(d.innerHTML));
	//console.log('show_ids', divs.length, divs.map(x => x.id).join(','))
	for (const d of divs) {
		//console.log('div',d,d.id)
		//if (isEmptyOrWhiteSpace(d.id)) continue;
		let d1 = mDiv(d, { fz: 12, bg: 'black', fg: 'white', hpadding: 4, rounding: 12 }, null, d.id);

		mPlace(d1, 'tr', 2, 2);
		//console.log('d.id="' + d.id + '"')
	}
}

//#endregion

//#region page
function clear_all() { for (const id of ['dFiddle', 'dMenu', 'dSearch', 'dSearchResult', 'dTable']) iClear(id); console.log('ids', get_keys(Items)) }
function show_standard_title(dParent, title) { mText(title, dParent, { margin: 20, fz: 24 }); }
function show_apps(ms = 500) {
	let dParent = mBy('dApps');
	if (!isEmpty(arrChildren(dParent))) { show(dParent); return; }

	//iClear(dParent); 	//transition
	//mStyle(dParent, { animation: `wipe-in-bottom-right ${ms}ms` });

	show_standard_title(dParent, 'Apps');
	let d = mDiv(dParent, { fg: 'white' }, 'apps_menu');
	mCenterFlex(d);
	let applist = 'action book fitbit howto magic meditate therapy';
	for (const id of toWords(applist)) { //dict2list(DB.apps)) {
		let app = DB.apps[id]; app.name = id; let f = get_app_presenter(app.id); f(d, app);
		//if (gamelist.includes(app.id)) { let f = get_app_presenter(app.id); f(d, app); }
	}
}
function show_fiddle() { fiddleInit(); }
function show_games(ms = 500) {
	let dParent = mBy('dGames');
	iClear(dParent);

	//transition
	//mStyle(dParent, { animation: `wipe-in-bottom-right ${ms}ms` })

	show_standard_title(dParent, 'Games');
	let d = mDiv(dParent, { fg: 'white' }, 'game_menu');
	mCenterFlex(d); //mFlexWrap(d);
	let gamelist = 'goalnumber reversi'; //'aristo bluff spotit ferro fritz'; if (DA.TEST0) gamelist += ' a_game';
	for (const g of dict2list(DB.games)) {
		if (gamelist.includes(g.id)) {
			let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
			let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id, null, 'hop1');
			d1.setAttribute('gamename', g.id);
			d1.onclick = onclick_game_menu_item;
			mCenterFlex(d1);
			mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
			mLinebreak(d1, 4);
			mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);
		}
	}
}
function showGlobals() {
	getGlobals();
	console.log('Globals',Globals)
	dTable = mBy('dTable');
	let d = mDiv(dTable);

	for (const k in Globals) {
		let d1 = mDiv(d, {}, null, k);
		let d2 = mDiv(d, {}, null, Globals[k].map(x => x.key).join(',')); mFlexWrap(d2);
	}
}
function show_game_options_menu(gamename) {
	let dMenu = mBy('dMenu'); iClear(dMenu);
	//dMenu.innerHTML = 'HALLO';return;
	show_standard_title(dMenu, 'Game Options');

	let d = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
	let dOptions = mDiv(d, {}, 'dMenuInput'); mCenterFlex(dOptions);
	let dButtons = mDiv(d, { display: 'flex', justify: 'center', w: '100%' }, 'dMenuButtons');

	//soll es players geben? NEIN
	DA.playerlist = null;

	//game options
	show_game_options(dOptions, gamename);

	//button start and cancel
	let astart = maButton('Start', start_game, dButtons);
	let acancel = maButton('Cancel', cancel_game, dButtons);
}
function show_game_options(dParent, gamename) {
	DA.gamename = gamename;
	mRemoveChildrenFromIndex(dParent, 2);
	let poss = DB.games[gamename].options;
	if (nundef(poss)) return;
	for (const p in poss) {
		let key = p;
		let val = poss[p];
		if (isString(val)) {
			let list = val.split(','); // make a list 
			let fs = mRadioGroup(dParent, { maright: 12 }, `d_${key}`, key);
			for (const v of list) { mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { vmargin: 4, align: 'left', cursor: 'pointer' }, null, key, true); }
			measure_fieldset(fs);
		}
	}
}
function toggle_apps() { if (isEmpty(mBy('dApps').innerHTML)) show_apps(); else iClear('dApps'); }
function toggle_fiddle() { if (nundef(dFiddle)) show_fiddle(); else { fiddleSave(); iClear(dFiddle); dFiddle = null; } }
function toggle_games() { if (isEmpty(mBy('dGames').innerHTML)) show_games(); else iClear('dGames'); }
//#endregion



































