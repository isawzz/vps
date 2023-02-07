onload = _start;

async function _start() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); //console.log("DB", DB); //jetzt gibt es DB
	let dicode = CODE.di = await route_path_yaml_dict('../basejs/z_all.yaml');
	let dijustcode = CODE.justcode = await route_path_yaml_dict('../basejs/z_allcode.yaml');
	let kwindow = get_keys(window);

	show_sidebar(sortCaseInsensitive(get_keys(dicode.const)),show_code);
	//test100();
}

function rest() {
	// show_sidebar(sortCaseInsensitive(get_keys(superdi.const)));
	// dTable = mBy('dTable');
	// fiddleInit();

}

