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

	await load_syms();
	//await load_config();
	await load_config_fast(['fitbit']); //wenn ich eh schon weiss welche filenames apps,tables

	timit.show();

	//show_games();
	show_apps();

}











