
function _mySearch(kws) {
	let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	console.log('fiddleSearch: keywords are', words);
	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	// let records = dilist.filter(x => words.some(w => x.value.includes(w)));

	//let regex=new RegExp(`\\${w}\\b`,'i');
	let records = dilist.filter(x => words.some(w => x.key.match(new RegExp(`\\${w}\\b`, 'i'))));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), myOnclickCodeInSidebar);
	return records;
}

function mySearch(kws) {
	//let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	//console.log('fiddleSearch: keywords are', words);
	let arr = CODE.codelist; //[{key value},...]

	//have words and have keys and code for keys
	//1. test if code contains some keyword
	let patt = isList(kws) ? kws.join('|') : replaceAll(kws, ' ', '|');
	let regex = new RegExp(`\\b${patt}\\b`);
	console.log('patt',patt)
	let res = arr.filter(x => regex.test(x.value)); // words.some(w=>)
	let keys = res.map(x => x.key);
	console.log('keys', keys);
	show_sidebar(keys, myOnclickCodeInSidebar);
	return;


	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	// let records = dilist.filter(x => words.some(w => x.value.includes(w)));

	//let regex=new RegExp(`\\${w}\\b`,'i');
	let records = dilist.filter(x => words.some(w => x.key.match(new RegExp(`\\${w}\\b`, 'i'))));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), myOnclickCodeInSidebar);
	return records;
}

function mStyle1(d, styles) {
	if (isdef(styles.whrest)) { delete styles.whrest; styles.w = styles.h = 'rest'; } else if (isdef(styles.wh100)) { styles.w = styles.h = '100%'; delete styles.wh100;  }
	if (isdef(styles.w100)) styles.w = '100%'; else if (isdef(styles.wrest)) styles.w = 'rest';
	if (isdef(styles.h100)) styles.h = '100%'; else if (isdef(styles.hrest)) styles.h = 'rest';
	console.log('styles',d.id,styles)
	let dParent = d.parentNode;
	let pad = parseInt(valf(dParent.style.padding, '0'));
	let r = getRect(d, dParent);
	if (styles.w == 'rest') {
		let left = r.l;
		let w = getRect(dParent).w;
		let wrest = w - left - pad;
		styles.w = wrest;

	}
	if (styles.h == 'rest') {
		let top = r.t;
		let h = getRect(dParent).h;
		let hrest = h - top - pad;
		styles.h = hrest;

	}
	mStyle(d, styles);
}


function mGridFrom(d,m,cols,rows){
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let warr = toWords(line);
		//console.log('warr',warr)
		for(const w of warr) if (!words.includes(w)) words.push(w);
		//w.map(x => addIf(words, w));

	}
	//console.log('gta',gta);
	console.log('words',words);
	let dParent = mDom100(d, { bg: BLUE, display: 'grid', 'grid-template-areas': gta });
	console.log('dParent',dParent); return;
	// dParent.style.gridTemplateColumns = cols;
	// dParent.style.gridTemplateRows = rows;
	for(const w of words){
		window[w] = mDom100(dParent, { 'grid-area': w, bg: rColor() }, w, w)
	}
	// mDiv(dParent, { 'grid-area': 'dTestButtons', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dSearch', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dSidebar', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dFiddle', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dTable', bg: rColor() }, null, 'd')

}

function mStyle1(d, styles) {
	if (isdef(styles.whrest)) { delete styles.whrest; styles.w = styles.h = 'rest'; } else if (isdef(styles.wh100)) { styles.w = styles.h = '100%'; delete styles.wh100;  }
	if (isdef(styles.w100)) styles.w = '100%'; else if (isdef(styles.wrest)) styles.w = 'rest';
	if (isdef(styles.h100)) styles.h = '100%'; else if (isdef(styles.hrest)) styles.h = 'rest';
	console.log('styles',d.id,styles)
	let dParent = d.parentNode;
	let pad = parseInt(valf(dParent.style.padding, '0'));
	let r = getRect(d, dParent);
	if (styles.w == 'rest') {
		let left = r.l;
		let w = getRect(dParent).w;
		let wrest = w - left - pad;
		styles.w = wrest;

	}
	if (styles.h == 'rest') {
		let top = r.t;
		let h = getRect(dParent).h;
		let hrest = h - top - pad;
		styles.h = hrest;

	}
	mStyle(d, styles);
}


function checkKey(superdi, key, type) {
	let types = ['const', 'var', 'cla', 'func'];
	let itype = types.indexOf(type);
	for (const t in superdi) {
		if (lookup(superdi, [t, key])) {
			let it = types.indexOf(t);
			if (itype > it) { delete superdi[t][key]; return type; }
			else if (it > itype) { return type == 'const' ? t : false; }
			else return type;
		}
	}
	return type;
}
function addOnelineVars(superdi, o) {
	//multiple declarations in 1 line!
	let [code, type] = [o.code, o.type];
	let crn = (code.match(/\r\n/g) || []).length;
	let oneliner = crn == 1;

	//let specialword = 'Counter'; //'PORT';
	//if (oneliner && key == specialword) console.log('oneliner', info.path, iline, type);

	//var declaration in a line that contains '[' or '{ ' will NOT be taken into consideration!!!
	if (oneliner && type == 'var' && code.includes(',') && !code.includes('[') && !code.includes('{ ')) {
		let othervars = stringAfter(code, 'var').trim().split(',');
		othervars = othervars.map(x => firstWord(x, true));
		othervars.shift();
		//console.log('othervars',othervars,o.path)
		for (const v of othervars) {
			let o1 = jsCopy(o);
			o1.lead = o.key;
			o1.key = v;
			o1.code = '';
			o1.sig = `var ${v};`;
			if (isNumber(v)) { continue; } //console.log('var:',v,o.path); 
			lookupSetOverride(superdi, [type, v], o1);
		}
	}
}
function addModuleExports(list) {
	let txt =
		`if (this && typeof module == "object" && module.exports && this === module.exports) {\r\n`
		+ `  module.exports = {\r\n`;
	for (const s of list) {
		txt += `    ${s},\r\n`
	};
	txt += '  }\r\n}';
	return txt;
}
function removeCommentsFromLine(line) {
	let l = line;
	if (!l.includes("`//") && !l.includes("'//") && !l.includes("//'") && !l.includes("http")) {
		l = replaceAllFast(line, '://', ':@@');
		l = replaceAllFast(l, '//#', '@@#');
		l = stringBefore(l, '//');
		l = replaceAllFast(l, '@@#', '//#');
		l = replaceAllFast(l, ':@@', '://');
	}
	if (l.trim().endsWith('*/')) l=stringBefore(l,'/*');
	return l;
}
function getFunctionSignature(firstline, key) {
	let sig;
	if (firstline.includes(') {')) sig = stringBefore(firstline, ') {') + ')';
	else if (firstline.includes('){')) sig = stringBefore(firstline, '){') + ')';
	else sig = `function ${key}()`;
	sig += '{}';
	return sig;
}
function parseCodefile1(content, fname, preserveRegionNames = true, info = {}, superdi = {}) {
	let lines = content.split('\r\n');
	let parsing = false;
	let code, type, key, star, sig;
	let multicomment = false;
	let iline = 0;
	for (const line of lines) {
		iline++;
		let l = removeCommentsFromLine(line); if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (l.trim().startsWith('/*')) multicomment = true;
		if (multicomment) {
			if (l.trim().endsWith('*/')) multicomment = false;
			continue;
		}

		if (parsing) {

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];

			if (' }]'.includes(ch)) code += l1 + '\r\n';

			if (ch != ' ') { //end of parsing!
				parsing = false;

				let o = { name: key, code: code, sig: sig, region: type, filename: fname, type: type };
				addKeys(info, o);

				// if (o.type == 'var' && o.fname == 'chess.js') { o.index = iline; lookupAddIfToList(superdi, ['chessvar'], o.name); }
				if (o.type == 'var' && o.fname == 'chess.js' && o.name.startsWith('brd_')) { lookupSet(superdi, ['chessvar',o.name], true); }
				lookupSetOverride(superdi, [type, key], o);

				if (type == 'var') addOnelineVars(superdi, o);
			}
		}
		if (startsWith(l, 'async') || startsWith(l, 'function')) {
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
			if (key.startsWith('*')) { star = true; key = stringAfter(key, '*').trim(); } else star = false;
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			sig = getFunctionSignature(l, key);
		} else if (startsWith(l, 'class')) {
			key = firstWordAfter(l, 'class', true);
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			sig = `class ${key}{}`;
		} else if (startsWith(l, 'const')) {
			//console.log('const',l)
			key = firstWordAfter(l, 'const', true);
			parsing = true;
			code = l + '\r\n';
			type = 'const';
			sig = `const ${key};`;
		} else if (startsWith(l, 'var')) {
			key = firstWordAfter(l, 'var', true);
			parsing = true;
			code = l + '\r\n';
			type = 'var';
			sig = `var ${key};`;
		}
	}
	return superdi;
}


function test100() {

	let keys = {};
	for (const k in CODE.di) { for (const k1 in CODE.di[k]) keys[k1] = CODE.di[k][k1]; }
	CODE.all = keys;

	CODE.keylist = Object.keys(keys)
	//console.log('keys',CODE.keylist);

	let inter = intersection(Object.keys(keys), Object.keys(window));
	//console.log('intersection',inter);

	//7748 in intersection, also ca 400 jeweils extra, ergibt total of 8500 keys ca.

	//fang an in _start
	let f = CODE.all._start;
	let f1 = window._start;
	let f2 = window.test100;
	//console.log('_start', f)
	//console.log('_start', f1.toString());

	let text = f1.toString() + '\r\n' + f2.toString();
	let done = {}, n_old = 0;
	let tbd = ['_start','test100'], n_new = 1;

	let MAX = 1007, i = 0;
	let alltext = '';

	while (!isEmpty(tbd)) {
		if (++i > MAX) break;

		let sym = tbd[0];
		let o = CODE.all[sym];
		if (nundef(o)) o = getObjectFromWindow(sym);
		if (o.type != 'func') { tbd.shift(); lookupSet(done, [o.type, sym], o); continue; }
		let olive = window[sym];
		if (nundef(olive)) { tbd.shift(); lookupSet(done, [o.type, sym], o); continue; }

		let text = olive.toString();
		if (!isEmpty(text)) alltext += text + '\r\n';

		let words = toWords(text, true); //console.log('words', words);

		for (const w of words) {
			if (nundef(done[w]) && w != sym && isdef(CODE.all[w])) addIf(tbd, w);
		}
		tbd.shift();
		lookupSet(done, [o.type, sym], o); //done[sym] = o;
	}

	console.log('_______________after', i, 'iter:')
	console.log('done', done); //Object.keys(done));

	//let funcs = Object.keys(done).filter(x=>CODE.all[x].type == 'func');
	//console.log('funcs', funcs);
	console.log('tbd', tbd);

	// console.log('alltext', alltext);
	//jetzt mach ich einen text aus nur dem code fuer die dinge die ich tatsaechlich brauche!
	let tres = '';

	for (const k of ['const', 'var', 'cla', 'func']) {
		for (const k1 in done[k]) {
			let code = CODE.justcode[k1];
			if (!isEmptyOrWhiteSpace(code)) tres += code + '\r\n';
		}
	}

	downloadAsText(tres, 'mycode', 'js');
}

function hallo(){
	for(const k of ['MSCATS']){
		let co=superdi.const[k];
		let va=superdi.var[k];
		if (isdef(co) && isdef(va)){
			//schau welches neuer ist!
			let better = co.timestamp>va.timestamp?co:va;
			//beide als var eintragen!
			if (better == co){
				let o=jsCopy(co);
				o.type = 'var';
				o.code.replace('const','var');
				o.sig.replace('const','var');
				superdi.var[k]=o;
				delete superdi.const[k];
			}else{
				delete superdi.const[k];
			}
		}
	}


}

function addOnelineVars(superdi, o) { //code, type, key, info, iline) {
	//multiple declarations in 1 line!
	let [code, type] = [o.code, o.type];
	let crn = (code.match(/\r\n/g) || []).length;
	let oneliner = crn == 1; // (type == 'var' && crn == 1); 

	//let specialword = 'Counter'; //'PORT';
	//if (oneliner && key == specialword) console.log('oneliner', info.path, iline, type);

	//var declaration in a line that contains '[' or '{ ' will NOT be taken into consideration!!!
	if (oneliner && type == 'var' && code.includes(',') && !code.includes('[') && !code.includes('{ ')) {
		let othervars = stringAfter(code, 'var').trim().split(',');
		othervars = othervars.map(x => firstWord(x));
		othervars.shift();
		//console.log('othervars',othervars,o.path)
		for (const v of othervars) {
			let o1 = jsCopy(o);
			o1.lead = o.key;
			o1.key = v; // = { lead: key, name: v, code: '', sig: sig, region: regKey, filename: fname, type: type };
			o1.code = '';
			lookupSetOverride(superdi, [type, v], o1);
		}
	}
}

function parseCodefile(content, fname, preserveRegionNames = true, info = {}, superdi = {}) {
	let defaultRegions = { cla: 'classes', func: 'funcs' };
	let lines = content.split('\r\n');
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		if (!l.includes("'//") && !l.includes("//'") && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];

			if (' }]'.includes(ch)) code += l1 + '\r\n';

			if (ch != ' ') { //end of parsing!
				parsing = false;

				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				//if (lookup(superdi,[type,key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				if (nundef(regionName)) { regionName = regionOrig = valf(defaultRegions[type], type); }
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let sig;
				if (type == 'cla') {
					sig = `class ${key}{}`;
				} else if (type == 'func') {
					let firstline = stringBefore(code, '\r\n');
					if (firstline.includes(') {')) sig = stringBefore(firstline, ') {') + ')';
					else if (firstline.includes('){')) sig = stringBefore(firstline, '){') + ')';
					else sig = `function ${key}()`;
					sig += '{}';
				} else { sig = `${type} ${key}`; }

				let o = { name: key, code: code, sig: sig, region: regKey, filename: fname, type: type };
				addKeys(info, o);
				type = checkKey(superdi, key, type);
				if (type) lookupSetOverride(superdi, [type, key], o);

				addOnelineVars(superdi, o); //code, type, key, info, iline - 1);

				addIf(firstletters, l[0]);
			}
		} else {
			//if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			//if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) { console.log('line', iline, w, l[0]); }

		}
		if (parsing) continue;

		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			regionName = firstWordAfter(l, 'region', true);
		} else if (startsWith(l, 'var')) {
			key = firstWordAfter(l, 'var', true);
			// //var wird nur genommen wenn es keine const,function, oder class mit dem namen gibt
			// for (const t of ['const', 'func', 'cla']) if (lookup(superdi, [t, key])) continue;
			parsing = true;
			code = l + '\r\n';
			type = 'var';
		} else if (startsWith(l, 'const')) {
			key = firstWordAfter(l, 'const', true);
			//const wird nur genommen wenn es keine function, oder class mit dem namen gibt
			//for (const t of ['func', 'cla']) if (lookup(superdi, [t, key])) continue;
			//wenn es var gibt, hau sie aus superrdi raus!!!
			//if (lookup(superdi,.var[key])) delete superdi.var[key];
			parsing = true;
			code = l + '\r\n';
			type = 'const';
		} else if (startsWith(l, 'class')) {
			key = firstWordAfter(l, 'class', true);
			// //class wird nur genommen wenn es keine function, oder class mit dem namen gibt
			// for (const t of ['func']) if (lookup(superdi, [t, key])) continue;
			// //wenn es var oder const gibt, hau sie aus superrdi raus!!!
			// for (const t of ['var', 'const']) if (lookup(superdi, [t, key])) delete superdi[t][key];
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			// key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
			//wenn es var oder const oder class gibt, hau sie aus superrdi raus!!!
			// for (const t of ['var', 'const', 'cla']) if (lookup(superdi, [t, key])) delete superdi[t][key];
			parsing = true;
			code = l + '\r\n';
			type = 'func';
		}
	}
	return superdi;
}

function addOnelineVars(superdi, code, type, key, info, iline) {
	//let specialword = 'Counter'; //'PORT';
	let crn = (code.match(/\r\n/g) || []).length;
	let oneliner = crn == 1; // (type == 'var' && crn == 1); 
	//if (oneliner && key == specialword) console.log('oneliner', info.path, iline, type);

	let addvars = [];
	//multiple declarations in 1 line!

	if (code.includes(specialword)) {
		//console.log('PORT',info.path,iline,type);
		let constsaved = null != lookup(superdi, ['const', specialword]);
		let varsaved = null != lookup(superdi, ['var', specialword]);
		//console.log('..const',constsaved,'var',varsaved);
		//console.log('cond',oneliner); // && code.includes(',') && !code.includes('[') && !code.includes('{'))
	}

	if (oneliner && code.includes(',') && !code.includes('[') && !code.includes('{ ')) {
		let thisisit = code.includes(specialword);
		//if (code.includes('PORT')) console.log('HERE',info.path, type, lookup(superdi,['const','PORT']))
		let othervars = stringAfter(code, 'var').trim().split(',');
		othervars = othervars.map(x => firstWord(x));
		othervars.shift();

		//hier muss noch type geaendert werden as perr other var!!!! falls const=>var aendern muss!!!
		for (const v of othervars) {
			let t = checkKey(superdi, key, type);
			if (v == specialword) console.log('path', info.path, t, type)
			if (t) addvars.push[{ name: v, type: t }];
		}
	}
	for (const v of addvars) {
		let o = { lead: key, name: v.name, code: '', sig: sig, region: regKey, filename: fname, type: v.type };
		addKeys(info, o);
		lookupSetOverride(superdi, [type, v], o);
	}

}

function parseCodefile(content, fname, preserveRegionNames = true, info = {}, superdi = {}) {
	let defaultRegions = { cla: 'classes', func: 'funcs' };
	let lines = content.split('\r\n');
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		if (!l.includes("'//") && !l.includes("//'") && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];

			if (' }]'.includes(ch)) code += l1 + '\r\n';

			if (ch != ' ') { //end of parsing!
				parsing = false;

				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				//if (lookup(superdi,[type,key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				if (nundef(regionName)) { regionName = regionOrig = valf(defaultRegions[type], type); }
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let sig;
				if (type == 'cla') {
					sig = `class ${key}{}`;
				} else if (type == 'func') {
					let firstline = stringBefore(code, '\r\n');
					if (firstline.includes(') {')) sig = stringBefore(firstline, ') {') + ')';
					else if (firstline.includes('){')) sig = stringBefore(firstline, '){') + ')';
					else sig = `function ${key}()`;
					sig += '{}';
				} else { sig = `${type} ${key}`; }

				checkOnelinerVar(superdi, code, type, key, info, iline - 1);

				let o = { name: key, code: code, sig: sig, region: regKey, filename: fname, type: type };
				addKeys(info, o);
				type = checkKey(superdi, key, type);
				if (type) lookupSetOverride(superdi, [type, key], o);

				addIf(firstletters, l[0]);
			}
		} else {
			//if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			//if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) { console.log('line', iline, w, l[0]); }

		}
		if (parsing) continue;

		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			regionName = firstWordAfter(l, 'region');
		} else if (startsWith(l, 'var')) {
			key = firstWordAfter(l, 'var');
			// //var wird nur genommen wenn es keine const,function, oder class mit dem namen gibt
			// for (const t of ['const', 'func', 'cla']) if (lookup(superdi, [t, key])) continue;
			parsing = true;
			code = l + '\r\n';
			type = 'var';
		} else if (startsWith(l, 'const')) {
			key = firstWordAfter(l, 'const');
			//const wird nur genommen wenn es keine function, oder class mit dem namen gibt
			//for (const t of ['func', 'cla']) if (lookup(superdi, [t, key])) continue;
			//wenn es var gibt, hau sie aus superrdi raus!!!
			//if (lookup(superdi,.var[key])) delete superdi.var[key];
			parsing = true;
			code = l + '\r\n';
			type = 'const';
		} else if (startsWith(l, 'class')) {
			key = firstWordAfter(l, 'class');
			// //class wird nur genommen wenn es keine function, oder class mit dem namen gibt
			// for (const t of ['func']) if (lookup(superdi, [t, key])) continue;
			// //wenn es var oder const gibt, hau sie aus superrdi raus!!!
			// for (const t of ['var', 'const']) if (lookup(superdi, [t, key])) delete superdi[t][key];
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			// key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
			//wenn es var oder const oder class gibt, hau sie aus superrdi raus!!!
			// for (const t of ['var', 'const', 'cla']) if (lookup(superdi, [t, key])) delete superdi[t][key];
			parsing = true;
			code = l + '\r\n';
			type = 'func';
		}
	}
	return superdi;
}

function checkOnelinerVar(superdi, code, type, key, info, iline) {
	let specialword='Counter'; //'PORT';
	let crn = (code.match(/\r\n/g) || []).length;
	let oneliner = crn == 1; // (type == 'var' && crn == 1); 
	if (oneliner && code.includes(specialword)) console.log('oneliner', info.path, iline, type);

	let addvars = [];
	//multiple declarations in 1 line!

	if (code.includes(specialword)) {
		//console.log('PORT',info.path,iline,type);
		let constsaved = null != lookup(superdi, ['const', specialword]);
		let varsaved = null != lookup(superdi, ['var', specialword]);
		//console.log('..const',constsaved,'var',varsaved);
		//console.log('cond',oneliner); // && code.includes(',') && !code.includes('[') && !code.includes('{'))
	}

	if (oneliner && code.includes(',') && !code.includes('[') && !code.includes('{ ')) {
		let thisisit = code.includes(specialword);
		//if (code.includes('PORT')) console.log('HERE',info.path, type, lookup(superdi,['const','PORT']))
		let othervars = stringAfter(code, 'var').trim().split(',');
		othervars = othervars.map(x => firstWord(x));
		othervars.shift();

		//hier muss noch type geaendert werden as perr other var!!!! falls const=>var aendern muss!!!
		for (const v of othervars) {
			let t = checkKey(superdi, key, type);
			if (v == specialword) console.log('path', info.path, t, type)
			if (t) addvars.push[{ name: v, type: t }];
		}
	}
	for (const v of addvars) {
		let o = { lead: key, name: v.name, code: '', sig: sig, region: regKey, filename: fname, type: v.type };
		addKeys(info, o);
		lookupSetOverride(superdi, [type, v], o);
	}

}

function checkKey(superdi, key, type) {

	//check if already in superdi with a different type
	let types = ['const', 'var', 'cla', 'func'];
	let itype = types.indexOf(type);
	// let ok = true;
	for (const t in superdi) {
		if (lookup(superdi, [t, key])) {
			let it = types.indexOf(t);
			if (itype > it) { delete superdi[t][key]; return type; }
			else if (it > itype) { return type == 'const' ? t : false; }
			else return type;
		}
		// if (lookup(superdi, [t, key])) {

		// 	if (key == 'PORT') console.log('PORT',t,type);

		// 	let it = types.indexOf(t);
		// 	if (itype > it) { delete superdi[t][key]; console.log('del', key, t); return type; }
		// 	else if (it > itype) { console.log('skip/var', key, type); return type == 'const' ? t : false; }
		// 	else return type;
		// }
		// if (lookup(superdi, [t, key])) {
		// 	if (t == type) break;
		// 	else if (type == 'const' && t == 'var') {
		// 		type = 'var';
		// 	} else if (type == 'var' && t == 'const') {
		// 		delete superdi.const[key];
		// 		console.log('deleted:',key,t)
		// 	} else if (it < itype) {
		// 		delete superdi.const[key];
		// 	} else ok = false;
		// }
	}
	return type;
	// if (!ok) {
	// 	console.log('!!dup:', key, type);
	// }
	// return ok?type:ok;

}

function parseCodefile(content, fname, preserveRegionNames = true, info = {}, superdi = {}) {
	let defaultRegions = { cla: 'classes', func: 'funcs' };
	let lines = content.split('\r\n');
	let parsing = false, code, type, key, regionName, regionOrig; 
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		if (!l.includes("'//") && !l.includes("//'") && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];

			let oneliner=(type == 'var' && !code.includes('\r\n'));

			if (' }]'.includes(ch)) code += l1 + '\r\n';
			if (ch != ' ') { //end of parsing!
				parsing = false;

				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				//if (lookup(superdi,[type,key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				if (nundef(regionName)) { regionName = regionOrig = valf(defaultRegions[type], type); }
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let sig;
				if (type == 'cla') {
					sig = `class ${key}{}`;
				} else if (type == 'func') {
					let firstline = stringBefore(code, '\r\n');
					if (firstline.includes(') {')) sig = stringBefore(firstline, ') {') + ')';
					else if (firstline.includes('){')) sig = stringBefore(firstline, '){') + ')';
					else sig = `function ${key}()`;
					sig += '{}';
				} else { sig = `${type} ${key}`; }

				let othervars = [];
				//multiple declarations in 1 line!
				//nur bei var (const?)
				//cond: code is 1 liner
				if (oneliner && code.includes(',') && !code.includes('[') && !code.includes('{')){
					othervars = stringAfter(l, 'var').trim().split(',');
					othervars = othervars.map(x => firstWord(x)); //.map(y => lookupAddToList(di, ['var'], y));
					othervars.shift();
				}

				// if (type == 'var' && code.includes(',')) {
				// 	othervars = stringAfter(l, 'var').trim().split(',');
				// 	othervars = othervars.map(x => firstWord(x)); //.map(y => lookupAddToList(di, ['var'], y));
				// 	othervars.shift();
				// }
				//if (type == 'var') console.log('othervars', othervars);

				let o = { name: key, code: code, sig: sig, region: regKey, filename: fname, type: type };
				addKeys(info, o);
				lookupSetOverride(superdi, [type, key], o);
				for (const v of othervars) {
					let o = { lead: key, name: v, code: '', sig: sig, region: regKey, filename: fname, type: type };
					addKeys(info, o);
					lookupSetOverride(superdi, [type, v], o);
				}
				// lookupSetOverride(diregion, [regKey, key], o);
				addIf(firstletters, l[0]);
			}
		} else {
			//if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			//if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) { console.log('line', iline, w, l[0]); }

		}
		if (parsing) continue;

		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			regionName = firstWordAfter(l, 'region');
		} else if (startsWith(l, 'var')) {
			parsing = true;
			code = l + '\r\n';
			type = 'var';
			key = firstWordAfter(l, 'var');
		} else if (startsWith(l, 'const')) {
			parsing = true;
			code = l + '\r\n';
			type = 'const';
			key = firstWordAfter(l, 'const');
		} else if (startsWith(l, 'class')) {
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
	}
	return superdi;
}
function addModuleExports(list){
	let txt=
		`if (this && typeof module == "object" && module.exports && this === module.exports) {\r\n`
		+ `  module.exports = {\r\n`;
	for(const s of list){
		txt+=`    ${s},\r\n`
	};
	txt+='  }\r\n}';
	return txt;
}

function test6_sidebar() {
	show_sidebar(CODE.funcs, 'name', 'body');	//CODE.consts);

}
function _show_code(ev) {
	let k = isdef(ev) ? isString(ev) ? ev : ev.target.innerHTML : rChoose(CODE.index);
	let o = CODE.funcs[k];
	let [w, h] = [window.innerWidth - 300, window.innerHeight - 150];
	let [r, c] = [h / 18, w / 9];
	show_fiddle(o.body, r, c, { bg: DB.apps.howto.color });
}
function add_code(ev) {
	if (nundef(AU.ta)) show_code(ev);
	else {
		let k = isdef(ev) ? isString(ev) ? ev : ev.target.innerHTML : rChoose(CODE.index);
		let o = CODE.funcs[k];
		AU.ta.value += o.body + '\n';
	}
}


function add_code_to_collection(res) {
	CODE.paths = paths;
	CODE.di = { var: [], const: [], cla: [], func: [] }; CODE.diregion = {}; CODE.dicode = {}; CODE.text = '';
	//
}

async function load_codebase(paths,preserveRegionNames=false) {
	if (nundef(paths)) {
		paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
		paths = paths.map(f => `../basejs/${f}.js`);
		//paths.push(`../game/done.js`);
		// let paths = [`../game/aaa.js`];
	}
	let reslist=[];
	for (const f of paths) {
		console.log('...processing file',f);
		let current_file = stringBefore(stringAfterLast(f, '/'), '.'); 
		let base = await route_path_text(f);
		let res = parseCodefile(base, current_file, preserveRegionNames);
		console.log('res',res, '\nnum functions:',get_keys(res.dicode).length)
		reslist.push(res);
	}
	return reslist;
}

function parseCodefile(content, fname, preserveRegionNames = true, info = {}, superdi = {}) {
	let defaultRegions = { cla: 'classes', func: 'funcs' };
	// let di = {}, text = ''; let dicode = {}; let diregion = {};
	let lines = content.split('\r\n');
	let parsing = false, code, type, key, regionName, regionOrig; //, varline, varnames, constline, constnames;
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		if (!l.includes("'//") && !l.includes("//'") && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\r\n';
			if (ch != ' ') { //end of parsing!
				parsing = false;

				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				//if (lookup(superdi,[type,key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				//lookupSetOverride(dicode, [key], code);
				//lookupAddIfToList(di, [type], key);

				if (nundef(regionName)) { regionName = regionOrig = valf(regionNames[type], type); }
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let sig;
				if (type == 'cla') {
					sig = `class ${key}{}`;
				} else if (type == 'func') {
					let firstline = stringBefore(code, '\r\n');
					if (firstline.includes(') {')) sig = stringBefore(firstline, ') {') + ')';
					else if (firstline.includes('){')) sig = stringBefore(firstline, '){') + ')';
					else sig = `function ${key}()`;
					sig += '{}';
				} else { sig = `${type} ${key}`; }

				let othervars = [];
				if (type == 'var' && !code.includes('\r\n') && code.includes(',')) {
					othervars = stringAfter(l, 'var').trim().split(',');
					othervars = othervars.map(x => firstWord(x)); //.map(y => lookupAddToList(di, ['var'], y));
					othervars.shift();
				}
				console.log('othervars', othervars);

				let o = { name: key, code: code, sig: sig, region: regKey, filename: fname, type: type };
				addKeys(info, o);
				lookupSetOverride(superdi, [type, key], o);
				for (const v of othervars) {
					let o = { name: v, code: code, sig: sig, region: regKey, filename: fname, type: type };
					addKeys(info, o);
					lookupSetOverride(superdi, [type, v], o);
				}
				// lookupSetOverride(diregion, [regKey, key], o);
				addIf(firstletters, l[0]);
			}
		} else {
			//if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			//if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) { console.log('line', iline, w, l[0]); }

		}
		if (parsing) continue;

		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			regionName = firstWordAfter(l, 'region');
		} else if (startsWith(l, 'var')) {
			parsing = true;
			code = l + '\r\n';
			type = 'var';
			key = firstWordAfter(l, 'var');
			// varline = l;
			// varnames = stringAfter(l, 'var').trim().split(',');
			// varnames.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			parsing = true;
			code = l + '\r\n';
			type = 'const';
			key = firstWordAfter(l, 'const');
			// constline = l;
			// constnames = stringAfter(l, 'const').trim().split(',');
			// constnames.map(x => firstWord(x)).map(y => lookupAddToList(di, ['const'], y));
		} else if (startsWith(l, 'class')) {
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
	}
	//console.log('first letters', firstletters)
	//console.log('first words', firstWords)
	//for (const k in di) { di[k].sort(); }
	// if (isdef(di.cla)) {
	// 	//text += `\n//#region classes \n`;
	// 	for (const k of di.cla) {
	// 		text += dicode[k];
	// 	}
	// 	text += `//#endregion classes\n`;
	// }
	// for (const r in diregion) {
	// 	if (r.includes('classes')) continue; // need to skip because already hav classes from di.cla!
	// 	text += `\n//#region ${r}\n`;
	// 	let sorted_keys = get_keys(diregion[r]);
	// 	sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
	// 	for (const funcname of sorted_keys) {
	// 		text += dicode[funcname];
	// 	}
	// 	text += `//#endregion ${r}\n`;
	// }
	// return { di: di, dicode: dicode, diregion: diregion, text: text };
	return superdi;
}


function parseCodefile(content, fname) {
	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let lines = content.split('\r\n');
	let classes_started = true;
	let parsing = false, code, ending, type, key;
	let firstletters = [];
	for (const line of lines) {
		let l = line;
		if (!l.includes("'//")) {
			l = replaceAllFast(line, '://', ':@@');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, ':@@', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;
		if (parsing) {
			assertion(classes_started, 'parsing but NOT classes_started!!!!');
			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\n';
			if (ch != ' ') {
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
				addIf(firstletters, l[0]);
			}
		}
		if (classes_started && startsWith(l, '//#end')) continue;
		assertion(!startsWith(l, '//#endregion') || !classes_started, 'ASSERTION!!!');
		if (parsing) continue;
		if (startsWith(l, '//#region')) {
			let region = CODE.region = firstWordAfter(l, 'region');
			if (startsWith(l, '//#region classes')) classes_started = true;
			if (!classes_started || startsWith(l, '//#region vars')) text += `\n//#region ${fname} ${region}\n`;
			continue;
		} else if (startsWith(l, 'var')) {
			if (classes_started) console.log('line', l)
			classes_started = false;
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			parsing = true;
			code = l + '\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			parsing = true;
			code = l + '\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
		if (!classes_started) text += l + '\n';
	}
	console.log('first letters', firstletters)
	for (const k in di) {
		di[k].sort();
	}
	if (isdef(di.cla)) {
		text += `\n//#region ${fname} classes\n`;
		for (const k of di.cla) {
			text += dicode[k];
		}
		text += `//#endregion ${fname} classes\n`;
	}
	for (const r in diregion[fname]) {
		if (r == 'classes') continue;
		text += `\n//#region ${fname} ${r}\n`;
		let sorted_keys = get_keys(diregion[fname][r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) {
			text += dicode[funcname];
		}
		text += `//#endregion ${fname} ${r}\n`;
	}
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}

function parseCodefile(content, fname, preserveRegionNames = true, info={}, superdi={}) {
	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let lines = content.split('\r\n');
	let classes_started = true, commented_out=false;
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		if (!l.includes("'//") && !l.includes("//'")  && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {
			if (!classes_started) console.log('!!!PARSE VOR class_started!!! line', l)
			assertion(classes_started, 'parsing but NOT classes_started!!!!');

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\r\n';
			if (ch != ' ') {
				parsing = false;
				
				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				//if (lookup(superdi,[type,key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);

				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let sig = type == 'cla'?`class ${key}{}`:null;
				if (type == 'func'){
					let firstline = stringBefore(code,'\r\n');
					if (firstline.includes(') {')) sig = stringBefore(firstline,') {') + ')';
					else if (firstline.includes('){')) sig = stringBefore(firstline,'){') + ')';
					else sig = `function ${key}()`;
					sig+='{}';
				}


				let o={ name: key, code: code, sig: sig, region: regKey, filename: fname };
				addKeys(info,o);
				lookupSetOverride(diregion, [regKey, key], o);
				lookupSetOverride(superdi,[type,key],o);
				addIf(firstletters, l[0]);
			}
		} else {
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) {
				//console.log('line', iline, w, l[0]);
			}

		}
		if (classes_started && startsWith(l, '//#end')) continue;
		assertion(!startsWith(l, '//#endregion') || !classes_started, 'ASSERTION!!!');
		if (parsing) continue;
		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			let region = regionName = firstWordAfter(l, 'region');
			if (!classes_started || startsWith(l, '//#region vars')) text += '\r\n' + (preserveRegionNames ? l : `//#region ${region} (${fname})`) + '\r\n';
			continue;
		} else if (startsWith(l, 'var')) {
			//if (classes_started) console.log('line', l)
			classes_started = false;
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			if (nundef(regionOrig)) {
				regionOrig = regionName = 'classes';
				text += '\r\n' + `//#region ${regionName} (${fname})` + '\r\n';
			}
			//console.log('region', regionOrig);
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
		if (!classes_started) text += l + '\r\n';
	}
	//console.log('first letters', firstletters)
	//console.log('first words', firstWords)
	for (const k in di) {
		di[k].sort();
	}
	if (isdef(di.cla)) {
		//text += `\n//#region classes \n`;
		for (const k of di.cla) {
			text += dicode[k];
		}
		text += `//#endregion classes\n`;
	}
	for (const r in diregion) {
		if (r.includes('classes')) continue; // need to skip because already hav classes from di.cla!
		text += `\n//#region ${r}\n`;
		let sorted_keys = get_keys(diregion[r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) {
			text += dicode[funcname];
		}
		text += `//#endregion ${r}\n`;
	}
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}


function parseCodefile(content, fname, preserveRegionNames = true, info={}) {
	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let diall = {};
	let lines = content.split('\r\n');
	let classes_started = true, commented_out=false;
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [], firstWords = [], iline = 0;
	for (const line of lines) {
		let l = line; iline += 1;
		// if (commented_out){
		// 	if (l.includes('*/'))commented_out=false;
		// 	continue;
		// } else if (l.includes('/*')) {commented_out = true; continue;}
		//console.log('line',l)

		if (!l.includes("'//") && !l.includes("//'")  && !l.includes("http")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (parsing) {
			if (!classes_started) console.log('!!!PARSE VOR class_started!!! line', l)
			assertion(classes_started, 'parsing but NOT classes_started!!!!');

			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\r\n';
			if (ch != ' ') {
				parsing = false;
				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				if (isdef(dicode[key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);

				//preserveRegionName???
				//ich hab regionName und fname und regionOrig
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;

				let o={ name: key, code: code, sig: stringBefore(code, ') {'), region: regKey, filename: fname };
				lookupSetOverride(diregion, [regKey, key], o);
				addIf(firstletters, l[0]);
			}
		} else {
			let w = l[0] != '/' ? firstWord(l) : l.substring(0, 3);
			addIf(firstWords, w);
			if (!['onload', 'async', 'function', 'class', 'var', 'const', '//#'].includes(w)) {
				console.log('line', iline, w, l[0]);
			}

		}
		if (classes_started && startsWith(l, '//#end')) continue;
		assertion(!startsWith(l, '//#endregion') || !classes_started, 'ASSERTION!!!');
		if (parsing) continue;
		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			let region = regionName = firstWordAfter(l, 'region');
			if (!classes_started || startsWith(l, '//#region vars')) text += '\r\n' + (preserveRegionNames ? l : `//#region ${region} (${fname})`) + '\r\n';
			continue;
		} else if (startsWith(l, 'var')) {
			//if (classes_started) console.log('line', l)
			classes_started = false;
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			if (nundef(regionOrig)) {
				regionOrig = regionName = 'classes';
				text += '\r\n' + `//#region ${regionName} (${fname})` + '\r\n';
			}
			//console.log('region', regionOrig);
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			if (nundef(regionOrig)) { regionOrig = regionName = 'funcs'; }
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
		if (!classes_started) text += l + '\r\n';
	}
	//console.log('first letters', firstletters)
	console.log('first words', firstWords)
	for (const k in di) {
		di[k].sort();
	}
	if (isdef(di.cla)) {
		//text += `\n//#region classes \n`;
		for (const k of di.cla) {
			text += dicode[k];
		}
		text += `//#endregion classes\n`;
	}
	for (const r in diregion) {
		if (r.includes('classes')) continue; // need to skip because already hav classes from di.cla!
		text += `\n//#region ${r}\n`;
		let sorted_keys = get_keys(diregion[r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) {
			text += dicode[funcname];
		}
		text += `//#endregion ${r}\n`;
	}
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}


function parseCodefile(content, fname, preserveRegionNames = true) {
	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let lines = content.split('\r\n');
	let classes_started = true;
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [];
	for (const line of lines) {
		let l = line;
		if (!l.includes("'//") && !l.includes("//'")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;
		if (parsing) {
			if (!classes_started) console.log('line', l)
			assertion(classes_started, 'parsing but NOT classes_started!!!!');
			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\r\n';
			if (ch != ' ') {
				parsing = false;
				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				if (isdef(dicode[key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);

				//preserveRegionName???
				//ich hab regionName und fname und regionOrig
				let regKey = preserveRegionNames ? regionOrig : `${regionName} (${fname})`;
				lookupSetOverride(diregion, [regKey, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: regKey, filename: fname });
				addIf(firstletters, l[0]);
			}
		}
		if (classes_started && startsWith(l, '//#end')) continue;
		assertion(!startsWith(l, '//#endregion') || !classes_started, 'ASSERTION!!!');
		if (parsing) continue;
		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			let region = regionName = firstWordAfter(l, 'region');
			if (!classes_started || startsWith(l, '//#region vars')) text += '\r\n' + (preserveRegionNames ? l : `//#region ${region} (${fname})`) + '\r\n';
			continue;
		} else if (startsWith(l, 'var')) {
			//if (classes_started) console.log('line', l)
			classes_started = false;
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			classes_started = true;
			parsing = true;
			code = l + '\r\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
		if (!classes_started) text += l + '\r\n';
	}
	//console.log('first letters', firstletters)
	for (const k in di) {
		di[k].sort();
	}
	if (isdef(di.cla)) {
		//text += `\n//#region classes \n`;
		for (const k of di.cla) {
			text += dicode[k];
		}
		text += `//#endregion classes\n`;
	}
	for (const r in diregion) {
		if (r.includes('classes')) continue; // need to skip because already hav classes from di.cla!
		text += `\n//#region ${r}\n`;
		let sorted_keys = get_keys(diregion[r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) {
			text += dicode[funcname];
		}
		text += `//#endregion ${r}\n`;
	}
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}


function parseCodefile(content, fname, preserveRegionNames = true) {
	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let lines = content.split('\r\n');
	let classes_started = true;
	let parsing = false, code, type, key, regionName, regionOrig;
	let firstletters = [];
	for (const line of lines) {
		let l = line;
		if (!l.includes("'//") && !l.includes("//'")) {
			l = replaceAllFast(line, '://', '://');
			l = replaceAllFast(l, '//#', '@@#');
			l = stringBefore(l, '//');
			l = replaceAllFast(l, '@@#', '//#');
			l = replaceAllFast(l, '://', '://');
		}
		if (isEmptyOrWhiteSpace(l.trim())) continue;
		if (parsing) {
			if (!classes_started) console.log('line', l)
			assertion(classes_started, 'parsing but NOT classes_started!!!!');
			let l1 = replaceAllSpecialChars(l, '\t', '  ');
			let ch = l1[0];
			if (' }'.includes(ch)) code += l1 + '\n';
			if (ch != ' ') {
				parsing = false;
				//duplicate funcs anzeigen!!!!!!!!!!!!!!!!!!!
				if (isdef(dicode[key])) { console.log('==>DUPLICATE FUNC:', fname, regionName, key); }

				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);

				//preserveRegionName???
				//ich hab regionName und fname und regionOrig
				let regKey = preserveRegionNames?regionOrig:`${regionName} (${fname})`;
				lookupSetOverride(diregion, [regKey, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: regKey, filename: fname });
				addIf(firstletters, l[0]);
			}
		}
		if (classes_started && startsWith(l, '//#end')) continue;
		assertion(!startsWith(l, '//#endregion') || !classes_started, 'ASSERTION!!!');
		if (parsing) continue;
		if (startsWith(l, '//#region')) {
			regionOrig = stringAfter(l, 'region').trim();
			let region = regionName = firstWordAfter(l, 'region');
			if (!classes_started || startsWith(l, '//#region vars')) text += `\n//#region ${region} (${fname})\n`;
			continue;
		} else if (startsWith(l, 'var')) {
			//if (classes_started) console.log('line', l)
			classes_started = false;
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
		} else if (startsWith(l, 'const')) {
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			classes_started = true;
			parsing = true;
			code = l + '\n';
			type = 'cla';
			key = firstWordAfter(l, 'class');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {
			classes_started = true;
			parsing = true;
			code = l + '\n';
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}
		if (!classes_started) text += l + '\n';
	}
	//console.log('first letters', firstletters)
	for (const k in di) {
		di[k].sort();
	}
	if (isdef(di.cla)) {
		text += `\n//#region ${fname} classes\n`;
		for (const k of di.cla) {
			text += dicode[k];
		}
		text += `//#endregion ${fname} classes\n`;
	}
	for (const r in diregion[fname]) {
		if (r == 'classes') continue;
		text += `\n//#region ${fname} ${r}\n`;
		let sorted_keys = get_keys(diregion[fname][r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) {
			text += dicode[funcname];
		}
		text += `//#endregion ${fname} ${r}\n`;
	}
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}

async function load_codebase(paths) {
	if (nundef(paths)) {
		paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
		paths = paths.map(f => `../basejs/${f}.js`);
		//paths.push(`../game/done.js`);
		// let paths = [`../game/aaa.js`];
	}
	CODE.paths = paths;
	CODE.di = { var: [], const: [], cla: [], func: [] }; CODE.diregion = {}; CODE.dicode = {}; CODE.text = '';
	for (const f of paths) {
		CODE.current_file = stringBefore(stringAfterLast(f, '/'), '.'); 
		let base = await route_path_text(f);
		let res = parseCodefile(base, CODE.current_file);
		show_code(res);
	}
}

function restmuell() {
	//console.log('res',res);



	CODE.text += res.text + '\n';

	for (const type in res.di) {
		res.di[type].map(x => lookupAddIfToList(CODE.di, [type], x));
	}

	copyKeys(res.dicode, CODE.dicode);
	copyKeys(res.diregion, CODE.diregion);




}

function parseCodefile(content, fname) {

	let di = {}, text = '';
	let dicode = {};
	let diregion = {};
	let lines = content.split('\r\n');
	let di_started = false;
	let classes_started = true;
	let parsing = false, code, ending, type, key;

	for (const line of lines) {
		let l = line.includes('//#region') || line.includes('http')|| line.includes("'//") ? line : stringBefore(line, '//');
		if (isEmptyOrWhiteSpace(l.trim())) continue;

		if (startsWith(l, '//#region')) {
			let region = CODE.region = firstWordAfter(l, 'region');
			if (startsWith(l, '//#region classes')) classes_started = true;
			if (!classes_started || startsWith(l, '//#region vars')) text += `//#region ${fname} ${region}\n`;
			//console.log('file',fname,'#region',region);

			if (parsing){
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}

			continue;
		} else if (startsWith(l, 'var')) {
			if (parsing){
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}
			//define all vars in this line
			classes_started = false; //fuer basemin!!!
			let vs = stringAfter(l, 'var').trim().split(',');
			vs.map(x => firstWord(x)).map(y => lookupAddToList(di, ['var'], y));
			//return;
		} else if (startsWith(l, 'const')) {
			if (parsing){
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}
			lookupAddToList(di, ['const'], toWords(l)[1]);
		} else if (startsWith(l, 'class')) {
			//diese line bis line starting with '}'

			if (parsing){
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}

			parsing = true;
			code = l + '\n';
			ending = l => startsWith(l, '}');
			type = 'cla';
			key = firstWordAfter(l, 'class'); //stringBefore(stringAfter(l, 'class').trim(), '{');
		} else if (startsWith(l, 'async') || startsWith(l, 'function')) {

			if (parsing){
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}

			//diese line bis line starting with '}'
			parsing = true;
			code = l + '\n';
			ending = l => startsWith(l, '}');
			type = 'func';
			key = stringBefore(stringAfter(l, 'function').trim(), '(');
		}else	if (parsing) {
			let bp1 = replaceAllSpecialChars(l, '\t', '  ')
			code += bp1 + '\n';
			if (ending(l)) {
				parsing = false;
				lookupSetOverride(dicode, [key], code);
				lookupAddIfToList(di, [type], key);
				lookupSetOverride(diregion, [fname, CODE.region, key], { name: key, code: code, sig: stringBefore(code, ') {'), region: CODE.region, filename: fname });
			}
		} 
		if (!classes_started) text += l + '\n';
	}

	for (const k in di) {
		di[k].sort();
	}

	//jetzt kommen classes und functions zum text dazu!
	//nehmen wir mal nur die functions
	//zuerst sollen alle classes kommen!!!!
	if (isdef(di.cla)) {

		text += `//#region ${fname} classes\n`;
		for (const k of di.cla) {

			//console.log('code', k, dicode[k])
			text += dicode[k];

		}
		text += `//#endregion ${fname} classes\n`;

	}

	//jetzt kommen die functions
	for (const r in diregion[fname]) {
		if (r == 'classes') continue;
		text += `\n//#region ${fname} ${r}\n`;
		let sorted_keys = get_keys(diregion[fname][r]);
		sorted_keys.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
		for (const funcname of sorted_keys) { //in diregion[fname][r]) {
			text += dicode[funcname];
		}
		text += `//#endregion ${fname} ${r}\n`;
	}


	//console.log('di', di);
	//console.log('di', dicode);
	return { di: di, dicode: dicode, diregion: diregion, text: text };
}

function parse_funcs_muell(code) {
	let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
	let asyncnames = cfunctions.split('\r\nasync function');
	let asyncs = {};
	for (const x of asyncnames) {
		let name = stringBefore(x, '(').trim();
		//console.log('async', name);
		asyncs[name] = true;
	}
	cfunctions = asyncnames.join('\r\nfunction');
	let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
	//console.log('fbodies!!!!!!!!!!!'); //,fbodies)

	//console.log('fbodies',fbodies);
	for (const f of fbodies) {
		if ("'\"_!".includes(f[0])) continue;
		let name = stringBefore(f, '(');
		if (isEmpty(name)) continue;
		let params = stringBefore(stringAfter(f, '('), ') {');

		let lines = (stringAfter(f, ') {')).split('\r\n');
		let body = '';
		for (const line of lines) {
			let ws = toWords(line);
			if (isEmpty(ws[0]) || startsWith(ws[0], '//')) continue;
			//if (startsWith(line,'class')) {} //TODO
			//console.log('===>ws',ws)
			//console.log('bp',bp)
			let bp1 = replaceAllSpecialChars(line, '\t', '  ')
			if (!bp1.includes('http')) bp1 = stringBefore(bp1, '//');//achtung http://
			body += bp1 + '\n';
		}
		// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
		// body=sig+'{\n'+body;
		// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
		let isasync = isdef(asyncs[name]);
		let sig = `${isasync ? 'async ' : ''}function ${name}(${params})`;
		body = sig + '{\n' + body;
		res[name.trim()] = { name: name, params: params, sig: sig, body: body, async: isasync };
	}

	//console.log('functions', res); //get_keys(res));
	return res;

}
function parse_funcs(code) {
	let res = {};
	let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
	let asyncnames = cfunctions.split('\r\nasync function');
	let asyncs = {};
	for (const x of asyncnames) {
		let name = stringBefore(x, '(').trim();
		//console.log('async', name);
		asyncs[name] = true;
	}
	cfunctions = asyncnames.join('\r\nfunction');
	let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
	//console.log('fbodies!!!!!!!!!!!'); //,fbodies)

	//console.log('fbodies',fbodies);
	for (const f of fbodies) {
		if ("'\"_!".includes(f[0])) continue;
		let name = stringBefore(f, '(');
		if (isEmpty(name)) continue;
		let params = stringBefore(stringAfter(f, '('), ') {');

		let lines = (stringAfter(f, ') {')).split('\r\n');
		let body = '';
		for (const line of lines) {
			let ws = toWords(line);
			if (isEmpty(ws[0]) || startsWith(ws[0], '//')) continue;
			let bp1 = replaceAllSpecialChars(line, '\t', '  ')
			if (!bp1.includes('http')) bp1 = stringBefore(bp1, '//');//achtung http://
			body += bp1 + '\n';
		}
		// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
		// body=sig+'{\n'+body;
		// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
		let isasync = isdef(asyncs[name]);
		let sig = `${isasync ? 'async ' : ''}function ${name}(${params})`;
		body = sig + '{\n' + body;
		res[name.trim()] = { name: name, params: params, sig: sig, body: body, async: isasync };
	}

	//console.log('functions', res); //get_keys(res));
	return res;

}
function parse_consts(code) {
	let res = {};
	//split code into lines
	let lines = code.split('\n');
	//console.log('lines',lines);
	for (const line of lines) {
		if (startsWith(line, 'const')) {
			//console.log('line',line);
			let c = stringBefore(stringAfter(line, 'const'), '=').trim();
			res[c] = c;
		}
	}
	return res;
}
function mDivC(dParent, styles, closable = true,) {
	let d = mDiv(dParent, styles);
	if (closable) mButtonX(d, ev => iClear(ev.target), 'tr')
	return d;
}
async function load_codebase_orig() {
	let dif = {}, dic = {};
	let paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	paths.push(`../game/done.js`);
	// let paths = [`../game/aaa.js`];
	CODE.paths = paths;
	for (const f of paths) {
		CODE.current_file = stringBefore(stringAfterLast(f,'/'),'.'); console.log('current file',CODE.current_file)
		let base = await route_path_text(f);
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}
function create_fiddle(dParent, code, rows = 10, cols = 120) {
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
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			let funcname = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
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
		} else if ('abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(k) && !ev.ctrlKey) {
			let icaret = AU.ta.selectionEnd;
			let line = getTextAreaCurrentLine(AU.ta);
			let iline = AU.ta.value.indexOf(line);
			let i = icaret - iline;
			let [istart, m] = lastIndexOfAny(line, [',', ' ', ')', '(', '{', '}', ';'], i - 1);
			let pf = line.slice(0, i);
			if (istart >= 0) pf = line.slice(istart + 1, i);
			AU.prefix = pf;
			au_show_list();
			if (!isEmpty(AU.list)) au_select_down();
		} else if (k != 'Shift') {
			au_reset();
		}
	}
}

function create_fiddle_ui(dParent, code, rows, cols) {
	mStyle(dParent, { position: 'relative' });
	let ta = mTextarea(rows, cols, dParent, { padding: 20, position: 'relative' }, 'taCode');
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: getRect(ta).w, align: 'right', maright: 4 });
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextarea(1, cols, dParent, { matop: 4, hpadding: 20, vpadding: 10, position: 'relative' }, 'taConsole');
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

function parse_funcs(code) {
	let res = {};
	let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
	let asyncnames = cfunctions.split('\r\nasync function');
	let asyncs = {};
	for (const x of asyncnames) {
		let name = stringBefore(x, '(').trim();
		//console.log('async', name);
		asyncs[name] = true;
	}
	cfunctions = asyncnames.join('\r\nfunction');
	let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
	//console.log('fbodies!!!!!!!!!!!'); //,fbodies)

	//console.log('fbodies',fbodies);
	for (const f of fbodies) {
		if ("'\"_!".includes(f[0])) continue;
		let name = stringBefore(f, '(');
		if (isEmpty(name)) continue;
		let params = stringBefore(stringAfter(f, '('), ') {');

		let lines = (stringAfter(f, ') {')).split('\r\n');
		let body = '';
		for (const line of lines) {
			let ws = toWords(line);
			if (isEmpty(ws[0]) || startsWith(ws[0], '//')) continue;
			//if (startsWith(line,'class')) {} //TODO
			//console.log('===>ws',ws)
			//console.log('bp',bp)
			let bp1 = replaceAllSpecialChars(line, '\t', '  ')
			if (!bp1.includes('http')) bp1 = stringBefore(bp1, '//');//achtung http://
			body += bp1 + '\n';
		}
		// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
		// body=sig+'{\n'+body;
		// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
		let isasync = isdef(asyncs[name]);
		let sig = `${isasync ? 'async ' : ''}function ${name}(${params})`;
		body = sig + '{\n' + body;
		res[name.trim()] = { name: name, params: params, sig: sig, body: body, async: isasync };
	}

	//console.log('functions', res); //get_keys(res));
	return res;

}
function parse_consts(code) {
	let res = {};
	//split code into lines
	let lines = code.split('\n');
	//console.log('lines',lines);
	for (const line of lines) {
		if (startsWith(line, 'const')) {
			//console.log('line',line);
			let c = stringBefore(stringAfter(line, 'const'), '=').trim();
			res[c] = c;
		}
	}
	return res;
}

async function load_codebase() {
	let dif = {}, dic = {};
	let paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	paths.push(`../game/done.js`);
	// let paths = [`../game/aaa.js`];
	CODE.paths = paths;
	for (const f of paths) {
		CODE.current_file = stringBefore(stringAfterLast(f,'/'),'.'); console.log('current file',CODE.current_file)
		let base = await route_path_text(f);
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}


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

function show_fiddle(code, rows, cols, fiddlestyles) {
	fiddleInit();
	// let dFiddle = mBy('dFiddle'); iClear(dFiddle); mCenterFlex(dFiddle);	//transition
	// if (isdef(fiddlestyles)) mStyle(dFiddle, fiddlestyles)
	// create_fiddle(dFiddle, code, rows, cols);
}
function fiddleControlHandler(ev) {
	if (ev.ctrlKey) {
		let instance = DA.tribute; //.events.shouldDeactivate(ev);
		instance.isActive = false;
		instance.hideMenu();

		console.log('ev.key', ev.key)
		if (ev.key == 'Enter') {
			runcode(ev.target.value);
			//let code = ev.shiftKey ? ev.target.value : getTextAreaCurrentLine(ev.target); runcode(code);
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
		return;
		if (ev.key == 'a') return;
		evStop(ev);
		//DA.tribute.current.mentionText='';
		//if (DA.tribute.isActive) { DA.tribute.appendCurrent([], true); DA.tribute.hideMenu(); }
		if (ev.key == 'Enter') {
			let code = ev.shiftKey ? ev.target.value : getTextAreaCurrentLine(ev.target);
			runcode(code);
		} else if (ev.key == '+' || ev.key == '=') {
			//create another fiddle below!
			fiddleAdd(dFiddle);
			DA.tribute.hideMenu();
		} else if (ev.key == '-' || ev.key == '_') {
			//remove all empty fiddles
			//let fi = arrChildren(dFiddle).slice(1, DA.tas.length + 1);
			let empty = DA.tas.filter(x => isEmptyOrWhiteSpace(x.value));
			let elfocus = document.activeElement;
			let nofocus = false;
			for (const ta of empty) { if (ta == elfocus) nofocus = true; ta.remove(); }
			DA.tas = arrMinus(DA.tas, empty);
			if (isEmpty(DA.tas)) fiddleAdd(dFiddle);
			else if (nofocus) { AU.ta = DA.tas[0]; AU.ta.focus(); }
			DA.tribute.hideMenu();
		} else if (ev.key == 'ArrowDown') {
			let ta = AU.ta = arrNext(arrChildren(dFiddle), AU.ta, 1, DA.tas.length + 1);
			ta.focus();
			DA.tribute.hideMenu();
		} else if (ev.key == 'ArrowUp') {
			let ta = AU.ta = arrPrev(arrChildren(dFiddle), AU.ta, 1, DA.tas.length + 1);
			ta.focus();
			DA.tribute.hideMenu();
		}
		//console.log('document.activeElement',document.activeElement)
	}
}
function arrMUELL(arr, el, inc, imin = 0, imax = null) {
	let i = arr.indexOf(el);
	let inew = i + inc;
	while (inew < 0) inew += arr.length;
	inew = inew % arr.length;
	inew = clamp(inew, imin, valf(imax, arr.length));
	let res = arr[inew];
	return res;
}
function create_fiddle(dParent, code, rows = 10, cols = 120) {
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
	let ta = mTextarea(rows, cols, dParent, { padding: 20, position: 'relative' }, 'taCode');
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: getRect(ta).w, align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextarea(1, cols, dParent, { matop: 4, hpadding: 20, vpadding: 10, position: 'relative' }, 'taConsole');
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
function mIntellisense(dParent, elem, list) {
	var tributeAttributes = {
		autocompleteMode: true,
		noMatchTemplate: '',
		values: list,
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
		replaceTextSuffix: '',
	};
	var trib = new Tribute(Object.assign({menuContainer: dParent,},tributeAttributes));
	trib.attach(elem); //document.getElementById('test-autocomplete-textarea'));

	elem.addEventListener('tribute-replaced', function (e) {
		console.log('Original Event:', e.detail.event);
		console.log('Matched item:', e.detail.item);
		//if matched item is of type function
		let key = e.detail.item.original.key;
		let item = window[key];
		if (typeof item == 'function'){
			//jetzt will ich param info!
			let d=mBy('dMessage');
			d.innerHTML = stringBefore(item.toString(),') {')+')';
		}
	});


	return trib;

}
function juPlus(dParent) {
	let tas = DA.tas = valf(DA.tas, []);
	let ta = mTextarea(3, null, dParent, { fz: 16, padding: 10, family: 'tahoma', w: '100%', box: true });
	tas.push(ta);
	return ta;

}
async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
		let asyncnames = cfunctions.split('\r\nasync function');
		let asyncs = {};
		for (const x of asyncnames) {
			let name = stringBefore(x, '(').trim();
			console.log('async', name);
			asyncs[name] = true;
		}
		cfunctions = asyncnames.join('\r\nfunction');
		let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		console.log('fbodies!!!!!!!!!!!'); //,fbodies)

		//console.log('fbodies',fbodies);
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ') {');

			let lines = (stringAfter(f, ') {')).split('\r\n');
			let body = '';
			for (const line of lines) {
				let ws = toWords(line);
				if (isEmpty(ws[0]) || startsWith(ws[0], '//')) continue;
				//if (startsWith(line,'class')) {} //TODO
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1 = replaceAllSpecialChars(line, '\t', '  ')
				if (!bp1.includes('http')) bp1 = stringBefore(bp1, '//');//achtung http://
				body += bp1 + '\n';
			}
			// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
			// body=sig+'{\n'+body;
			// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
			let isasync = isdef(asyncs[name]);
			let sig = `${isasync ? 'async ' : ''}function ${name}(${params})`;
			body = sig + '{\n' + body;
			res[name.trim()] = { name: name, params: params, sig: sig, body: body, async: isasync };
		}

		//console.log('functions', res); //get_keys(res));
		return res;

	}
	function parse_consts(code) {
		let res = {};
		//split code into lines
		let lines = code.split('\n');
		//console.log('lines',lines);
		for (const line of lines) {
			if (startsWith(line, 'const')) {
				//console.log('line',line);
				let c = stringBefore(stringAfter(line, 'const'), '=').trim();
				res[c] = c;
			}
		}
		return res;
	}

	let dif = {}, dic = {};
	// let paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
	// paths = paths.map(f => `../basejs/${f}.js`);
	// paths.push(`../game/done.js`);
	let paths = [`../game/aaa.js`];
	CODE.paths = paths;
	for (const f of paths) {
		let base = await route_path_text(f);
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}

function fiddle_set(k) {
	//simplest?
	let code = isdef(CODE.funcs[k]) ? CODE.funcs[k] : CODE.consts[k];
	let ta = mBy('taCode');
	//if (nundef(ta)) 
}



function test9_simple_intellisense() {
	let dParent = dTable = mBy('dTable');
	dMessage = mDiv(dTable, { w: '100%', bg: 'dimgray', fg: 'yellow', box: true, hpadding: 10 }, 'dMessage', 'enter code:');
	let ta = AU.ta = mTextarea(3, null, dParent, { fz: 16, padding: 10, family: 'tahoma', w: '100%', box: true });
	ta.addEventListener('keydown', ev => {
		if (ev.ctrlKey) {
			evStop(ev);
			console.log('tribute', DA.tribute.current.mentionText)
			if (ev.key == 'Enter') {
				let code = ev.shiftKey ? ev.target.value : getTextAreaCurrentLine(ev.target);
				runcode(code);
			} else if (ev.key == 'ArrowDown') {
				//create another fiddle below!
			}
		}
	});
	getGlobals();
	let list = Globals.function.map(x => ({ key: x.key, value: x.key + '(' })); //CODE.index.map(x=>({key:x,value:x}));
	DA.tribute = mIntellisense(dParent, ta, list); //muss danach geschehen damit propagation gestopped wird!
	ta.value = localStorage.getItem('code')
}
function test8_jup() {
	getGlobals();
	let dParent = dTable = mBy('dTable');
	let list = Globals.function.map(x => ({ key: x.key, value: x.key + '(' })); //CODE.index.map(x=>({key:x,value:x}));
	for (const n in range(5)) {
		let ta = juPlus(dParent);

		ta.addEventListener('keydown', ev => {
			if (ev.ctrlKey) {
				//console.log('stop!', ev.key)
				ev.preventDefault();
				ev.stopPropagation();
				ev.stopImmediatePropagation();
				if (ev.key == 'Enter') {
					let t = ev.target;
					let code = ev.shiftKey ? getTextAreaCurrentLine(t) : t.value;
					console.log('should run code', code)
					runcode(code);
				}
			}
		})
		// ta.addEventListener('keyup', ev => {
		// 	if (ev.ctrlKey) console.log('TRIGGER!!!', ev, ev.target, ev.target.value); return;
		// 	if (ev.key == 'Enter' && ev.ctrlKey) {
		// 		let t = ev.target;
		// 		let code = ev.shiftKey ? getTextAreaCurrentLine(t) : t.value;
		// 		runcode(code);
		// 	}
		// })
		mAutocomplete(dParent, ta, list); //muss danach geschehen damit propagation gestopped wird!

	}
}

function test8_jup(){
	getGlobals();
	let dParent = dTable = mBy('dTable'); 
	let list = Globals.function.map(x=>({key:x.key,value:x.key+'('})); //CODE.index.map(x=>({key:x,value:x}));
	for(const n in range(5)) {
		let ta=juPlus(dParent);
		mAutocomplete(dParent,ta,list); //['also','aber','all']);
	}
	return;
	//DA.tas sind all die textareas
	//ich brauch ein popup fuer intellisense
	AU.popup=mPopup(null,dTable,{ position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', family:'verdana', bg: 'powderblue', fg: 'black', border:'gray', radius:8  });

	//ich muss tas mit key handlers verseehen
	getGlobals();
	console.log('funcs',Globals.function);
	for(const ta of DA.tas){ fiddlify(ta);}
}
function fiddlify(ta){
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

function dummy_reaction(ev) { console.log('clicked', ev.target) }

function test9_autocomplete(){
	dTable = mBy('dTable'); 
	// let tb = mDiv(dTable, { hmargin: 10, padding: 10, cursor: 'pointer' }, null, null, 'top'); mFlexWrap(tb);
	// mButton('Dummy', dummy_reaction, tb);
	// mAutocomplete(tb);

	//mAutocomplete(dTable)

	// return;
	juPlus(dTable);
	let ta = DA.tas[0];
	ta.id='myinput';
	let list = [
		{ key: 'Alabama', value: 'Alabama' },
		{ key: 'Alaska', value: 'Alaska' },
		{ key: 'Arizona', value: 'Arizona' },
		{ key: 'Arkansas', value: 'Arkansas' },
		{ key: 'California', value: 'California' },
		{ key: 'Colorado', value: 'Colorado' },
		{ key: 'Connecticut', value: 'Connecticut' },
		{ key: 'Delaware', value: 'Delaware' },
		{ key: 'Florida', value: 'Florida' },
		{ key: 'Georgia', value: 'Georgia' },
		{ key: 'Hawaii', value: 'Hawaii' },
		{ key: 'Idaho', value: 'Idaho' },
		{ key: 'Illinois', value: 'Illinois' },
		{ key: 'Indiana', value: 'Indiana' },
		{ key: 'Iowa', value: 'Iowa' },
		{ key: 'Kansas', value: 'Kansas' },
		{ key: 'Kentucky', value: 'Kentucky' },
		{ key: 'Louisiana', value: 'Louisiana' },
		{ key: 'Maine', value: 'Maine' },
		{ key: 'Maryland', value: 'Maryland' },
		{ key: 'Massachusetts', value: 'Massachusetts' },
		{ key: 'Michigan', value: 'Michigan' },
		{ key: 'Minnesota', value: 'Minnesota' },
		{ key: 'Mississippi', value: 'Mississippi' },
		{ key: 'Missouri', value: 'Missouri' },
		{ key: 'Montana', value: 'Montana' },
		{ key: 'Nebraska', value: 'Nebraska' },
		{ key: 'Nevada', value: 'Nevada' },
		{ key: 'New Hampshire', value: 'New Hampshire' },
		{ key: 'New Jersey', value: 'New Jersey' },
		{ key: 'New Mexico', value: 'New Mexico' },
		{ key: 'New York', value: 'New York' },
		{ key: 'North Carolina', value: 'North Carolina' },
		{ key: 'North Dakota', value: 'North Dakota' },
		{ key: 'Ohio', value: 'Ohio' },
		{ key: 'Oklahoma', value: 'Oklahoma' },
		{ key: 'Oregon', value: 'Oregon' },
		{ key: 'Pennsylvania', value: 'Pennsylvania' },
		{ key: 'Rhode Island', value: 'Rhode Island' },
		{ key: 'South Carolina', value: 'South Carolina' },
		{ key: 'South Dakota', value: 'South Dakota' },
		{ key: 'Tennessee', value: 'Tennessee' },
		{ key: 'Texas', value: 'Texas' },
		{ key: 'Utah', value: 'Utah' },
		{ key: 'Vermont', value: 'Vermont' },
		{ key: 'Virginia', value: 'Virginia' },
		{ key: 'Washington', value: 'Washington' },
		{ key: 'West Virginia', value: 'West Virginia' },
		{ key: 'Wisconsin', value: 'Wisconsin' },
		{ key: 'Wyoming', value: 'Wyoming' },
	];

	list = CODE.index.map(x=>({key:x,value:x}));
	mAutocomplete(dTable,ta,list); //['also','aber','all']);
}
function mAutocomplete(dParent, elem, list) {

	// let html = `
	// 	<div id="test-autocomplete-textarea-container">
	// 		<textarea id="test-autocomplete-textarea" rows="4" style='box-sizing:border-box;width:100%;' placeholder="States of USA"></textarea>
	// 	</div>
	// 	`;
	// let d = mCreateFrom(html);
	// //list = list.map(x=>({key:x,value:x}));
	// mAppend(dParent, d);


	var tributeAttributes = {
		autocompleteMode: true,
		noMatchTemplate: '',
		values: list,
		selectTemplate: function (item) {
			if (typeof item === 'undefined') return null;
			if (this.range.isContentEditable(this.current.element)) {
				return '<span contenteditable="false"><a>' + item.original.key + '</a></span>';
			}

			return item.original.value;
		},
		menuItemTemplate: function (item) {
			return item.string;
		},
	};
	var tributeAutocompleteTestArea = new Tribute(
		Object.assign(
			{
				menuContainer: dParent, //document.getElementById('test-autocomplete-textarea-container'),
			},
			tributeAttributes
		)
	);
	tributeAutocompleteTestArea.attach(elem); //document.getElementById('test-autocomplete-textarea'));

}

function muell_autocomplete(dParent, elem, list) {
	function autocomplete(inp, arr) {
		var currentFocus;
		inp = toElem(inp);
		console.log('inp', inp)
		inp.addEventListener('input', function (e) { /*execute a function when someone writes in the text field:*/
			console.log('ev input', e)
			var a, b, i, val = this.value;		/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) { return false; }
			currentFocus = -1;
			a = document.createElement('DIV'); /*create a DIV element that will contain the items (values):*/
			a.setAttribute('id', this.id + 'autocomplete-list');
			a.setAttribute('class', 'autocomplete-items');
			this.parentNode.appendChild(a); /*append the DIV element as a child of the autocomplete container:*/
			for (i = 0; i < arr.length; i++) {
				if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					b = document.createElement('DIV'); /*create a DIV element for each matching element:*/
					// b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'; /*make the matching letters bold:*/
					b.innerHTML = arr[i].substr(0, val.length); /*make the matching letters bold:*/
					b.innerHTML += arr[i].substr(val.length);
					b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"; /*insert a input field that will hold the current array item's value:*/
					b.addEventListener('click', function (e) {
						inp.value = this.getElementsByTagName('input')[0].value; /*insert the value for the autocomplete text field:*/
						closeAllLists();
					});
					a.appendChild(b);
				}
			}
		});
		inp.addEventListener('keydown', function (e) {
			var x = document.getElementById(this.id + 'autocomplete-list');
			if (x) x = x.getElementsByTagName('div');
			if (e.keyCode == 40) { // arrow DOWN
				currentFocus++;
				addActive(x);
			} else if (e.keyCode == 38) { //arrow UP
				currentFocus--;
				addActive(x);
			} else if (e.keyCode == 13) { // ENTER
				e.preventDefault();  // if the ENTER key is pressed, prevent the form from being submitted
				if (currentFocus > -1) {
					if (x) x[currentFocus].click(); // simulate a click on the "active" item:
				}
			}
		});
		inp.addEventListener('dblclick', function (e) { evNoBubble(e); });

		function addActive(x) {
			// works with classes from styles.css
			if (!x) return false;
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = x.length - 1;
			x[currentFocus].classList.add('autocomplete-active');
		}
		function removeActive(x) {
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove('autocomplete-active');
			}
		}
		function closeAllLists(elmnt) {
			var x = document.getElementsByClassName('autocomplete-items');
			for (var i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != inp) {
					x[i].parentNode.removeChild(x[i]);
				}
			}
		}

		document.addEventListener('click', function (e) {
			closeAllLists(e.target);
		});
	}
	if (nundef(list)) list = Geo.continents.Europe; console.log('list', list)
	mClass(dParent, 'autocomplete');
	autocomplete(elem, list);
}
function mAutocomplete(dParent) {
	let form = mCreateFrom(`
		<form class='autoform' autocomplete="off" action="javascript:void(0);">
			<div class="autocomplete" style="width: 200px">
				<!--<input id="_myInput" type="text" name="_myCity" placeholder="City" onclick="select()" />-->
				<textarea rows=3 id="myInput" type="text" name="myCity" placeholder="City" onclick="select()"></textarea>
			</div>
			<input style="margin-left:-15px" type="submit" value="Go!" />
		</form>
	`	);
	form.onsubmit = () => {
		let c = mBy('myInput').value.toLowerCase();
		console.log('submit',c);
		// let o = Geo.cities[c];
		// if (nundef(o)) { c = toUmlaut(c); o = Geo.cities[c]; }
		// console.log('c', c);
		// let center = o.center;
		// M.map.flyTo(center, M.map.getZoom(), { animate: false })
	}
	let d = mAppend(dParent, form);
}

async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		//let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
		//let x=cfunctions.split('\r\nfunction'); console.log('splitab',x)
		//let fbodies = splitAtAnyOf(cfunctions,['\r\nfunction','\r\nasync function']).map(x => x.trim()); NO!
		// let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		
		let asyncnames = cfunctions.split('\r\nasync function');
		let asyncs={};
		for(const x of asyncnames){
			let name = stringBefore(x,'(').trim();
			console.log('async',name);
			asyncs[name]=true;
		}
		cfunctions = asyncnames.join('\r\nfunction');
		let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		console.log('fbodies',fbodies)

		//console.log('fbodies',fbodies);
		//let trailing_async = false;
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ') {');
			//if (params.includes('\n')) console.log('params',params);

			//console.log('params',params)
			//let last2=stringLast(params,2);
			//if (last2 != ') ') console.log('...!!!!!!!!',params); //params.substring(params.length-3,params.length)+'"')


			let lines = (stringAfter(f, '{')).split('\r\n');
			//console.log('________bodyparts',bodyparts);
			let body = '';
			//let prev_async = trailing_async; trailing_async=false;
			
			for(const line of lines){
				let ws=toWords(line);
				if (isEmpty(ws[0]) || startsWith(ws[0],'/')) continue;
				if (startsWith(line,'async')) {trailing_async = true; continue;} //gehoert zur next line!!!!
				if (startsWith(line,'class')) {
					//this has to be treated as a NEW function!!!!!
					//das ist recursiv!!!!!!!!!
				}
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1=replaceAllSpecialChars(line,'\t','  ')
				bp1=stringBefore(bp1,'//');
				body+=bp1+'\n';
			}
			// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
			// body=sig+'{\n'+body;
			// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
			let isasync=isdef(asyncs[name]);
			let sig = `${isasync?'async ':''}function ${name}(${params})`;
			body=sig+'{\n'+body;
			res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: isasync };
		}

		//console.log('functions', res); //get_keys(res));
		return res;

	}
	function parse_consts(code) {
		let res = {};
		//split code into lines
		let lines = code.split('\n');
		//console.log('lines',lines);
		for (const line of lines) {
			if (startsWith(line, 'const')) {
				//console.log('line',line);
				let c = stringBefore(stringAfter(line, 'const'), '=').trim();
				res[c] = c;
			}
		}
		return res;
	}

	let dif = {}, dic = {};
	let paths = ['basemin']; //'basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	//paths.push(`../game/done.js`);
	CODE.paths = paths;
	for (const f of paths) { 
		let base = await route_path_text(f); 
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}

async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		//let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
		//let x=cfunctions.split('\r\nfunction'); console.log('splitab',x)
		//let fbodies = splitAtAnyOf(cfunctions,['\r\nfunction','\r\nasync function']).map(x => x.trim()); NO!
		// let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		
		let asyncnames = cfunctions.split('\r\nasync function');
		let asyncs={};
		for(const x of asyncnames){
			let name = stringBefore(x,'(').trim();
			console.log('async',name);
			asyncs[name]=true;
		}
		asyncnames.join('\r\nfunction');
		let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		console.log('fbodies',fbodies)

		//console.log('fbodies',fbodies);
		let trailing_async = false;
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ') {');
			//if (params.includes('\n')) console.log('params',params);

			//console.log('params',params)
			//let last2=stringLast(params,2);
			//if (last2 != ') ') console.log('...!!!!!!!!',params); //params.substring(params.length-3,params.length)+'"')


			let lines = (stringAfter(f, '{')).split('\r\n');
			//console.log('________bodyparts',bodyparts);
			let body = '';
			let prev_async = trailing_async; trailing_async=false;
			
			for(const line of lines){
				let ws=toWords(line);
				if (isEmpty(ws[0]) || startsWith(ws[0],'/')) continue;
				if (startsWith(line,'async')) {trailing_async = true; continue;} //gehoert zur next line!!!!
				if (startsWith(line,'class')) {
					//this has to be treated as a NEW function!!!!!
					//das ist recursiv!!!!!!!!!
				}
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1=replaceAllSpecialChars(line,'\t','  ')
				bp1=stringBefore(bp1,'//');
				body+=bp1+'\n';
			}
			let sig = `${prev_async?'async ':''}function ${name}(${params})`;
			body=sig+'{\n'+body;
			res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
		}

		//console.log('functions', res); //get_keys(res));
		return res;

	}
	function parse_consts(code) {
		let res = {};
		//split code into lines
		let lines = code.split('\n');
		//console.log('lines',lines);
		for (const line of lines) {
			if (startsWith(line, 'const')) {
				//console.log('line',line);
				let c = stringBefore(stringAfter(line, 'const'), '=').trim();
				res[c] = c;
			}
		}
		return res;
	}

	let dif = {}, dic = {};
	let paths = ['basemin']; //'basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	//paths.push(`../game/done.js`);
	CODE.paths = paths;
	for (const f of paths) { 
		let base = await route_path_text(f); 
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}

function show_sidebar(di, prop_key, prop_info) {
	dSidebar = mBy('dSidebar'); mStyle(dSidebar,{wmin:200, hmax:window.innerHeight-68,overy:'auto'})
	let keys = get_keys(di);
	keys.sort();
	//console.log('keys', keys);
	dBottom = mBy('dBottom')
	for (const k of keys) { 
		let key = isdef(prop_key)?di[k][prop_key]:k;
		let d=mDiv(dSidebar, { cursor:'pointer',wmin: 100 }, null, key,'hop1') 
		let info = isdef(prop_info)?di[k][prop_info]:di[k];

		info = k+'('+di[k].params+')\n'+info;
		

		d.onclick = ()=>show_fiddle(info); //mNode(info,dBottom,k); //dBottom.innerHTML = `<pre>${toYaml(di[k].body)}</pre>`;
	}
	//for (const k in di) { mDiv(dSidebar, { wmin: 100 }, null, di[k][prop]) }
}

function show_sidebar(di, prop_key, prop_info) {
	let h = window.innerHeight - 68;
	// let w = window.innerWidth - 320;
	// let rows = h / 18;
	// let cols = w / 8;
	dSidebar = mBy('dSidebar'); mStyle(dSidebar, { w: 300, hmax: h, overy: 'auto' });
	//mStyle('dFiddle',{h:h})
	let keys = get_keys(di);
	keys.sort();
	//console.log('keys', keys);
	//dBottom = mBy('dBottom')
	for (const k of keys) {
		let key = isdef(prop_key) ? di[k][prop_key] : k;
		let d = mDiv(dSidebar, { cursor: 'pointer', wmin: 100 }, null, key, 'hop1')
		let info = isdef(prop_info) ? di[k][prop_info] : di[k];
		d.onclick = () => AU.ta.value = info;
	}
	// show_fiddle('', rows, cols)
}


function perform_search(records) {
	let words = toWords(mBy('iKeywords').value);
	console.log('keywords are', words, 'records', records);

	let res = [], i = 0;
	for (const c of records) {
		for (const w of words) {
			let w1 = w.toLowerCase();
			let kw = c.kw.toLowerCase();
			let code = c.c.toLowerCase();
			if (kw.includes(w1) || code.includes(w1)) {
				res.push(c);
				c.index = i;
				break;
			}
		}
		i++;
	}

	console.log('filtered:', res);
	show_code_list(mBy('dSearchResult'), res);

}
function show_code_list(dParent, list) {
	iClear(dParent);

	for (const code of list) {
		let d = mDiv(dParent, { w: '100%' });
		let dkw = mDiv(d, {}, null, code.kw);
		let text = code.c; let lines = text.split('\n'); let rows = lines.length; // count lines
		//let minmax = arrMinMax(lines, x => x.length); let max = minmax.max;//find longest line
		let dcode = mDiv(d, {}, null, `<textarea rows=${rows} cols=120>${code.c}</textarea>`);
	}
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





//function fitbit_close(item) {	console.log('fitbit CLOSE!!!!!!!!!!!!!!!');}


//#region canvas update
function update_position_random(item){rPosition(item);}
function update_position_noise(item){rnPosition(item);}
//#endregion

//#region canvas draw
function draw_ellipse(item){}
//#endregion




function rNoise(min,max,lastx,speed) {

	if (nundef(lastx)) lastx=Perlin.lastx;
	if (nundef(speed)) speed=Perlin.speed;
	lastx+=speed;

	//console.log('lastx',lastx)
	let r01=rPerlin(lastx);
	//console.log('r01',r01)
	let n = map_range(r01, 0, 1, min, max);
	return n;
}
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
	let tacon = mTextArea(1, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
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

