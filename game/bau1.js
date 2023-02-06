
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
	//console.log('_start', f)
	//console.log('_start', f1.toString());

	let text = f1.toString();
	let done = {}, n_old = 0;
	let tbd = ['_start'], n_new = 1;

	let MAX = 1007, i = 0;
	let alltext = '';

	while (!isEmpty(tbd)) {
		if (++i > MAX) break;

		let sym = tbd[0];
		let o = CODE.all[sym];
		if (o.type != 'func'){tbd.shift(); lookupSet(done,[o.type,sym],o); continue; } 
		let olive = window[sym];
		if (nundef(olive)) { tbd.shift(); lookupSet(done,[o.type,sym],o); continue; } 

		let text = olive.toString();
		if (!isEmpty(text)) alltext += text + '\r\n';

		let words = toWords(text, true); //console.log('words', words);

		for (const w of words) {
			if (nundef(done[w]) && w!=sym && isdef(CODE.all[w])) addIf(tbd, w);
		}
		tbd.shift();
		lookupSet(done,[o.type,sym],o); //done[sym] = o;
	}

	console.log('_______________after',i,'iter:')
	console.log('done', done); //Object.keys(done));

	//let funcs = Object.keys(done).filter(x=>CODE.all[x].type == 'func');
	//console.log('funcs', funcs);
	console.log('tbd', tbd);

	// console.log('alltext', alltext);
	//jetzt mach ich einen text aus nur dem code fuer die dinge die ich tatsaechlich brauche!
	let tres='';

	for(const k in done){
		tres+= done[k].code+'\r\n';
	}

	downloadAsText(tres,'mycode');
}



















