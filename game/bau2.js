
async function load_codebase() {
	let dif = {}, dic = {};
	let paths = ['basemin']; //, 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	//paths.push(`../game/done.js`);
	// let paths = [`../game/aaa.js`];
	CODE.paths = paths;
	for (const f of paths) {
		CODE.current_file = stringBefore(stringAfterLast(f, '/'), '.'); //console.log('current file', CODE.current_file)
		let base = await route_path_text(f);

		let res = parse_funcs_1(base,CODE.current_file);

		// let dinew = parse_funcs(base);
		// addKeys(dinew, dif);
		// let dicnew = parse_consts(base);
		// addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}
function firstWordAfter(s, sub) {
	let s1=stringAfter(s,sub);
	//console.log(s1);
	let s2=toWords(s1)[0]
	return s2;
}
function firstWord(s){return toWords(s)[0];}











function show_sidebar(list, handler) {
	dSidebar = mBy('dSidebar'); mStyle(dSidebar, { w: 300, h: window.innerHeight - 68, overy: 'auto' });
	for (const k of list) {
		let d = mDiv(dSidebar, { cursor: 'pointer', wmin: 100 }, null, k, 'hop1')
		d.onclick = handler;
	}
}
function show_code(ev) {
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
function download_all_functions() {
	let s = '';
	for (const k of CODE.index) {
		s += CODE.funcs[k].body + '\n';
	}
	create_fiddle_ui(mBy('dTable'), s, 1000, 120)
	//downloadAsText(s,'hallo','js');
}









