
function mSidebar(){
	let d=document.body;
	mDiv(d,{float:'left',h:'100vh'},'dSidebar','HALLO','section');
}







function book_get(id){return DB.appdata.book.find(x=>x.id == id);}
function book_open_title(id) {
	clear_all();

	dTable = mSection({ bg: DB.apps.book.color }, 'dTable', null, null, 'bookgrid');

	let book = book_get(id);
	let dTitle = mDiv(dTable, {}, null, book.title)
	dContent = mDiv(dTable, {}, 'dContent'); mCenterFlex(dContent);
	dContent.setAttribute('book',id);
	let footer = mDiv(dTable, { align: 'center' });
	for (const p of range(1, book.pages)) {
		maButton(p, ()=>book_open_page(p), footer);
	}
}

function parse_functions(code){
	let res = {};
	let cfunctions = 'function ' + stringAfter(code,'function '); //jump to first function def
	let fbodies = cfunctions.split('function').map(x=>x.trim());
	//console.log('fbodies',fbodies);
	for(const f of fbodies){
		let name = stringBefore(f,'(');
		if (isEmpty(name)) continue;
		let params = stringBefore(stringAfter(f,'('),')');
		let firstline = stringBefore(stringAfter(f,'{'),'\n');
		let body = stringBefore(stringAfter(f,'{'),'}');
		res[name.trim()] = {name:name,params:params,firstline:firstline,body:body};
	}

	console.log('functions',res); //get_keys(res));
	return res;

}

function eval_code(){
	let code = G.textarea.value;

	// let statements = code.split(';').map(x=>x.trim());
	// for(const st of statements) eval(st)
	eval(code);
}
function book_open_page(page){
	pauseloop();Items={};
	let book=G=book_get(dContent.getAttribute('book'))
	console.log('current book is',book)
	let func = window[`book_${book.id}_${page}`];
	G.canvas = func();
	console.log('func',func,typeof func)
	let t=mTextArea(15,100,dContent);
	//t.value=func;
	//t.value = func.toString().replace(/^[^{]*{\s*/,'\t').replace(/\s*}[^}]*$/,'');
	t.onfocus=()=>G.canvas.pause();
	G.textarea = t;
	
	maButton('RUN',eval_code,dContent)
}
function book_cs_1(){
	mClear(dContent);
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: () => draw_random_walk(o) });
	return o;
}
function book_cs_2(){
	mClear(dContent);
	let o = mCanvas(dContent, { w: 600, h: 300 }, {}, startloop, pauseloop, 'cc');
	iAdd(o, {}, { draw: () => draw_perlin_x(o) });
	o.play();
	return o;
	
}
function book_cs_3(){ return book_cs_1();}
function book_cs_4(){ return book_cs_2();}


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























