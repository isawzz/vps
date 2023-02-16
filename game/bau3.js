
function codeContainsString(s){
	let arr = CODE.codelist;
	let patt = s;

	let regex = new RegExp(patt);

	let res = arr.filter(x => regex.test(x.value)).map(x=>x.key); 

	console.log('keys', res);	show_sidebar(res, myOnclickCodeInSidebar);
}
function keyContainsString(s){
	let arr = CODE.codelist;

	let patt = s;

	let regex = new RegExp(patt);

	let res = arr.filter(x => regex.test(x.key)).map(x=>x.key); 

	console.log('keys', res);	show_sidebar(res, myOnclickCodeInSidebar);
}
function keyContainsAnyWord(s){
	let arr = CODE.codelist;

	let patt = toWords(s).join('|');

	let regex = new RegExp(patt);
	let res = arr.filter(x => regex.test(x.key)).map(x=>x.key); 
	console.log('keys', res);	show_sidebar(res, myOnclickCodeInSidebar);
}

















