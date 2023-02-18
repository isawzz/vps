
function toWordsX(s, sAllow = '+-_') {
	//`[^\w+-_]`
	//let arr = s.split(/[^\w^+^-^_]/); //new RegExp(`[^\w|${sAllow}]+`)); // toWordsX('+hallo -rey das ist ein regal');
	//let arr = s.split(/[^(\w|+|\-|_)]/); //new RegExp(`[^\w|${sAllow}]+`)); // toWordsX('+hallo -rey das ist ein regal');
	let special = ['-', '.', '*', '?', '!'];
	let s1 = '';
	for (let i = 0; i < sAllow.length; i++) {
		let ch = sAllow[i];
		s1 += (special.includes(ch) ? '\\' : '') + ch + '|';
		console.log('s1', s1)
	}
	s1 = stringMinusLast(s1);
	console.log('s1', s1);
	let arr = s.split(new RegExp(`[^(\\w|${s1})]`)); ///[^(\w|+|\-|_)]/); // // toWordsX('+hallo -rey das ist ein regal');
	// let arr = s.split(new RegExp(`[^(\\w|${sAllow})]`)); ///[^(\w|+|\-|_)]/); // // toWordsX('+hallo -rey das ist ein regal');
	return arr.filter(x => !isEmpty(x));

}

function mySearch(kws) {
	//kws should be a string
	assertion(isString(kws), 'mySearch: kws should be a string')
	console.log(`'${kws}'`);
	searchCode(kws, ...CODE.searchOptions); //keyStartsOrEndsWithAnyWord(kws); //keyEndsWithAnyWord(kws); //keyStartsWithAnyWord(kws); //keyContainsAnyWord(kws); //codeContainsString(kws);//
	//keyContainsString(kws);
	return;
	//let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	//console.log('fiddleSearch: keywords are', words);
	let arr = CODE.codelist; //[{key value},...]

	//have words and have keys and code for keys
	//1. test if code contains some keyword
	let patt = isList(kws) ? kws.join('|') : replaceAll(kws, ' ', '|');
	let regex = new RegExp(`\\b${patt}\\b`);
	console.log('patt', patt)
	let res = arr.filter(x => regex.test(x.value)); // words.some(w=>)
	let keys = res.map(x => x.key);
	console.log('keys', keys);
	show_sidebar(keys, myOnclickCodeInSidebar);
	return;


	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	// let records = dilist.filter(x => words.some(w => x.value.includes(w)));

	//let regex=new RegExp(`\\${w}\\b`,'i');
	let records = dilist.filter(x => words.some(w => x.key.match(new RegExp(`\\${w}\\b`, 'i'))));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), myOnclickCodeInSidebar);
	return records;
}

















