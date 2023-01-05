
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
			iClear(popup);
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
function book_blaettern(page){
	if (DA.currentpage != page && isNumber(DA.currentpage)) mStyleRemove(dFooter.children[DA.currentpage], 'fg');
	mStyle(dFooter.children[page], { fg: 'yellow' });
	DA.currentpage = page;
	dTitle.innerHTML = DA.currentbook.title + ' pg.' + page;
}
function book_get(id) { return jsCopy(DB.appdata.book.find(x => x.id == id)); }
function book_open_title(id,page) {
	clear_all();

	dTable = mSection({ bg: DB.apps.book.color }, 'dTable', null, null, 'bookgrid');

	let book = DA.currentbook = book_get(id);
	dTitle = mDiv(dTable, {}, null, book.title)
	dContent = mDiv(dTable, {}, 'dContent'); mCenterCenterFlex(dContent);
	dContent.setAttribute('book', id);
	//mLinebreak(dTable)
	//dCode = mDiv(dTable, {}, 'dCode'); mCenterFlex(dCode);
	let footer = dFooter = mDiv(dTable, { align: 'center' });
	maButton('<', () => book_open_prev_page(), footer);
	for (const p of range(1, book.pages)) {
		maButton(p, () => book_open_page(p), footer);
	}
	maButton('>', () => book_open_next_page(), footer);
	book_open_page(valf(page,1));
}
function book_open_next_page() {
	let page = isNumber(DA.currentpage) ? DA.currentpage + 1 : 1;
	if (page > DA.currentbook.pages) page = 1;
	book_open_page(page);
}
function book_open_prev_page() {
	let page = isNumber(DA.currentpage) ? DA.currentpage - 1 : DA.currentbook.pages;
	if (page < 1) page = DA.currentbook.pages;
	book_open_page(page);
}
function book_open_page(page) {
	pauseloop(); iClear(dContent); //iClear(dCode);

	book_blaettern(page);

	let book = G = book_get(dContent.getAttribute('book'));
	let func = window[`book_${book.id}_${page}`];
	let o = G.canvas = func();
	iReg(o);
	dButtons = G.canvas.controls;

	addKeys(G, window);	//copyKeys(G.canvas, window); //create_fiddle(dCode,o.draw);

	o.play();

}
function book_cs_1() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw = draw_random_walk;
	//o.draw = () => draw_random_walk(o);
	return o;
}
function book_cs_2() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw = draw_perlin_x;
	return o;
}
function book_cs_3() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	o.draw = draw_perlin_xy;
	return o;
}
function book_cs_4() { 
	let o = mCanvas(dContent, { w: 600, h: 300, bg:'transparent' }, {}, startloop, pauseloop, 'cc');
	o.draw = draw_random_walk;
	return o;
}
function book_animals_1() {
	//das ist sehr schlecht!!! creating Items that will never be cleaned up!!!!
	
	let pics={};
	for(const k of KeySets.animals){
		let item = miPic(k,dContent)
		pics[k]=item;
	}

	return {pics:pics,play:()=>{}};
}
//#endregion

//#region canvas loop
function set_context(item) {
	CONTEXT = isDict(item) ? item
		: isString(item) && isdef(Items[item]) ? Items[item]
			: isNumber(item) && isdef(Items[`_${item}`]) ? Items[`_${item}`]
				: get_values(Items)[0];
}
function reset_context() { CONTEXT = null; }
function startloop() { FR = 30; DA.interval = setInterval(update_draw_items, 1000 / FR) }
function pauseloop() { clearInterval(DA.interval); }
function update_draw_items() {
	//curitems = isdef(CONTEXT) ? isList(CONTEXT)?CONTEXT: [CONTEXT] : get_values(Items);
	for (const item of get_values(Items)) {
		//let item = Items[id];
		if (isdef(item.update)) item.update(item); //else console.log('id', id, 'no draw')
		if (isdef(item.draw)) item.draw(item); //else console.log('id', id, 'no draw')
	}
}
function rPosition(o) {
	let [xoff, yoff] = isdef(o.origin) ? [-o.origin.x, -o.origin.y] : [0, 0];
	return [o.x, o.y] = [rNumber(0, o.w) + xoff, rNumber(0, o.h) + yoff];
}
function rnPosition(o,speed) {
	let [xoff, yoff] = isdef(o.origin) ? [-o.origin.x, -o.origin.y] : [0, 0];
	return [o.x, o.y] = [rNoise('x',0, o.w,speed) + xoff, rNoise('y',0, o.h,speed) + yoff];
}
function rNoise(channel,min,max,speed=0.02) {
	if (nundef(Perlin.channels[channel])) Perlin.channels[channel]=rNumber(0,10000);
	let lastx=Perlin.channels[channel];
	if (nundef(speed)) speed=Perlin.speed;
	lastx+=speed;
	Perlin.channels[channel] = lastx;
	let r01=rPerlin(lastx);
	let n = map_range(r01, 0, 1, min, max);
	return n;
}
function rInc(o, prop, min, max) { o[prop] += rNumber(min, max); return o[prop]; }
//#endregion

//#region canvas update
function update_position_random(item){rPosition(item);}
function update_position_noise(item){rnPosition(item);}
//#endregion

//#region canvas draw
function draw_ellipse(item){}
//#endregion


//#region canvas draw+update
function draw_random_walk(item) {
	//console.log('id',item.id,item.x,item.y)
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	cEllipse(rInc(item, 'x', -2, 2), rInc(item, 'y', -2, 2), 30, 20, { bg: 'blue', fg: 'green' }, 0, cx);
}
function draw_perlin_x(item) {
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	let r = rPerlin(item.x);
	item.r = map_range(r, 0, 1, -item.w / 2, item.w / 2);
	cEllipse(item.r, 0, 25, 25, { bg: 'white' }, 0, cx);
	item.x += .02;
}
function draw_perlin_xy(item) {
	let [cv, cx] = [item.live.cv, item.live.cx];
	cClear(cv, cx);
	item.randx = valf(item.randx, 0) + .01;
	item.randy = valf(item.randy, 10000) + .02;
	item.x = map_range(rPerlin(item.randx), 0, 1, -item.w / 2, item.w / 2);
	item.y = map_range(rPerlin(item.randy), 0, 1, -item.h / 2, item.h / 2);
	cEllipse(item.x, item.y, 25, 25, { bg: 'white' }, 0, cx);
}

//#endregion






















