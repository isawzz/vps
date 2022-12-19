onload = start; TESTING = 'nosockets'; // live | vps | [false] | true (live for live-server, vps for vps) 

async function start() {

	if (TESTING != 'nosockets') {
		//Socket.on!!!
		Socket = TESTING == 'live' ? io('http://127.0.0.1:3000') : TESTING == 'vps' ? io('http://216.250.112.218:3000') : io();
		Socket.on('message', x => console.log('got message', x));
		Socket.on('disconnect', x => console.log('got disconnect', x));
		Socket.on('update', x => console.log('got update', x));

	}

	let timit = new TimeIt();

	await load_syms(); // jetzt gibt es Syms SymKeys ByGroupSubgroup Info KeySets
	await load_db(); console.log("DB",DB); //jetzt gibt es DB

	//was ist wenn ich jetzt DB modifyen will am server
	//ich muss eine route verwenden ODER die file route verwenden!
	//wenn server NICHT laeuft kann ich y/db/yaml nicht touchen oder??? laeuft, muss ich 
	//es muss einen CRUD server geben damit ich wirklich ein file veraendern kann!!!
	db_create('action',{t:'09:18',d:65,p:20}); //	console.log('created',DB.appdata.action);
	db_save_client();
	

	//await load_config();
	//await load_config_fast(['fitbit']); //wenn ich eh schon weiss welche filenames apps,tables
	//await load_config_new();
	
	//init db at client (use file db.yaml)
	
	//let data = await route_path_yaml_dict(`../y/appdata/calendar.yaml`); console.log('data', data)

	timit.show();

	//show_games();
	//show_apps();

}











