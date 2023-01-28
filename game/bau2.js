async function load_codebase(paths,preserveRegionNames=false) {
	if (nundef(paths)) {
		paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
		paths = paths.map(f => `../basejs/${f}.js`);
		//paths.push(`../game/done.js`);
		// let paths = [`../game/aaa.js`];
	}
	let superdi={};
	for (const f of paths) {
		console.log('...processing file',f);
		let current_file = stringBefore(stringAfterLast(f, '/'), '.'); 
		let base = await route_path_text(f);
		let res = parseCodefile(base, current_file, preserveRegionNames,{},superdi);
		//console.log('res',res, '\nnum functions:',get_keys(res.dicode).length)
		//reslist.push(res);
	}
	return superdi;
}




















