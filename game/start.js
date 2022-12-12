onload = start; TESTING = 'live'; // live | vps | [false] | true (live for live-server, vps for vps) 

async function start() {

	if (TESTING != 'nosockets') {
		//Socket.on!!!
		Socket = TESTING == 'live' ? io('http://127.0.0.1:3000') : TESTING == 'vps' ? io('http://216.250.112.218:3000') : io();
		Socket.on('message', x => console.log('got message', x));
		Socket.on('disconnect', x => console.log('got disconnect', x));
		Socket.on('update', x => console.log('got update', x));

	}

	await load_syms();
  Config = await route_path_yaml_dict('../y/config.yaml'); console.log('Config', Config);
	show_games();

}











