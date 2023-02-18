
function searchCode(s, any = false, casesensitive = false, fulltext = false, how = 'start') {

	console.log('opts',any,casesensitive,fulltext,how)

	let arr = CODE.codelist;
	let kws=toWordsX(s);
	//if some word is prefixed by '+' this word MUST be present in text
	let patt = any ? '(' + toWords(s).join('|') + ')' : s;

	if (how == 'start') patt = '\\b' + patt;
	else if (how == 'end') patt = patt + '\\b';
	else if (how == 'either') patt = '(' + patt + '\\b' + '|' + '\\b' + patt + ')';

	let opts = casesensitive ? '' : 'i';

	let regex = new RegExp(patt, opts);
	let fsel = fulltext ? x => x.value : x => x.key;
	let res = CODE.selectedKeys = arr.filter(x => regex.test(fsel(x))).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res.length > 20 ? res.length : res);
}

function codeContainsString(s) {
	let arr = CODE.codelist;
	let patt = s;

	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.value)).map(x => x.key);


	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyContainsString(s) {
	let arr = CODE.codelist;

	let patt = s;

	let regex = new RegExp(patt);

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);

	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyContainsAnyWord(s) {
	let arr = CODE.codelist;

	let patt = toWords(s).join('|');

	let regex = new RegExp(patt);
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyStartsWithAnyWord(s) {
	let arr = CODE.codelist;

	let patt = '\\b' + toWords(s).join('|'); console.log('patt', patt)

	let regex = new RegExp(patt, 'i');
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}
function keyEndsWithAnyWord(s) {
	let arr = CODE.codelist;

	let patt = toWords(s).join('|') + '\\b'; console.log('patt', patt)

	let regex = new RegExp(patt, 'i');
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}
function keyStartsOrEndsWithAnyWord(s) {
	let arr = CODE.codelist;

	// let patt = '\\b' + toWords(s).join('|') + '\\b'; console.log('patt', patt)
	//let patt = '\\W' + toWords(s).join('|') + '\\W'; console.log('patt', patt)

	// let patt = '\\b' + 'mDom' + '\\w*' + '\\b'; console.log('patt', patt)
	let w = toWords(s).join('|');
	let patt = `(\\b(${w})|(${w})\\b)`; console.log('patt', patt)
	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}

















