
//#region autocomplete in textarea
function au_show_list() {
	let [popup, ta, fnames] = [AU.popup, AU.ta, AU.fnames];

	//console.log('prefix', AU.prefix)
	if (isEmpty(AU.prefix)) au_reset(); //hide(popup);
	else {
		AU.list = fnames.filter(x => startsWith(x, AU.prefix));

		if (isEmpty(AU.list)) {
			AU.list = Object.keys(window).filter(x => startsWith(x, AU.prefix));
			AU.list = AU.list.concat(get_keys(DA.consts).filter(x => startsWith(x, AU.prefix)));

			//add to that Items keys
			AU.list = AU.list.concat(get_keys(Items).filter(x => startsWith(x, AU.prefix)));

		}
		if (isEmpty(AU.list)) {
			hide(popup);
		} else {
			let mousepos = getCaretCoordinates(ta, ta.selectionStart - AU.prefix.length);
			//console.log('mousepos',mousepos)
			let r = getRect(ta, dCode);
			//console.log('r',r.l,r.t)
			//console.log('mousepos', mousepos);
			show(popup)
			mPos(popup, mousepos.left + r.l, mousepos.top + 18); // + 18, mousepos.top + 25);
			// mPos(popup, mousepos.left + 18, mousepos.top + 25);
			mClear(popup);
			AU.n = -1;
			AU.selected = null;
			for (const w of AU.list) {

				if (isdef(DA.funcs[w])) mDiv(popup, {}, w, w + '(' + DA.funcs[w].params + ')')
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

//#region book app
function book_get(id) { return DB.appdata.book.find(x => x.id == id); }
function book_open_title(id) {
	clear_all();

	dTable = mSection({ bg: DB.apps.book.color }, 'dTable', null, null, 'bookgrid');

	let book = book_get(id);
	let dTitle = mDiv(dTable, {}, null, book.title)
	dContent = mDiv(dTable, {}, 'dContent'); mCenterCenterFlex(dContent);
	dContent.setAttribute('book', id);
	//mLinebreak(dTable)
	dCode = mDiv(dTable, {}, 'dCode'); mCenterFlex(dCode);
	let footer = mDiv(dTable, { align: 'center' });
	for (const p of range(1, book.pages)) {
		maButton(p, () => book_open_page(p), footer);
	}
}
function book_open_page(page) {
	pauseloop(); Items = {}; mClear(dContent); mClear(dCode);
	let book = G = book_get(dContent.getAttribute('book'))
	let func = window[`book_${book.id}_${page}`];
	let o = G.canvas = func();
	iReg(o);//return;
	dButtons = G.canvas.controls;

	addKeys(G, window);
	//copyKeys(G.canvas, window)
	create_fiddle(dCode);

	o.play();

}
function book_cs_1() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw=draw_random_walk; 
	//o.draw = () => draw_random_walk(o);
	return o;
}
function book_cs_2() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw=draw_perlin_x; 
	return o;
}
function book_cs_3() { 
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw=draw_perlin_xy; 
	return o;
}
function book_cs_4() { return book_cs_2(); }
//#endregion
























