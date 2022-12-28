onload = start;

async function start() {
	let timit = new TimeIt('* using timit *');
	set_run_state(); //vps und multiclients mit sockets sein? set_run_state(false,true,3000,false,false,false,true);

	//saven von db choices: 
	// 1. db_update hat param save that is per default false
	// 2. db_update koennte fuer admin updates true, sonst false haben, oder irgendwie so (anfang von move: true, sonst: false)
	// 3. bei SINGLECLIENT kann auch nur wenn window deactivated wird saven
	// 4. or, uebernaechste line: when any client closes browser, save db at server
	onpagedeactivated(db_save_client);

	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); console.log("DB", DB); //jetzt gibt es DB
	await load_codebase(); //return;  //console.log('codebase',DA.codebase); return
	timit.show();

	test4_intelli();



	//#region db tests
	//was ist wenn ich jetzt DB modifyen will am server
	//ich muss eine route verwenden ODER die file route verwenden!
	//wenn server NICHT laeuft kann ich y/db/yaml nicht touchen oder??? laeuft, muss ich 
	//es muss einen CRUD server geben damit ich wirklich ein file veraendern kann!!!
	//db_create('action',{t:'09:18',d:65,p:20}); //	console.log('created',DB.appdata.action);
	//db_delete('action');
	//db_delete('action'); //db_create('action',{t:'HALLO',d:65,p:20});
	//db_save_client();

	function test_random_update() {
		let n = rNumber();
		let i = rNumber(0, DB.appdata.howto.length - 1);
		let rec = { kw: 'k' + n, c: 'hallo' + (n + i) };
		db_update('howto', i, rec);
	}
	
	//onclick = test_random_update;

	//old code
	//await load_config();
	//await load_config_fast(['fitbit']); //wenn ich eh schon weiss welche filenames apps,tables
	//await load_config_new();

	//init db at client (use file db.yaml)

	//let data = await route_path_yaml_dict(`../y/appdata/calendar.yaml`); console.log('data', data)
	//#endregion

	//show_games();
	//show_apps();
	// book_open_title('cs');
	// book_open_page(2)

	//test3_p5_perlin_2d(); //test2_p5_perlin(); //test1_p5_init(); //test0_random();


}










