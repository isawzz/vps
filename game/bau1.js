
function parse_funcs_1(code, fname) {

	let di = {}, text = '';

	let lines = code.split('\r\n');
	let di_started = false;
	let parsing=false,code,ending;

	for (const l of lines) {

		if (parsing){
			if (ending(l)){
				parsing=false;
				
			}
			code += 
		}
		if (startsWith(l, '//#region')) {
			let region=CODE.region = firstWordAfter(l, 'region');
			//console.log('file',fname,'#region',region);
			continue;
		}else if (startsWith(l,'var')){
			//define all vars in this line
			let vs = stringAfter(l,'var').trim().split(',');
			vs.map(x=>firstWord(x)).map(y=>lookupAddToList(di,['var'],y));
			//return;
		}else if (startsWith(l,'const')){
			lookupAddToList(di,['const'],toWords(l)[1]);
		} else if (startsWith(l,'class')){
			//parse a class
			//how to parse a class???
		}else if (startsWith(l,'async') || startsWith(l,'function')){
			//how to parse a func?
			//diese line bis line starting with '}'
			parsing=true;
			code = l;
			ending = l=>startsWith(l,'}');
		}



	}

	di.var.sort();
	console.log('di',di);
	return {di:di,text:text};
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








function mDivC(dParent, styles, closable = true,) {
	let d = mDiv(dParent, styles);
	if (closable) mButtonX(d, ev => iClear(ev.target), 'tr')
	return d;
}
























