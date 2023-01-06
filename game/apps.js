//#region action
function action_open(item) {
	console.log('HALLO OPEN!!!!!!!!!!!!!!!')
	let o = { tStart: get_now(), app: 'action' };
	toLocalStorage(o, 'app');
	let d = iDiv(item);
	let d1 = mDiv(d, { fz: 15, position: 'absolute', top: 2, right: 4 }, null, new Date(o.tStart).toTimeString().substring(0, 5));
	//let d2=mDiv(d); mCenterFlex(d2); let i=0;
	let d2 = mGrid(3, 3, d, { gap: 3, matop: 12 });

	for (const n of [.5, 1, 2, 3, 5, 8, 12, 20, 50]) {
		let b = mButton(n, () => item.val = n, d2, { cursor: 'pointer' });
		//i++; if (i % 3 == 0) mLinebreak(d2);
	}
	//mLinebreak(d);
	// let d1 = mDiv(d2, { fz: 12 }, null, 'start: ' + new Date(o.tStart).toTimeString().substring(0, 5));
}
function action_close(item) {
	console.log('HALLO CLOSE!!!!!!!!!!!!!!!')
	let o = fromLocalStorage('app');
	let duration = get_now() - o.tStart;
	let factor = valf(item.val, 3); //Number(prompt("Enter Level (1 easy...10 hard: "));
	let secs = Math.round(duration / 1000);
	let mins = Math.round(secs / 60);
	let res = mins; //TODO: mins
	let points = Math.round(res * factor / 5); if (points == 0) points = 1;
	let t = new Date(o.tStart).toTimeString().substring(0, 5); //.toISOString(); //.toLocaleDateString();//.padStart(10, '0');
	let s = `a:${t},${res},${points}`;

	console.log('string:', s);

	//navigator.clipboard.writeText(s).then(function (x) { console.log("string", s); });
	//navigator.clipboard.writeText(s); 
	setTimeout(() => navigator.clipboard.writeText(s), 100)
}
//#endregion

//#region book
function book_open(item) {
	console.log('BOOK OPEN!!!!!!!!!!!!!!!');
	let d = iDiv(item);
	let dg = mGrid(2, 1, d, { gap: 3, matop: 22 });
	//let titles = ['Intro to CS', 'Animals'];
	let books = DB.appdata.book;
	for (const book of books) {
		let d1 = mDiv(dg, { fg: rColor(23) }, null, book.title, 'hop1');
		d1.onclick = () => book_open_title(book.id);
	}
}
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

//#region fitbit
function fitbit_open(item) {
	console.log('FITBIT OPEN!!!!!!!!!!!!!!!')
	let d = iDiv(item);
	//let d1 = mDiv(d, { fz:15,position:'absolute',top:2,right:4 }, null, new Date(o.tStart).toTimeString().substring(0, 5));
	//let d2=mDiv(d); mCenterFlex(d2); let i=0;
	let d2 = mGrid(2, 1, d, { gap: 3, matop: 22 });

	//how to compute avg
	let arr = DB.appdata.fitbit;
	let days = arr.length;
	let sum = arrSum(arr, 'steps');
	let opt = DB.apps.fitbit.options;
	let min_per_day = opt.min;
	let avg_per_day = opt.avg;
	let req_sum = avg_per_day * (days + 1);
	let req_today = Math.max(req_sum - sum, opt.min);
	let avg = sum / days;
	let davg = mDiv(d2, {}, null, `avg: ${avg.toFixed(1)}K`);
	let dtoday = mDiv(d2, {}, null, `req: ${Math.ceil(req_today)}K`);
}
//#endregion

//#region howto
function howto_open(item) {
	dSearch = mBy('dSearch');
	mStyle(dSearch, { bg: item.color });
	mSearch(() => perform_search(DB.appdata.howto), dSearch, {}, 'input');
}
function howto_close(item) {
	iClear('dSearch');
	iClear('dSearchResult');
}

function perform_search(records) {
	let words = toWords(mBy('iKeywords').value);
	console.log('keywords are', words, 'records', records);

	let res = [], i = 0;
	for (const c of records) {
		for (const w of words) {
			let w1 = w.toLowerCase();
			let kw = c.kw.toLowerCase();
			let code = c.c.toLowerCase();
			if (kw.includes(w1) || code.includes(w1)) {
				res.push(c);
				c.index = i;
				break;
			}
		}
		i++;
	}

	console.log('filtered:', res);
	show_code_list(mBy('dSearchResult'), res);

}
function show_code_list(dParent, list) {
	iClear(dParent);

	for (const code of list) {
		let d = mDiv(dParent, { w: '100%' });
		let dkw = mDiv(d, {}, null, code.kw);
		let text = code.c; let lines = text.split('\n'); let rows = lines.length; // count lines
		//let minmax = arrMinMax(lines, x => x.length); let max = minmax.max;//find longest line
		let dcode = mDiv(d, {}, null, `<textarea rows=${rows} cols=120>${code.c}</textarea>`);
	}
}
//#endregion












