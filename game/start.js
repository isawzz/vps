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

function onclick_list() { show_code_list(DB.code); }
function onclick_new() { show_code_editor(); }
async function onclick_file(){
	let res = await route_path_yaml_dict('http://localhost:3000/file?name=test');
	console.log('res',res,typeof(res));//,JSON.parse(res),typeof JSON.parse(res))
}
async function onclick_save(){
	DB = await route_path_yaml_dict('http://localhost:3000/save');
	console.log('DB',DB);
}
async function onclick_test(){
	let res = await route_path_text('http://localhost:3000/test');
	console.log('res',res)
}
function perform_search(){
	let words = toWords(mBy('iKeywords').value);
	console.log('keywords are',words);

	let res = [], i=0;
	for(const c of DB.code){
		for(const w of words){
			let w1 = w.toLowerCase();
			let kw = c.kw.toLowerCase();
			let code = c.c.toLowerCase();
			if (kw.includes(w1) || code.includes(w1)) {
				res.push(c);
				c.index = i;
				break;
			}
		}
		i++;
	}

	console.log('filtered:',res);
	show_code_list(res);

}



