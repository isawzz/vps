
function show_sidebar(di, prop_key, prop_info) {
	dSidebar = mBy('dSidebar'); mStyle(dSidebar,{wmin:200, hmax:window.innerHeight-68,overy:'auto'})
	let keys = get_keys(di);
	keys.sort();
	//console.log('keys', keys);
	dBottom = mBy('dBottom')
	for (const k of keys) { 
		let key = isdef(prop_key)?di[k][prop_key]:k;
		let d=mDiv(dSidebar, { cursor:'pointer',wmin: 100 }, null, key,'hop1') 
		let info = isdef(prop_info)?di[k][prop_info]:di[k];

		info = k+'('+di[k].params+')\n'+info;
		

		d.onclick = ()=>show_fiddle(info); //mNode(info,dBottom,k); //dBottom.innerHTML = `<pre>${toYaml(di[k].body)}</pre>`;
	}
	//for (const k in di) { mDiv(dSidebar, { wmin: 100 }, null, di[k][prop]) }
}









