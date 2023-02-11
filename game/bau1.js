
function fiddleSearch(kws) {
	let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	console.log('fiddleSearch: keywords are', words);
	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	let records = dilist.filter(x => words.some(w => x.value.includes(w)));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), onclickCodeInSidebar);
	return records;
}





















