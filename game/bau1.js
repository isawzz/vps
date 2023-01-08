
function stringLast(s,n){	return s.substring(s.length-n,s.length);}

async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let fbodies = cfunctions.split('function').map(x => x.trim());
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
	let paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths.push(`../game/done.js`);
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

function fiddle_set(k){
	//simplest?
	let code = isdef(CODE.funcs[k])?CODE.funcs[k]:CODE.consts[k];
	let ta = mBy('taCode');
	//if (nundef(ta)) 
}
















