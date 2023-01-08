//#region app
function generic_present(d, g) {

	let ui = ui_type_tile(g, d); return;
}
function get_app_presenter(id) {
	let di = {};
	return di[id] || generic_present;
}
//#endregion

//#region autocomplete in textarea
function au_show_list() {
	let [popup, ta, fnames] = [AU.popup, AU.ta, AU.fnames];

	//console.log('prefix', AU.prefix)
	if (isEmpty(AU.prefix)) au_reset(); //hide(popup);
	else {
		AU.list = fnames.filter(x => startsWith(x, AU.prefix));

		if (isEmpty(AU.list)) {
			AU.list = Object.keys(window).filter(x => startsWith(x, AU.prefix));
			AU.list = AU.list.concat(get_keys(CODE.consts).filter(x => startsWith(x, AU.prefix)));

			//add to that Items keys
			AU.list = AU.list.concat(get_keys(Items).filter(x => startsWith(x, AU.prefix)));

		}
		if (isEmpty(AU.list)) {
			hide(popup);
		} else {
			let mousepos = getCaretCoordinates(ta, ta.selectionStart - AU.prefix.length);
			//console.log('mousepos',mousepos)
			//let r = getRect(ta);
			//let r2=getRect(dCode);
			//console.log('ta',r.l,'ta-parent',r2.left)
			//console.log('r',r.l,r.t)
			//console.log('mousepos', mousepos);
			show(popup)
			mPos(popup, mousepos.left + 10, mousepos.top + 30); // + 18, mousepos.top + 25);
			// mPos(popup, mousepos.left + 18, mousepos.top + 25);
			iClear(popup);
			AU.n = -1;
			AU.selected = null;
			for (const w of AU.list) {

				if (isdef(CODE.funcs[w])) mDiv(popup, {}, w, CODE.funcs[w].sig); 
				else mDiv(popup, {}, w, w)
			}
		}
	}
}
function au_reset() {
	AU.list = [];
	AU.prefix = '';
	AU.n = -1;
	AU.selected = null;
	hide(AU.popup);
	AU.detect = false;

}
function au_select_down() {
	if (AU.n < AU.list.length - 1) AU.n++;
	let ch = AU.popup.children;
	if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
	AU.selected = ch[AU.n];
	mStyle(AU.selected, { bg: 'green' });

}
function au_run() { au_reset(); runcode(AU.ta.value); show_div_ids(); }
function au_run_line() { au_reset(); runcode(getTextAreaCurrentLine(AU.ta)); }
function getTextAreaCurrentLine(el) {
	let line = '';
	if (el instanceof HTMLTextAreaElement) {
		// unlike substring, slice gives empty string when (1,0)
		line = el.value.slice(el.value.lastIndexOf('\n', el.selectionStart - 1) + 1,
			((end = el.value.indexOf('\n', el.selectionStart)) => end > -1 ? end : undefined)());
	}
	//document.getElementById('result').innerHTML = '"'+line+'"';
	return line;
}
function getTextAreaCurrentWord(el) {
	let line = '', w = '', prefix = '';
	if (el instanceof HTMLTextAreaElement) {
		let s = el.value;
		let i_caret = el.selectionEnd;
		let i_last_break_before_caret = s.lastIndexOf('\n', i_caret - 1); if (i_last_break_before_caret < 0) i_last_break_before_caret = 0;
		let i_next_break = s.indexOf('\n', i_caret); if (i_next_break < 0) i_next_break = s.length - 1;
		let i_caret_within_line = i_caret - i_last_break_before_caret;
		line = s.slice(i_last_break_before_caret + 1, i_next_break);

		let pos = i_caret_within_line - 2;
		console.log('_________\nline:', line, '\ni_caret=' + i_caret, 'i_in_line=' + pos);
		for (let i = pos; i >= 0; i--) {
			let ch = line[i];
			if (isAlphaNum(ch)) w = ch + w; else break;
		}
		prefix = w;

		for (let i = pos + 1; i < line.length; i++) {
			let ch = line[i];
			if (isAlphaNum(ch)) w = w + ch; else break;
		}
	}
	return [w, prefix];
}
//#endregion

//#region basemin NEW
function arrAverage(arr, prop) {
	let n = arr.length; if (!n) return 0;
	let sum = arrSum(arr, prop);
	return sum / n;
}
function getCaretCoordinates(element, position, options) {
	var properties = [
		'direction',  // RTL support
		'boxSizing',
		'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
		'height',
		'overflowX',
		'overflowY',  // copy the scrollbar for IE

		'borderTopWidth',
		'borderRightWidth',
		'borderBottomWidth',
		'borderLeftWidth',
		'borderStyle',

		'paddingTop',
		'paddingRight',
		'paddingBottom',
		'paddingLeft',

		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		'fontStyle',
		'fontVariant',
		'fontWeight',
		'fontStretch',
		'fontSize',
		'fontSizeAdjust',
		'lineHeight',
		'fontFamily',

		'textAlign',
		'textTransform',
		'textIndent',
		'textDecoration',  // might not make a difference, but better be safe

		'letterSpacing',
		'wordSpacing',

		'tabSize',
		'MozTabSize'

	];

	var isBrowser = (typeof window !== 'undefined');
	var isFirefox = (isBrowser && window.mozInnerScreenX != null);
	if (!isBrowser) {
		throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
	}

	var debug = options && options.debug || false;
	if (debug) {
		var el = document.querySelector('#input-textarea-caret-position-mirror-div');
		if (el) el.parentNode.removeChild(el);
	}

	// The mirror div will replicate the textarea's style
	var div = document.createElement('div');
	div.id = 'input-textarea-caret-position-mirror-div';
	document.body.appendChild(div);

	var style = div.style;
	var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
	var isInput = element.nodeName === 'INPUT';

	// Default textarea styles
	style.whiteSpace = 'pre-wrap';
	if (!isInput) style.wordWrap = 'break-word';  // only for textarea-s

	// Position off-screen
	style.position = 'absolute';  // required to return coordinates properly
	if (!debug) style.visibility = 'hidden';  // not 'display: none' because we want rendering

	// Transfer the element's properties to the div
	properties.forEach(function (prop) {
		if (isInput && prop === 'lineHeight') {
			// Special case for <input>s because text is rendered centered and line height may be != height
			if (computed.boxSizing === "border-box") {
				var height = parseInt(computed.height);
				var outerHeight =
					parseInt(computed.paddingTop) +
					parseInt(computed.paddingBottom) +
					parseInt(computed.borderTopWidth) +
					parseInt(computed.borderBottomWidth);
				var targetHeight = outerHeight + parseInt(computed.lineHeight);
				if (height > targetHeight) {
					style.lineHeight = height - outerHeight + "px";
				} else if (height === targetHeight) {
					style.lineHeight = computed.lineHeight;
				} else {
					style.lineHeight = 0;
				}
			} else {
				style.lineHeight = computed.height;
			}
		} else {
			style[prop] = computed[prop];
		}
	});

	if (isFirefox) {
		// Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
		if (element.scrollHeight > parseInt(computed.height))
			style.overflowY = 'scroll';
	} else {
		style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
	}

	div.textContent = element.value.substring(0, position);
	// The second special handling for input type="text" vs textarea:
	// spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
	if (isInput)
		div.textContent = div.textContent.replace(/\s/g, '\u00a0');

	var span = document.createElement('span');
	// Wrapping must be replicated *exactly*, including when a long word gets
	// onto the next line, with whitespace at the end of the line before (#7).
	// The  *only* reliable way to do that is to copy the *entire* rest of the
	// textarea's content into the <span> created at the caret position.
	// For inputs, just '.' would be enough, but no need to bother.
	span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
	div.appendChild(span);

	var coordinates = {
		top: span.offsetTop + parseInt(computed['borderTopWidth']),
		left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
		height: parseInt(computed['lineHeight'])
	};

	if (debug) {
		span.style.backgroundColor = '#aaa';
	} else {
		document.body.removeChild(div);
	}

	return coordinates;
}
function rName(n = 1) { let arr = MyNames; return rChoose(arr, n); }
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
function create_fiddle(dParent, code, rows=10, cols=120) {
	let [ta, buttons, tacon] = create_fiddle_ui(dParent, code, rows, cols);
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
		} else if (k == 'Escape' && !isEmpty(AU.list)) {
			au_reset();
		} else if (k == 'Enter' && AU.selected) {
			//insert at caret!
			let w = AU.selected.innerHTML; //enthaelt params auch!
			let params = stringAfter(w, '(');
			let funcname = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix); // s is portion of select entry that is NOT in ta
			let before = AU.ta.value.slice(0, AU.ta.selectionEnd);
			let after = AU.ta.value.slice(AU.ta.selectionEnd);
			AU.ta.value = before + s + after;
			ta.selectionEnd = (before + s).length;
			au_reset();
		} else if (k == 'ArrowDown' && !isEmpty(AU.list)) {
			au_select_down();
		} else if (k == 'ArrowUp' && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
			//} else if (k.startsWith('Arrow')){


		} else if ('abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(k) && !ev.ctrlKey) { //(isAlphaNum(k) || k == '_') && k!='Shift') {
			//console.log('pressed letter', k); //YES!

			let icaret = AU.ta.selectionEnd; //getCaretPosition(AU.ta);
			let line = getTextAreaCurrentLine(AU.ta);
			//console.log('line',line)
			let iline = AU.ta.value.indexOf(line);
			let i = icaret - iline; //ok
			//console.log('i',i);
			let [istart, m] = lastIndexOfAny(line, [',', ' ', ')', '(', '{', '}', ';'], i - 1);
			let pf = line.slice(0, i);
			if (istart >= 0) pf = line.slice(istart + 1, i);
			//console.log('i:' + i, 'istart:' + istart, 'match:' + m, '\n==>pre:' + pf);

			AU.prefix = pf;
			au_show_list();
			if (!isEmpty(AU.list)) au_select_down();

		} else if (k != 'Shift') {
			au_reset();
			//console.log('ELSE!!!!!!!!!')
		}
	}
}
function create_fiddle_ui(dParent, code, rows, cols) {
	mStyle(dParent, { position: 'relative' }); //, align:'center' });
	let ta = mTextArea(rows, cols, dParent, { padding: 20, position: 'relative' }, 'taCode');
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: getRect(ta).w, align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(1, cols, dParent, { matop: 4, hpadding: 20, vpadding: 10, position: 'relative' }, 'taConsole');
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	AU.fnames = get_keys(CODE.funcs); AU.fnames.sort();
	AU.ta = ta; AU.tacon = tacon;
	au_reset();
	if (nundef(code)) { code = localStorage.getItem('code'); if (nundef(code)) code = `pause();`; }
	else {
		var tab = RegExp("\\t", "g");
		code = code.toString().replace(tab, ' ');
	}
	AU.ta.value = code;
	return [ta, buttons, tacon];
}
function runcode(code) {
	let x = eval(code);
	AU.tacon.value = x;
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
function show_fiddle(code,rows,cols,fiddlestyles) {
	let dFiddle = mBy('dFiddle'); iClear(dFiddle); mCenterFlex(dFiddle);	//transition
	if (isdef(fiddlestyles)) mStyle(dFiddle,fiddlestyles)
	create_fiddle(dFiddle, code,rows,cols);
}
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
function toggle_fiddle() { if (isEmpty(mBy('dFiddle').innerHTML)) show_fiddle(); else iClear('dFiddle'); }
function toggle_games() { if (isEmpty(mBy('dGames').innerHTML)) show_games(); else iClear('dGames'); }
//#endregion



































