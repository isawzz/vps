onload = start;

async function start() {
	console.log('hallo');
	dTable = mBy('dTable'); mStyle(dTable, { bg: rColor(), w: '100vw', h: '100vh', padding: 0, margin: 0 })
	mCenterFlex(dTable)

	//load codes
	iconChars = await route_path_yaml_dict('../base/assets/iconchars.yaml');
	console.log('iconChars', iconChars);

	let d=viLabel('crow',dTable,100,GREEN,BLUE);
	mAppend(dTable,d)

}

function viLabel(key,dParent,sz,fg,bg, opts={}) {
	let ch = iconChars[key];
	let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
	console.log('family',family);
	let text = String.fromCharCode('0x' + ch);
	let d = mDiv(dParent,{margin:20,padding:20,family:family,h:sz,hline:sz,fz:sz,fg:fg,bg:bg},null,text);
	
	return d;
}














