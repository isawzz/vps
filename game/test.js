
function test10(list){
	
	console.log('codebase list',list);
	let text=list.map(x=>x.text).join('\n');
	//downloadAsText(text,'hallo','js');
	//console.log('DB.appdata.simple:', DB.appdata.simple);	console.log('current url',document.URL);

	let funcnames = list[0].di.func;
	let txt=
		`if (this && typeof module == "object" && module.exports && this === module.exports) {\r\n`
		+ `  module.exports = {\r\n`;
	for(const fname of funcnames){
		txt+=`    ${fname},\r\n`
	};
	txt+='  }\r\n}';
	DA.text=txt;
	//downloadAsText(txt,'hallo.js');


}
function test9_dbSave() { DB.appdata.simple = [1, 2, 3, 4, 5]; } //dbSave(); }
function test8_simple_intellisense() {
	dTable = mBy('dTable');
	fiddleInit();
	//fiddleAdd(dParent);
}
function test7_card() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let x = ui_type_hand(['3Hn', '4Hn', '4Hl'], dTable); console.log('hand', x);

	iReg(x);

	let c = ari_get_card('QDn', 500); mAppend(dTable, iDiv(c));

	animatedTitle();
}

function test5_prelim() { }
//________________
function test4_intelli() {
	dTable = dTable = mSection({ position: 'relative' }, 'dTable'); mCenterFlex(dTable);
	let ta = mTextarea(10, 90, dTable, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	// setTimeout(()=>ta.focus(),100); //ta.autofocus=true,10);
	let buttons = mDiv(dTable, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextarea(3, 90, dTable, { matop: 4, padding: 20, position: 'relative' });

	//dSidebar = mBy('dSidebar');	sidebar_load('../basejs/board.js');
	ta.focus();


	// ta.addEventListener('input', function () {
	// 	// var caret = getCaretCoordinates(this, this.selectionEnd);
	// 	// console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
	// })

	AU.popup = mDiv(dTable, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)

	AU.fnames = get_keys(CODE.funcs); AU.fnames.sort();
	AU.list = [];
	AU.prefix = '';
	AU.selected = null;
	AU.n = -1;
	AU.ta = ta;
	AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key;
		let fnames = AU.fnames;
		let popup = AU.popup;
		//console.log('keyup!!!!!!!!!!!:', k);
		// if (k == 'Enter') {
		// 	console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAA', ev)

		// 	if (is_key_down('Control')) console.log('CONTROL!!!!!!')
		// 	if (is_key_down('control')) console.log('CONTROL!!!!!!')
		// 	if (ev.ctrlKey) console.log('CONTROL!!!!!!')
		// 	if (ev.altKey) console.log('ALT!!!!!!')
		// 	if (ev.shiftKey) console.log('SHIFT!!!!!!')
		// 	if (ev.metaKey) console.log('META!!!!!!'); //das ist der window key aber er suppressed Enter, so never come here!
		// 	return;
		// }
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == ' ' || k == ')') {
			AU.previous = AU.prefix;
			//if completed existing function, now is the time to display params!
			if (isdef(AU.fnames[AU.previous])) {
				let w = AU.selected = AU.previous;
				//AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
				AU.uebernommen = CODE.funcs[w];
				//show(popup)
				popup.innerHTML = AU.previous + '(' + AU.uebernommen.params + ')';
			} else {
				au_reset();
			}
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = CODE.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'Backspace' && AU.prefix.length > 1) {
			AU.prefix = AU.prefix.slice(0, -1);
			au_show_list();
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
			//console.log('pressed letter', k); //YES!
			if (isEmpty(AU.prefix)) AU.selectionEnd = AU.ta.selectionEnd;
			AU.prefix += k;
			au_show_list();

		} else if (k != 'Shift') {
			au_reset();
			//console.log('ELSE!!!!!!!!!')
		}
		//if ()










	}

}
function test3_p5_perlin_2d() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_xy }); // () => draw_perlin_xy(o) });
	o.play();
}
function test2_p5_perlin() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: draw_perlin_x }); // () => draw_perlin_x(o) });
	o.play();
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













