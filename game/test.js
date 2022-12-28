
var AU = {};
function runcode(code) {
	let x = eval(code);
	AU.tacon.value = x;
}
function au_show_list() {
	let [popup, ta, fnames] = [AU.popup, AU.ta, AU.fnames];
	if (isEmpty(AU.prefix)) hide(popup);
	else {
		AU.list = fnames.filter(x => startsWith(x, AU.prefix));
		au_show_list();
		let mousepos = getCaretCoordinates(ta, ta.selectionEnd);
		// console.log('list', AU.list, '\nmousepos', mousepos);
		show(popup)
		mPos(popup, mousepos.left, mousepos.top + 25);
		mClear(popup);
		AU.n = -1;
		AU.selected = null;
		for (const w of AU.list) {
			mDiv(popup, {}, w, w)
		}
	}
}
async function sidebar_load(url){
	let code = await route_path_text(url); 
	//jetzt brauch ich alle functions in dem code und alle globals
	let functions = parse_functions(code);
	console.log('functions',functions);
	let keys = get_keys(functions); 
	keys.sort();
	console.log('keys',keys); 
	for(const k of keys){
		mDiv(dSidebar,{w:100},null,functions[k].name)
	}
}
function test4_intelli() {
	dTable = dTable = mSection({ position: 'relative' }, 'dTable'); mCenterFlex(dTable);
	let ta = mTextArea(20, 90, dTable, { padding: 20, position: 'relative' });
	let tacon = mTextArea(10, 90, dTable, { matop:4,padding: 20, position: 'relative' });

	dSidebar = mBy('dSidebar');
	sidebar_load('../basejs/board.js');


	// ta.addEventListener('input', function () {
	// 	// var caret = getCaretCoordinates(this, this.selectionEnd);
	// 	// console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
	// })

	AU.popup = mDiv(dTable, { position: 'absolute', wmin: 100, hmin: 100, hmax:600, overy:'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)

	AU.fnames = get_keys(DA.functions); AU.fnames.sort();
	AU.list = [];
	AU.prefix = '';
	AU.selected = null;
	AU.n = -1;
	AU.ta = ta;
	AU.tacon = tacon;

	ta.onkeydown = ev=>{
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key;
		let fnames = AU.fnames;
		let popup = AU.popup;
		console.log('k', k)
		if (k == ' ' || k == ')') {
			// console.log('pressed SPACE'); //YES!
			AU.list = [];
			AU.prefix = '';
			AU.n = -1;
			AU.selected = null;
			hide(popup);
		} else if (k == 'Control') {
			hide(popup);
			runcode(AU.ta.value)
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.functions[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'Backspace' && AU.prefix.length>1) {
			AU.prefix = AU.prefix.slice(0, -1);
			console.log('prefix', AU.prefix)
			if (isEmpty(AU.prefix)) hide(popup);
			else {
				AU.list = fnames.filter(x => startsWith(x, AU.prefix));
				let mousepos = getCaretCoordinates(ta, ta.selectionEnd);
				// console.log('list', AU.list, '\nmousepos', mousepos);
				show(popup)
				mPos(popup, mousepos.left, mousepos.top + 25);
				mClear(popup);
				//let d=mDiv(popup,{overy:'auto'})
				AU.n = -1;
				AU.selected = null;
				for (const w of AU.list) {
					mDiv(popup, {}, w, w)
				}
			}
		} else if (k == 'ArrowDown' && !isEmpty(AU.list)) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (isLetter(k) || k == '_') {
			console.log('pressed letter', k); //YES!
			AU.prefix += k;
			console.log('prefix', AU.prefix)
			AU.list = fnames.filter(x => startsWith(x, AU.prefix));
			let mousepos = getCaretCoordinates(ta, ta.selectionEnd);
			// console.log('list', AU.list, '\nmousepos', mousepos);
			show(popup)
			mPos(popup, mousepos.left, mousepos.top + 25);
			mClear(popup);
			AU.n = -1;
			AU.selected = null;
			for (const w of AU.list) {
				mDiv(popup, {}, w, w)
			}
		} else if (k!='Shift') {
			console.log('ELSE!!!!!!!!!')
			AU.list = [];
			AU.prefix = '';
			AU.n = -1;
			AU.selected = null;
			hide(popup);

		}
		//if ()










	}

}

function startloop() { FR = 30; DA.interval = setInterval(draw_canvases, 1000 / FR) }
function pauseloop() { clearInterval(DA.interval); }
function rPosition(o) { return [rNumber(0, o.w), rNumber(0, o.h)]; }
function rInc(o, prop, min, max) { o[prop] += rNumber(min, max); return o[prop]; }
function draw_canvases() {
	//console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
	for (const id in Items) {
		let canvas = Items[id];
		if (isdef(canvas.draw)) canvas.draw(canvas); else console.log('id', id, 'no draw')
	}
}
function draw_perlin_xy(item) {
	cClear(item.cv, item.cx);
	item.randx = valf(item.randx, 0) + .01;
	item.randy = valf(item.randy, 10000) + .02;
	item.x = map_range(rPerlin(item.randx), 0, 1, -item.w / 2, item.w / 2);
	item.y = map_range(rPerlin(item.randy), 0, 1, -item.h / 2, item.h / 2);
	cEllipse(item.x, item.y, 25, 25, { bg: 'white' }, 0, item.cx);
}
function test3_p5_perlin_2d() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_xy }); // () => draw_perlin_xy(o) });
	o.play();
}
function draw_perlin_x(item) {
	cClear(item.cv, item.cx);
	let r = rPerlin(item.x);
	item.r = map_range(r, 0, 1, -item.w / 2, item.w / 2);
	cEllipse(item.r, 0, 25, 25, { bg: 'white' }, 0, item.cx);
	item.x += .02;
}
function test2_p5_perlin() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_x }); // () => draw_perlin_x(o) });
	o.play();
}
function draw_random_walk(item) {
	//console.log('id',item.id,item.x,item.y)
	cClear(item.cv, item.cx);
	cEllipse(rInc(item, 'x', -2, 2), rInc(item, 'y', -2, 2), 30, 20, { bg: 'blue', fg: 'green' }, 0, item.cx);
}
function test4() { test2(); }
function test3() { test1(); }
function test2() {
}
function test1_p5_init() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_random_walk }); // draw: () => draw_random_walk(o) });
}

function test0_random() {

	let n = rNumber(12, 20); //there is no function random in js (it is in p5)
	console.log('n', n)

}













