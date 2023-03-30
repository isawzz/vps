function mybundle(js_path){
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
