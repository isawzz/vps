
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









