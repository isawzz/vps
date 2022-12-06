onload = start; TESTING = 'live'; // live | nginx | [false] | true (live for live-server, nginx for nginx) 

async function start() {

	if (TESTING != 'nosockets') {
		//Socket.on!!!
		Socket = TESTING == 'live' ? io('http://127.0.0.1:3000') : TESTING == 'nginx' ? io('http://216.250.112.218:3000') : io();
		Socket.on('message', x => console.log('got message', x));
		Socket.on('disconnect', x => console.log('got disconnect', x));
		Socket.on('update', x => console.log('got update', x));

	}


	//rotating monkey
	await load_syms();
	let x = miPic('monkey', document.body, { position: 'fixed', fz: 40, left: 100, top: 20 });
	anime({ targets: x, translateX: 250, rotate: '1turn', duration: 3000 });

}

async function onclick_test(){
	let res = await route_path_text('http://localhost:3000/test');
	console.log('res',res)
}
async function onclick_file(){
	let res = await route_path_yaml_dict('http://localhost:3000/file?name=test');
	console.log('res',res,typeof(res));//,JSON.parse(res),typeof JSON.parse(res))
}
function onclick_code_home() { onclick_code_list(); }
function onclick_code_list() {
	//so jetzt brauch ich ein fetch zum server!
}
async function onclick_save(){
	DB = await route_path_yaml_dict('http://localhost:3000/save');
	console.log('DB',DB);
}




