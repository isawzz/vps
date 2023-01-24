
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


if (this && typeof module == "object" && module.exports && this === module.exports) {
	module.exports = {
		parseCodefile,
	};
}





