function create_fiddle1(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && ev.ctrlKey && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == 'Escape' && !isEmpty(AU.list)) {
			au_reset();
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'ArrowDown' && ev.ctrlKey && !isEmpty(AU.list) ) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && ev.ctrlKey && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else {
			let [w,prefix]=getTextAreaCurrentWord(AU.ta);
			console.log('current word',w,prefix);
			AU.prefix=prefix;
			au_show_list();
		}
	}
}
function create_fiddle0(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
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
				AU.uebernommen = DA.funcs[w];
				//show(popup)
				popup.innerHTML = AU.previous + '(' + AU.uebernommen.params + ')';
			} else {
				au_reset();
			}
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
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
	}
}


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
			let mousepos = getCaretCoordinates(ta, AU.ta.selectionEnd-AU.prefix.length);
			//console.log('mousepos', mousepos);
			show(popup)
			mPos(popup, mousepos.left,mousepos.top+15); // + 18, mousepos.top + 25);
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
function au_run() { au_reset(); runcode(AU.ta.value); show_ids(); }
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
function getTextAreaCurrentWord_(el) {
	let line = '', word = '';
	if (el instanceof HTMLTextAreaElement) {
		let s = el.value;
		let i_caret = el.selectionStart;
		let i_last_break_before_caret = s.lastIndexOf('\n', i_caret - 1);
		if (i_last_break_before_caret < 0) i_last_break_before_caret = 0;
		let i_next_break = s.indexOf('\n', i_caret);
		if (i_next_break < 0) i_next_break = s.length - 1;
		let i_caret_within_line = i_caret - i_last_break_before_caret;
		line = s.slice(i_last_break_before_caret + 1, i_next_break);

		let i_space_before = line.lastIndexOf(' ', i_caret_within_line - 1);
		if (i_space_before < 0) i_space_before = 0;

		let i_space_after = line.indexOf(' ', i_caret_within_line);
		if (i_space_after < 0) i_space_after = line.length - 1;

		word = line.slice(i_space_before, i_space_after);

	}
	//document.getElementById('result').innerHTML = '"'+line+'"';
	return word;
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

function mSidebar() {
	let d = document.body;
	mDiv(d, { float: 'left', h: '100vh' }, 'dSidebar', 'HALLO', 'section');
}







function book_get(id) { return DB.appdata.book.find(x => x.id == id); }
function book_open_title(id) {
	clear_all();

	dTable = mSection({ bg: DB.apps.book.color }, 'dTable', null, null, 'bookgrid');

	let book = book_get(id);
	let dTitle = mDiv(dTable, {}, null, book.title)
	dContent = mDiv(dTable, {}, 'dContent'); mCenterCenterFlex(dContent);
	dContent.setAttribute('book', id);
	dCode = mDiv(dTable,{},'dCode'); mCenterFlex(dCode);
	let footer = mDiv(dTable, { align: 'center' });
	for (const p of range(1, book.pages)) {
		maButton(p, () => book_open_page(p), footer);
	}
}

function eval_code() {
	let code = G.textarea.value;

	// let statements = code.split(';').map(x=>x.trim());
	// for(const st of statements) eval(st)
	eval(code);
}
function book_open_page(page) {
	pauseloop(); Items = {}; mClear(dContent); mClear(dCode);
	let book = G = book_get(dContent.getAttribute('book'))
	//console.log('current book is', book)
	let func = window[`book_${book.id}_${page}`];
	G.canvas = func();
	dButtons = G.canvas.div;
	//console.log('func', func, typeof func)
	//#region old code
	// let t = mTextArea(15, 100, dContent);
	// //t.value=func;
	// //t.value = func.toString().replace(/^[^{]*{\s*/,'\t').replace(/\s*}[^}]*$/,'');
	// t.onfocus = () => G.canvas.pause();
	// G.textarea = t;
	// maButton('RUN', eval_code, dContent)
	//#endregion

	//globalize stuff
	//addKeys({start:G.canvas.play,stop:G.canvas.pause},G)
	addKeys(G, window);
	copyKeys(G.canvas, window)


	//let dCode = mDiv(dContent);
	create_fiddle(dCode);

	let code = `a=[1,2,3]; a[0];
mDiv(dTable,{w:100,h:100,bg:'red'});
a=[1,2,3,4,5,6]; a[2]; stop();
start();
lastIndexOfAny('das ist gut',[' '],4);
lastIndexOfAny(') das) ist gut)) ',[' ',')'],10);
lastIndexOfAny('das ist gut',[' '],4);
lastIndexOfAny('das ist gut',[' '],4);`;
	let scode = localStorage.getItem('code');
	if (isdef(scode)) code = scode;
	AU.ta.value = code;

	G.canvas.play();
}
function book_cs_1() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: () => draw_random_walk(o) });
	return o;
}
function book_cs_2() {
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: () => draw_perlin_x(o) });
	return o;
}
function book_cs_3() { return book_cs_1(); }
function book_cs_4() { return book_cs_2(); }


function half_goal() {
	//if 
}

function create_day() {
	// available: j l q u x y z
	let list = 'action bath caffeine dunder essen fam ges haushalt interrupt kitchen meditate notion odf piano relax sleep therapy violin walk';
	list = 'action chillax lesen klavier pause random sleep walk';
	let body = 'gehen liegen sitzen';
	let communicate = 'stille musik hoeren sprechen';
	let mind = 'denken ges musik reden spiel tv';
	let channels = 'bliss observer ego'; //'future now past';
	let ego = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let negsubjects = 'finance leute moving nasi prison oasis reise';
	let possubjects = 'beethoven freiheit games klavier math music number programming spaz tod zauber';
	let moods = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let poswords = 'himmel engel math algebra skyblue klavier beethoven spaziergang backen office redmond microsoft games';
	let negwords = 'wien menschen oasis immobilien geld finanzen erledigungen termin nasi prison past future taxes';

	//ich haett so gern einen job bei ms aber dazu muss ich das ego bisschen reduzieren
	//was muss ich machen um einen job bei ms zu bekommen? ist das nicht ein valid goal egal jetzt ob ich es tatsaechlich realisiere, einfach es in my mind so gestalten
	//ein jms besteht in: 
	//- prog 9-5 dh 8x60=500' per day, 3k' per week
	//- design documents schreiben: do NOT write code without plan!
	//- dazwischen sind paar meetings: die muss ich auch simulieren
	//- I have a boss / manager who tells me what the requirements are
	//- there are timelines and deadlines
	//- there is some learning / edu involved as well!
	//- best practice has to be followed

	//clearly, a portfolio and a skill set is what I need!
	//ich muss eine loesung finden fuer:
	// - vergessen von gelerntem
	// - unter zeitdruck arbeiten koennen
	// - energie-mangel during day
	// - vereinbarung mit real-life pflichten (fam stuff)

}























