onload = start;

async function start() {
	console.log('hallo');
	dTable = mBy('dTable'); mStyle(dTable, { bg: rColor(), w: '100vw', h: '100vh', padding: 0, margin: 0 })
	mCenterFlex(dTable)

	//load codes
	iconChars = await route_path_yaml_dict('../base/assets/iconchars.yaml');
	console.log('iconChars', iconChars);

	let d=viLabel('crow',dTable,{h:200,fz:100,fg:GREEN,bg:RED});
	mAppend(dTable,d)

}

function viLabel(key,sz,fg,bg) {
	let ch = iconChars[key];
	let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
	let text = String.fromCharCode('0x' + ch);
	//console.log('text',text)
	let d = mTextDiv(text);
	//mStyle(d,{family:family,hline:})
	d.style.setProperty('font-family', family);
	mAppend(dParent,d)
	mStyle(d,styles);
	return d;
}














