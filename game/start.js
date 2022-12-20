onload = start; 

async function start() {
	let timit = new TimeIt('* using timit *');
	set_run_state(); //vps und multiclients mit sockets sein? set_run_state(false,true,3000,false,false,false,true);
	if (SINGLECLIENT) onpagedeactivated(db_save_client); //wenn ich nur 1 client habe mach ich es so!!!!
	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); console.log("DB",DB); //jetzt gibt es DB
	timit.show();

	//#region db tests
	//was ist wenn ich jetzt DB modifyen will am server
	//ich muss eine route verwenden ODER die file route verwenden!
	//wenn server NICHT laeuft kann ich y/db/yaml nicht touchen oder??? laeuft, muss ich 
	//es muss einen CRUD server geben damit ich wirklich ein file veraendern kann!!!
	//db_create('action',{t:'09:18',d:65,p:20}); //	console.log('created',DB.appdata.action);
	//db_delete('action');
	//db_delete('action'); //db_create('action',{t:'HALLO',d:65,p:20});
	//db_save_client();

	//await load_config();
	//await load_config_fast(['fitbit']); //wenn ich eh schon weiss welche filenames apps,tables
	//await load_config_new();
	
	//init db at client (use file db.yaml)
	
	//let data = await route_path_yaml_dict(`../y/appdata/calendar.yaml`); console.log('data', data)
	//#endregion

	//show_games();

	//show_apps();

}











