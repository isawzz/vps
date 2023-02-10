
function test2(){
	if (nundef(CODE.closureKeysSorted)) test1();
	console.log('closure',CODE.closureKeysSorted);
	let text = CODE.closureKeysSorted.map(x=>CODE.justcode[x]).join('\r\n');
	downloadAsText(text,'hallo','js');
}
function test1(){
	let code = AU.ta.value;
	let disub = computeClosure(code);
	let keys = {};
	for (const type in disub) {
		let klist = sortCaseInsensitive(get_keys(disub[type]));
		//console.log('', type, klist)
		
		klist.map(x=>keys[x]=disub[type][x]);
		
		//die richtige sortierung waere die die in allcode drin ist!
	}
	CODE.lastClosure = disub;
	CODE.closureKeys = keys;
	let ksorted=[];
	for(const k of CODE.keysSorted){
		if (isdef(CODE.closureKeys[k])) ksorted.push(k);
	}
	CODE.closureKeysSorted = ksorted;
}
async function test0(){
	dTable = mSection({ h: window.innerHeight - 68 }, 'dTable');

	//howto_open();
	fiddleInit();
	show_sidebar(sortCaseInsensitive(get_keys(CODE.di.func)), onclickCodeInSidebar);
	onclickCodeInSidebar('mAutocomplete')
}



















