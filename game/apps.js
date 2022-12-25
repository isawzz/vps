function action_open(item) {
	console.log('HALLO OPEN!!!!!!!!!!!!!!!')
	let o = { tStart: get_now(), app: 'action' };
	toLocalStorage(o, 'app');
	let d = iDiv(item);
	let d1 = mDiv(d, { fz:15,position:'absolute',top:2,right:4 }, null, new Date(o.tStart).toTimeString().substring(0, 5));
	//let d2=mDiv(d); mCenterFlex(d2); let i=0;
	let d2 = mGrid(3, 3, d, { gap: 3, matop: 12 });

	for (const n of [.5, 1, 2, 3, 5, 8, 12, 20, 50]) {
		let b = mButton(n, () => item.val = n, d2, {cursor:'pointer'});
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

function fitbit_open(item) {
	console.log('FITBIT OPEN!!!!!!!!!!!!!!!')
	let d = iDiv(item);
	//let d1 = mDiv(d, { fz:15,position:'absolute',top:2,right:4 }, null, new Date(o.tStart).toTimeString().substring(0, 5));
	//let d2=mDiv(d); mCenterFlex(d2); let i=0;
	let d2 = mGrid(2, 1, d, { gap: 3, matop: 22 });

	//how to compute avg
	let arr = DB.appdata.fitbit;
	let days = arr.length;
	let sum = arrSum(arr,'steps');
	let opt=DB.apps.fitbit.options;
	let min_per_day = opt.min;
	let avg_per_day = opt.avg;
	let req_sum = avg_per_day*(days+1);
	let req_today = Math.max(req_sum - sum,opt.min);
	let avg=sum / days;
	let davg=mDiv(d2,{},null,`avg: ${avg.toFixed(1)}K`);
	let dtoday=mDiv(d2,{},null,`req: ${Math.ceil(req_today)}K`);
}
//function fitbit_close(item) {	console.log('fitbit CLOSE!!!!!!!!!!!!!!!');}

function howto_open(item){
	dSearch = mBy('dSearch');
	mStyle(dSearch,{bg:item.color});
	mSearch(()=>perform_search(DB.appdata.howto),dSearch,{},'input');
}
function howto_close(item){
	mClear('dSearch');
	mClear('dSearchResult');
}

function perform_search(records){
	let words = toWords(mBy('iKeywords').value);
	console.log('keywords are',words,'records',records);

	let res = [], i=0;
	for(const c of records){
		for(const w of words){
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

	console.log('filtered:',res);
	show_code_list(mBy('dSearchResult'),res);

}
function show_code_list(dParent,list) {
	mClear(dParent);
	
	for (const code of list) {
		let d = mDiv(dParent, { w: '100%' });
		let dkw = mDiv(d, {}, null, code.kw);
		let text = code.c; let lines = text.split('\n'); let rows = lines.length; // count lines
		//let minmax = arrMinMax(lines, x => x.length); let max = minmax.max;//find longest line
		let dcode = mDiv(d, {}, null, `<textarea rows=${rows} cols=120>${code.c}</textarea>`);
	}
}













