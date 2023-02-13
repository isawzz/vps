function test15() {
	let d = document.body; mClass(d, 'fullpage');
	let areas = [
		'dTestButtons dTestButtons',
		'dSearch dSidebar',
		'dFiddle dSidebar',
		'dTable dSidebar',
	];
	let cols = '1fr 200px';
	let rows = 'auto auto auto 1fr';
	dGrid = mGridFrom(d, areas, cols, rows);

	for(const ch of arrChildren(dGrid)){
		console.log('rect',ch.id,getRect(ch))
	}

	mStyle(dGrid,{fg:'white',bg:'silver'})
	//console.log('dFiddle',dFiddle);	return;
	//setTimeout(test15_weiter,100);
	test15_weiter();
}
function test15_weiter(){
	mStyle(dFiddle,{padding:4,h:400});
	mClear(dFiddle)
	dTestButtons.innerHTML = 'Test Buttons'
	mDom(dFiddle,{},{html:'Fiddle'})
	// dFiddle.innerHTML = 'Fiddle';
	//mStyle(dFiddle,{h:500});
	//mClear(dFiddle);
	AU.ta = mDom(dFiddle, { w100: true, hrest:true, bg: '#ffffff80' }, { tag: 'textarea', id: 'ta', className: 'plain hop1' });
	console.log('AU.ta', AU.ta)
}

function test14() {
	let d = document.body;
	mClass(d, 'fullpage');
	dTable = mDom100(d, { bg: GREEN, padding: 4 }, { id: 'dTable', html: 'TABLE' });
	dFiddle = mDomRest(dTable, { bg: RED, padding: 4 }, { id: 'dFiddle', inner: 'Fiddle<br>' });
	AU.ta = mDomRest(dFiddle, { w100: true, bg: '#ffffff80' }, { tag: 'textarea', id: 'ta', className: 'plain hop1' });
	console.log('AU.ta', AU.ta)

}
function test13() {
	let d = document.body;
	dTable = mDiv(d, { box: true, padding: 4, w: '100vw', h: '100vh', bg: GREEN }, 'dTable');
	dFiddle = mDiv(dTable, { w: 200, h: 200, bg: RED, padding: 4 }, 'dFiddle');
	dTitle = mDiv(dFiddle, {}, null, 'Fiddle');
	AU.ta = mTaPlain(dFiddle, { w: '100%', h: 'rest', bg: '#ffffff80' }, { id: 'ta', className: 'plain' });
	console.log('AU.ta class', AU.ta)

}
function test12() {
	let areas = [
		'dTestButtons dTestButtons',
		'dSearch dSidebar',
		'dFiddle dSidebar',
		'dTable dSidebar',
	];
	let cols = '1fr 200px';
	let rows = 'auto auto 1fr 1fr';
	let d = document.body; d.innerHTML = '';
	mGridFrom(d, areas, cols, rows);
}

function test11() {
	let m = [
		'dTestButtons dTestButtons',
		'dSearch dSidebar',
		'dFiddle dSidebar',
		'dTable dSidebar',
	];
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let warr = toWords(line);
		console.log('warr', warr)
		for (const w of warr) if (!words.includes(w)) words.push(w);
		//w.map(x => addIf(words, w));

	}
	console.log('gta', gta);
	console.log('words', words)
	let d = document.body; d.innerHTML = '';
	let dParent = mDiv(d, { h: '100vh', bg: BLUE, display: 'grid', 'grid-template-areas': gta });
	dParent.style.gridTemplateColumns = '1fr 200px';
	dParent.style.gridTemplateRows = '60px 60px 1fr 1fr';
	for (const w of words) {
		window[w] = mDiv(dParent, { 'grid-area': w, bg: rColor() }, w, w)
	}
	// mDiv(dParent, { 'grid-area': 'dTestButtons', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dSearch', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dSidebar', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dFiddle', bg: rColor() }, null, 'd')
	// mDiv(dParent, { 'grid-area': 'dTable', bg: rColor() }, null, 'd')

}
function test10() {
	let m = [
		'dTestButtons dTestButtons',
		'dSearch dSidebar',
		'dFiddle dSidebar',
		'dTable dSidebar',
	];
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let w = toWords(line, 'true');
		w.map(x => addIf(words, w));

	}


	//jetzt mach das grid
	let d = document.body; d.innerHTML = '';
	let dParent = mDiv(d, { h: '100vh', bg: BLUE, display: 'grid', 'grid-template-areas': gta });

	for (const w of words) {
		window[w] = mDiv(dParent, { 'grid-area': w, bg: rColor() }, w, w);

	}

}
function test09() {

	let gta = `'myArea . . .' 'myArea . hallo hallo'`;
	let d = document.body; d.innerHTML = '';
	let dParent = mDiv(d, { h: '100vh', bg: BLUE, display: 'grid', 'grid-template-areas': gta });
	//return;
	let i1 = mDiv(dParent, { 'grid-area': 'myArea', bg: 'red' }, null, 'myArea')
	for (let i = 0; i < 4; i++) { let ii = mDiv(dParent, { bg: rColor() }, null, 'was' + i); }
	let i6 = mDiv(dParent, { 'grid-area': 'hallo', bg: 'red' }, null, 'hallo')


	let layout = [
		'dTestButtons', 'dTestButtons'
	]

}
function test08() {
	dTable = mSection({ h: window.innerHeight - 128 }, 'dTable');
	dSearch = mSection({ padding: 2 }, 'dSearch'); mInputLineWithButtons(dSearch, { Go: fiddleSearch }, 'grid');
	show_sidebar(sortCaseInsensitive(get_keys(CODE.di.func)), onclickCodeInSidebar);
	onclickCodeInSidebar('addGridToBody');

}
function test07() {
	mClear(document.body)
	addGridToBody(3, 4);

}
function test06() {
	//mClear(document.body);
	let divnames = get_keys(CODE.di.var);
	divnames = divnames.filter(x => x[0] == 'd' && x[1] == x[1].toUpperCase() && !isNumber(x[x.length - 1]));
	show_sidebar(sortCaseInsensitive(divnames), onclickCodeInSidebar);
	console.log('divnames', divnames.join());
	let s = 'dActions,dAux,dAuxContent,dBottom,dButtons,dCenter,dCode,dConsole,dContent,dCurrent,dError';
	let s1 = 'dFeedback,dFiddle,dFleetingMessage,dFooter,dGameControls,dGames,dGameTitle,dHeader,dHelp,dHint';
	let s2 = 'dInstruction,dLeft,dLeiste,dLevel';
	let s3 = 'dLineBottom,dLineBottomLeft,dLineBottomMiddle,dLineBottomOuter,dLineBottomRight';
	let s4 = 'dLineTable,dLineTableLeft,dLineTableMiddle,dLineTableOuter,dLineTableRight';
	let s5 = 'dLineTitle,dLineTitleLeft,dLineTitleMiddle,dLineTitleOuter,dLineTitleRight';
	let s6 = 'dLineTop,dLineTopLeft,dLineTopMiddle,dLineTopOuter,dLineTopRight';
	let s7 = 'dLinks,dLoggedIn,dLogo,dMain,dMap,dMenu,dMessage,dMoveControls,dOben';
	let s7a = 'dPage,dParent,dPlayerNames,dPlayerStats';
	let s8 = 'dPuppet,dRechts,dRight,dScore,dSettings,dSidebar,dStatus,dSubmitMove';
	let s9 = 'dTable,dTableName,dTables,dTableShield,dTitle,dTop,dUnten,dUserControls,dUsers';
}
function test05() {
	dTable = mSection({ h: window.innerHeight - 128 }, 'dTable');
	dSearch = mSection({ padding: 2 }, 'dSearch'); mInputLineWithButtons(dSearch, { Go: fiddleSearch }, 'grid');
	show_sidebar(sortCaseInsensitive(get_keys(CODE.di.func)), onclickCodeInSidebar);
	onclickCodeInSidebar('SimpleGrid');

}
function test04() {
	dTable = mSection({ h: window.innerHeight - 68 }, 'dTable');

	dSearch = mSection({}, 'dSearch'); mInputLineWithButtons(dSearch, { Go: fiddleSearch }, 'grid');

	//fiddleInit();

	show_sidebar(sortCaseInsensitive(get_keys(CODE.di.func)), onclickCodeInSidebar);
	onclickCodeInSidebar(rChoose(CODE.keylist)); //'mAutocomplete')

}
function test03() {
	if (nundef(CODE.closureKeysSorted)) test1();
	console.log('closure', CODE.closureKeysSorted);
	let text = CODE.closureKeysSorted.map(x => CODE.justcode[x]).join('\r\n');
	downloadAsText(text, 'hallo', 'js');
}
function test02() {
	let code = AU.ta.value;
	let disub = computeClosure(code);
	let keys = {};
	for (const type in disub) {
		let klist = sortCaseInsensitive(get_keys(disub[type]));
		//console.log('', type, klist)

		klist.map(x => keys[x] = disub[type][x]);

		//die richtige sortierung waere die die in allcode drin ist!
	}
	CODE.lastClosure = disub;
	CODE.closureKeys = keys;
	let ksorted = [];
	for (const k of CODE.keysSorted) {
		if (isdef(CODE.closureKeys[k])) ksorted.push(k);
	}
	CODE.closureKeysSorted = ksorted;
}
async function test01() {
	dTable = mSection({ h: window.innerHeight - 68 }, 'dTable');

	howto_open();
	//fiddleInit();
	show_sidebar(sortCaseInsensitive(get_keys(CODE.di.func)), onclickCodeInSidebar);
	onclickCodeInSidebar('mAutocomplete')
}
async function test00() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); //console.log("DB", DB); //jetzt gibt es DB
	let dicode = CODE.di = await route_path_yaml_dict('../basejs/z_all.yaml');
	let dijustcode = CODE.justcode = await route_path_yaml_dict('../basejs/z_allcode.yaml');
	let dihistory = CODE.history = await route_path_yaml_dict('../basejs/z_allhistory.yaml');

	dTable = mSection({ h: window.innerHeight - 68 }, 'dTable');

	//howto_open();
	fiddleInit();
	show_sidebar(sortCaseInsensitive(get_keys(dicode.func)), onclickCodeInSidebar);
	onclickCodeInSidebar('mAutocomplete')
}



















