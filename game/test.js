
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
function create_fiddle(dParent) {
	let [ta, buttons, tacon] = create_fiddle_ui(dParent);
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
function create_fiddle_ui(dParent) {
	mStyle(dParent, { position: 'relative' }); //, align:'center' });
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' }, 'taCode');
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: getRect(ta).w, align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' }, 'taConsole');
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort();
	AU.ta = ta; AU.tacon = tacon;
	au_reset();
	let code = localStorage.getItem('code'); if (nundef(code)) code = `pause();`; AU.ta.value = code;

	return [ta, buttons, tacon];
}
function runcode(code) {
	let x = eval(code);
	AU.tacon.value = x;
}

async function sidebar_load(url) {
	let code = await route_path_text(url);
	//jetzt brauch ich alle functions in dem code und alle globals
	let functions = parse_funcs(code);
	//console.log('functions', functions);
	let keys = get_keys(functions);
	keys.sort();
	//console.log('keys', keys);
	for (const k of keys) {
		mDiv(dSidebar, { w: 100 }, null, functions[k].name)
	}
}
function test4_intelli() {
	dTable = dTable = mSection({ position: 'relative' }, 'dTable'); mCenterFlex(dTable);
	let ta = mTextArea(10, 90, dTable, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	// setTimeout(()=>ta.focus(),100); //ta.autofocus=true,10);
	let buttons = mDiv(dTable, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dTable, { matop: 4, padding: 20, position: 'relative' });

	//dSidebar = mBy('dSidebar');	sidebar_load('../basejs/board.js');
	ta.focus();


	// ta.addEventListener('input', function () {
	// 	// var caret = getCaretCoordinates(this, this.selectionEnd);
	// 	// console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
	// })

	AU.popup = mDiv(dTable, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)

	AU.fnames = get_keys(DA.funcs); AU.fnames.sort();
	AU.list = [];
	AU.prefix = '';
	AU.selected = null;
	AU.n = -1;
	AU.ta = ta;
	AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key;
		let fnames = AU.fnames;
		let popup = AU.popup;
		//console.log('keyup!!!!!!!!!!!:', k);
		// if (k == 'Enter') {
		// 	console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAA', ev)

		// 	if (is_key_down('Control')) console.log('CONTROL!!!!!!')
		// 	if (is_key_down('control')) console.log('CONTROL!!!!!!')
		// 	if (ev.ctrlKey) console.log('CONTROL!!!!!!')
		// 	if (ev.altKey) console.log('ALT!!!!!!')
		// 	if (ev.shiftKey) console.log('SHIFT!!!!!!')
		// 	if (ev.metaKey) console.log('META!!!!!!'); //das ist der window key aber er suppressed Enter, so never come here!
		// 	return;
		// }
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
		//if ()










	}

}

function startloop() { FR = 30; DA.interval = setInterval(draw_canvases, 1000 / FR) }
function pauseloop() { clearInterval(DA.interval); }
function rPosition(o) { return [rNumber(0, o.w), rNumber(0, o.h)]; }
function rInc(o, prop, min, max) { o[prop] += rNumber(min, max); return o[prop]; }
function draw_canvases() {
	//console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
	for (const id in Items) {
		let canvas = Items[id];
		//console.log('canvas',canvas,canvas.draw)
		if (isdef(canvas.draw)) canvas.draw(canvas); //else console.log('id', id, 'no draw')
	}
}
function draw_perlin_xy(item) {
	let [cv,cx]=[item.live.cv,item.live.cx];
	cClear(cv,cx);
	item.randx = valf(item.randx, 0) + .01;
	item.randy = valf(item.randy, 10000) + .02;
	item.x = map_range(rPerlin(item.randx), 0, 1, -item.w / 2, item.w / 2);
	item.y = map_range(rPerlin(item.randy), 0, 1, -item.h / 2, item.h / 2);
	cEllipse(item.x, item.y, 25, 25, { bg: 'white' }, 0, cx);
}
function test3_p5_perlin_2d() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_xy }); // () => draw_perlin_xy(o) });
	o.play();
}
function draw_perlin_x(item) {
	let [cv,cx]=[item.live.cv,item.live.cx];
	cClear(cv,cx);
	let r = rPerlin(item.x);
	item.r = map_range(r, 0, 1, -item.w / 2, item.w / 2);
	cEllipse(item.r, 0, 25, 25, { bg: 'white' }, 0, cx);
	item.x += .02;
}
function test2_p5_perlin() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_x }); // () => draw_perlin_x(o) });
	o.play();
}
function draw_random_walk(item) {
	//console.log('id',item.id,item.x,item.y)
	let [cv,cx]=[item.live.cv,item.live.cx];
	cClear(cv,cx);
	cEllipse(rInc(item, 'x', -2, 2), rInc(item, 'y', -2, 2), 30, 20, { bg: 'blue', fg: 'green' }, 0, cx);
}
function test4() { test2(); }
function test3() { test1(); }
function test2() {
}
function test1_p5_init() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_random_walk }); // draw: () => draw_random_walk(o) });
}

function test0_random() {

	let n = rNumber(12, 20); //there is no function random in js (it is in p5)
	console.log('n', n)

}













