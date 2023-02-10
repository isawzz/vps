onload = _start1; // _start1 | __start

async function __start() {
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

async function _start1() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms();
	await load_db();
	await loadCode();
	test0();
}
async function loadCode(){
	let text = CODE.text = await route_path_text('../allcode.js');

	let keysSorted = [];
	let lines = text.split('\r\n');
	for(const l of lines){
		if (['var','const','cla','func'].some(x=>l.startsWith(x))){
			let key=firstWordAfter(l,' ',true);
			keysSorted.push(key);
		}
	}
	CODE.keysSorted = keysSorted;
	//console.log('keysSorted',keysSorted);

	CODE.di = await route_path_yaml_dict('../basejs/z_all.yaml');
	CODE.justcode = await route_path_yaml_dict('../basejs/z_allcode.yaml');
	CODE.history = await route_path_yaml_dict('../basejs/z_allhistory.yaml');
	let keys = {};
	for (const k in CODE.di) { for (const k1 in CODE.di[k]) keys[k1] = CODE.di[k][k1]; }
	CODE.all = keys;
	CODE.keylist = Object.keys(keys)
	//let inter = intersection(Object.keys(keys), Object.keys(window));
	//console.log('intersection',inter);
	//7748 in intersection, also ca 400 jeweils extra, ergibt total of 8500 keys ca.
}
