onload = _start1;

async function __start() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); //console.log("DB", DB); //jetzt gibt es DB
	let dicode = CODE.di = await route_path_yaml_dict('../basejs/z_all.yaml');
	let dijustcode = CODE.justcode = await route_path_yaml_dict('../basejs/z_allcode.yaml');

	dTable = mSection({h: window.innerHeight - 68},'dTable'); // mBy('dTable');

	computeClosure();
	//howto_open();
	//fiddleInit();
	//show_sidebar(sortCaseInsensitive(get_keys(dicode.func)),show_code);
}

async function _start1() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms(); 
	await load_db(); 
	let dicode = CODE.di = await route_path_yaml_dict('../basejs/z_all.yaml');
	let dijustcode = CODE.justcode = await route_path_yaml_dict('../basejs/z_allcode.yaml');
	computeClosure(['_start1']);
}
