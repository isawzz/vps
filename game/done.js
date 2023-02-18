
function _computeClosure(symlist) {

	let keys = {};
	for (const k in CODE.di) { for (const k1 in CODE.di[k]) keys[k1] = CODE.di[k][k1]; }
	CODE.all = keys;

	CODE.keylist = Object.keys(keys)
	//console.log('keys',CODE.keylist);

	let inter = intersection(Object.keys(keys), Object.keys(window));
	//console.log('intersection',inter);

	//7748 in intersection, also ca 400 jeweils extra, ergibt total of 8500 keys ca.

	let done = {};
	let tbd = valf(symlist, ['_start']); //,'test100'];

	let MAX = 1007, i = 0;
	let alltext = '';

	while (!isEmpty(tbd)) {
		if (++i > MAX) break;

		let sym = tbd[0];
		let o = CODE.all[sym];
		if (nundef(o)) o = getObjectFromWindow(sym);
		//if (o.type == 'var' && !o.name.startsWith('d') && o.name == o.name.toLowerCase()) {tbd.shift(); continue; }
		if (o.type != 'func' && o.type != 'cla') { tbd.shift(); lookupSet(done, [o.type, sym], o); continue; }
		let olive = window[sym];
		if (nundef(olive)) { tbd.shift(); lookupSet(done, [o.type, sym], o); continue; }

		let text = olive.toString();
		if (!isEmpty(text)) alltext += text + '\r\n';

		let words = toWords(text, true); //console.log('words', words);

		//words = words.filter(x=>text.includes(' '+x));

		for (const w of words) {
			if (nundef(done[w]) && w != sym && isdef(CODE.all[w])) addIf(tbd, w);
		}
		tbd.shift();

		lookupSet(done, [o.type, sym], o); //done[sym] = o;
	}

	//console.log('_______________after', i, 'iter:')
	//console.log('done', done); //Object.keys(done));
	//console.log('tbd', tbd);

	let tres = '';
	for (const k of ['const', 'var', 'cla', 'func']) {
		console.log('done', k, done[k])
		let o = done[k]; if (nundef(o)) continue;
		let klist = get_keys(o);
		if (k == 'func') klist = sortCaseInsensitive(klist);
		else if (k == 'cla') klist = sortClassKeys(done);
		else if (k == 'const') klist = sortConstKeys(done).map(x => x.key);
		for (const k1 of klist) { //in done[k]) {
			//if (isLetter(k1) && k1 == k1.toLowerCase()) continue;
			let code = CODE.justcode[k1];
			//console.log('type',k,'key',k1,'code',code)
			if (!isEmptyOrWhiteSpace(code)) tres += code + '\r\n';
		}
	}

	return done;
	//console.log('result',tres);
	//downloadAsText(tres, 'mycode', 'js');
}
function computeClosure(keysOrText = []) {
	let done = {};
	let tbd = isList(keysOrText) ? keysOrText : extractKeywords(keysOrText);

	let MAX = 1007, i = 0;
	while (!isEmpty(tbd)) {
		if (++i > MAX) break;

		let sym = tbd[0];
		let o = CODE.all[sym];
		if (nundef(o)) o = getObjectFromWindow(sym);

		if (!o) { tbd.shift(); continue; } //window[sym] is NOT a function type

		o.code = nundef(CODE.all[sym]) ? o.toString() : CODE.justcode[sym];
		o.history = CODE.history[sym];

		let text = o.code.trim();
		let words = toWords(text, true); //console.log('words', words);
		//words = words.filter(x=>text.includes(' '+x));
		for (const w of words) {
			if (nundef(done[w]) && w != sym && isdef(CODE.all[w])) addIf(tbd, w);
		}
		tbd.shift();

		lookupSet(done, [o.type, sym], o); //done[sym] = o;
	}

	return done;
	//console.log('_______________after', i, 'iter:')
	//console.log('done', done); //Object.keys(done));
	//console.log('tbd', tbd);

	let tres = '';
	for (const k of ['const', 'var', 'cla', 'func']) {
		console.log('done', k, done[k])
		let o = done[k]; if (nundef(o)) continue;
		let klist = get_keys(o);
		if (k == 'func') klist = sortCaseInsensitive(klist);
		else if (k == 'cla') klist = sortClassKeys(done);
		else if (k == 'const') klist = sortConstKeys(done).map(x => x.key);
		for (const k1 of klist) { //in done[k]) {
			//if (isLetter(k1) && k1 == k1.toLowerCase()) continue;
			let code = CODE.justcode[k1];
			//console.log('type',k,'key',k1,'code',code)
			if (!isEmptyOrWhiteSpace(code)) tres += code + '\r\n';
		}
	}

	return done;
	//console.log('result',tres);
	//downloadAsText(tres, 'mycode', 'js');
}
function fiddleSearch(kws) {
	let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	console.log('fiddleSearch: keywords are', words);
	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	let records = dilist.filter(x => words.some(w => x.value.includes(w)));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), onclickCodeInSidebar);
	return records;
}
function extractKeywords(text) {
	let words = toWords(text, true); //console.log('words', words);
	//words = words.filter(x=>text.includes(' '+x));
	let res = [];
	for (const w of words) { if (isdef(CODE.all[w])) addIf(res, w); }
	return res;
}
async function loadCodebase(dir) {


	let path_js=isdef(dir)?(dir+'/z_all.js'):'../allcode.js';
	dir = isdef(dir)?dir:'../basejs';

	let text = CODE.text = await route_path_text(path_js);

	let keysSorted = [];
	let lines = text.split('\r\n');
	for (const l of lines) {
		if (['var', 'const', 'cla', 'func'].some(x => l.startsWith(x))) {
			let key = firstWordAfter(l, ' ', true);
			keysSorted.push(key);
		}
	}
	CODE.keysSorted = keysSorted;
	//console.log('keysSorted',keysSorted);

	CODE.di = await route_path_yaml_dict(dir+'/z_all.yaml');
	CODE.justcode = await route_path_yaml_dict(dir+'/z_allcode.yaml');
	CODE.codelist=dict2list(CODE.justcode,'key');
	CODE.history = await route_path_yaml_dict(dir+'/z_allhistory.yaml');
	let keys = {};
	for (const k in CODE.di) { for (const k1 in CODE.di[k]) keys[k1] = CODE.di[k][k1]; }
	CODE.all = keys;
	CODE.keylist = Object.keys(keys)
	//let inter = intersection(Object.keys(keys), Object.keys(window));
	//console.log('intersection',inter);
	//7748 in intersection, also ca 400 jeweils extra, ergibt total of 8500 keys ca.
}
function mButton(caption, handler, dParent, styles = {}, opts = {}) {
	addKeys({ bg: '#00000080', hpadding: 10, vpadding: 4, rounding: 8, cursor: 'pointer' }, styles);
	addKeys({ html: caption, onclick: handler, className: 'hop1' }, opts);
	return mDom(dParent, styles, opts);
}
function mDom(dParent, styles = {}, opts = {}) {
	let tag = valf(opts.tag, 'div');
	let d = document.createElement(tag);
	mAppend(dParent, d);
	if (tag == 'textarea') styles.wrap = 'hard';
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',

	};
	for (const opt in opts) { d[valf(aliases[opt], opt)] = opts[opt] };
	mStyle(d, styles);
	return d;
}
function mDomRest(dParent, styles, opts) {
	if (nundef(styles.w) && nundef(styles.w100)) addKeys({ wrest: true }, styles);
	if (nundef(styles.h) && nundef(styles.h100)) addKeys({ hrest: true }, styles);
	return mDom(dParent, styles, opts);
}
function mDom100(dParent, styles, opts) {
	if (nundef(styles.w) && nundef(styles.wrest)) addKeys({ w100: true }, styles);
	if (nundef(styles.h) && nundef(styles.hrest)) addKeys({ h100: true }, styles);
	return mDom(dParent, styles, opts);
}
function mGridFrom(d, m, cols, rows, cellstyles = {}) {
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let warr = toWords(line);
		//console.log('warr',warr)
		for (const w of warr) if (!words.includes(w)) words.push(w);
		//w.map(x => addIf(words, w));

	}
	//console.log('gta',gta);
	//console.log('words', words);
	let dParent = mDom100(d, { display: 'grid', 'grid-template-areas': gta });
	dParent.style.gridTemplateColumns = cols;
	dParent.style.gridTemplateRows = rows;
	for (const w of words) {
		let st = copyKeys({ 'grid-area': w }, cellstyles);
		let cell = window[w] = mDom(dParent, st, { id: w });//	,html:w.substring(1)})


	}
	//console.log('dParent',dParent); return;
	return dParent;
}
function mInput(dParent, styles = {}, opts = {}) {
	addKeys({ fz: 'inherit', fg: 'inherit', 'flex-grow': 1, bg: '#00000080', hpadding: 10, vpadding: 4, rounding: 8, cursor: 'pointer' }, styles);
	addKeys({ id: 'inpSearch', name: 'searchResult', className: 'hop1 plain', type: 'text', tag: 'input' }, opts)
	return mDom(dParent, styles, opts);

}
function mSearch(label, handler, dParent, styles = {}, opts = {}) {
	let html = `
    <form action="javascript:void(0);">
		<label>${label}</label>
    </form>
  `;
	let elem = mCreateFrom(html);
	mAppend(dParent, elem);
	mStyle(elem, { display: 'grid', 'align-items': 'center', w100: true, gap: 4, 'grid-template-columns': 'auto 1fr auto' });
	//mStyle(elem, { display: 'grid', w100: true, gap: 4, 'grid-template-columns': 'auto 1fr auto' });

	let inp = mInput(elem, styles, opts);

	let myhandler = () => handler(mBy(inp.id).value.trim()); // handler(toWords(mBy(inp.id).value));
	mButton('GO', myhandler, elem);
	elem.onsubmit = myhandler;

	return elem;
}
function myOnclickCodeInSidebar(ev) {
	let key = isString(ev) ? ev : ev.target.innerHTML;
	let text = CODE.justcode[key];
	AU.ta.value = text;
	let download = false;
	if (download) downloadAsText(text, 'hallo', 'js');
	return text;
}
function onclickCodeInSidebar(ev) {
	let key = isString(ev) ? ev : ev.target.innerHTML;
	let text = CODE.justcode[key];

	let ta = AU.ta; let dParent = null;
	if (nundef(ta)) {
		dParent = valf(dFiddle, dTable, document.body);
		let talist = dParent.getElementsByTagName('textarea');
		if (isEmpty(talist)) ta = mTextarea(null, null, dParent, { w: '100%' });
		else ta = talist[0];
	} else dParent = ta.parentNode;
	ta.value = text;
	let hideal = ta.scrollHeight;
	console.log('ta.scrollheight', hideal)

	//wie gross soll dParent sein? h sowie sidebar
	let hsidebar = window.innerHeight - 128; // getComputedStyle(dSidebar, 'height');
	mStyle(dParent, { hmax: hsidebar });

	let lines = text.split('\n');
	let min = lines.length + 1;

	mStyle(ta, { h: hideal, hmin: 50, hmax: hsidebar - 24 });
	ta.scrollTop = 0;

	let download = false;
	if (download) downloadAsText(text, 'hallo', 'js');
	return text;
}
function onclickTest(x) {
	console.log('TEST!', x)
}
function rColorTrans(opaPer = 100, lumPer = 70, satPer = 100, hue) {
	if (isList(hue) && hue.length > 2) {
		//interpret as choose one of these hues
		hue = rChoose(hue);
	} else if (isList(hue)) {
		//interpret as range min,max
		hue = Math.random() * (hue[1] - hue[0]) + hue[0];
	} else if (isdef(hue)) {
		//interpret as modulo
		hue = divInt(rHue(), hue) * hue;
	} else hue = Math.round(Math.random() * 360);
	//console.log('hue', hue)
	return hslToHslaString(hue, satPer, lumPer, opaPer / 100);
}
function runcode(code, callback = null) {
	let x = eval(code);
	if (callback) callback(x);
	else {
		console.log('===>result:', x);
		if (isdef(dMessage)) dMessage.innerHTML = isDict(x) ? JSON.stringify(x) : isdef(x) ? x.toString() : x;
	}
}
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
	console.log('starting const loop');
	console.log('const keys', tbd.length);
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






