
async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let fbodies = cfunctions.split('function').map(x => x.trim());
		//console.log('fbodies',fbodies);
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ')');
			//let firstline = stringBefore(stringAfter(f, '{'), '\n');
			//let body = stringBeforeLast(stringAfter(f, '{'), '}');
			//console.log('f',f)
			let bodyparts = ('{'+stringAfter(f, '{')).split('\r\n');
			//console.log('________bodyparts',bodyparts);
			let body = '';
			for(const bp of bodyparts){
				let ws=toWords(bp);
				if (isEmpty(ws[0]) || startsWith(ws[0],'/')) continue;
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1=replaceAllSpecialChars(bp,'\t','  ')+'\n';
				body+=bp1;
				// bp1=bp.trim();
				// if (toWords(bp1)[0][0]=='/') continue;
				// body+=replaceAllSpecialChars(bp1,'\t','  ')+'\n';
			}
			// body = `function ${name}(${params})${body}`;
			// body = replaceAllSpecialChars(body,'\t','  ');
			// body = replaceAllSpecialChars(body,'\r\n','\n');
			res[name.trim()] = { name: name, params: params, body: body };
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
	let paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths.push(`../game/done.js`);
	for (const f of paths) { 
		let base = await route_path_text(f); 
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	DA.funcs = dif;
	DA.consts = dic;

	//old code
	//let base = await route_path_text('../basejs/basemin.js');
	//DA.funcs = parse_funcs(base);

}

















