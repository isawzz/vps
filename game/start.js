onload = _start;

async function _start() {
	test16a();
	await loadCodebase('../cb2');
	//addIntellisense();
}
function addIntellisense(){
	var tributeAttributes = {
    autocompleteMode: true,
    //noMatchTemplate: '', //null, //' ',
    noMatchTemplate: () => {
      return '<span style:"visibility: hidden;"></span>';
    },
    values: fiddleSearch,
    selectTemplate: function (item) {
      if (typeof item === 'undefined') return null;
      if (this.range.isContentEditable(this.current.element)) {
        return '<span contenteditable="false"><a>' + item.original.key + '</a></span>';
      }
      return item.original.value;
    },
    menuItemTemplate: function (item) {
      return item.string;
    },
    replaceTextSuffix: '(',
    menuShowMinLength: 1,
  };
  var trib = DA.tribute = new Tribute(Object.assign({ menuContainer: dFiddle, }, tributeAttributes));

	let ta = document.getElementsByTagName('textarea')[0];
	DA.tribute.attach(ta);
  ta.addEventListener('tribute-replaced', fiddleMessageHandler);

}



















async function _start123() {

	// console.log('result',toWordsX('hallo rey das ist ein regal'));
	// console.log('result',toWordsX('hallo rey das is_t -ein +regal'));
	// return;

	test16a();

	await loadCodebase('../cb2');

	let inp = document.getElementsByTagName('input')[0];
	inp.value = 'q';
	return;
	//CODE.searchOptions = createSearchOptions({how:'either'});
	mySearch(inp.value.trim());

	if (!isEmpty(CODE.selectedKeys)) {
		let x = rChoose(CODE.selectedKeys); console.log('show code for', x)
		myOnclickCodeInSidebar(x);
	}
}
function createSearchOptions(opts) {
	let res = [];
	let di = { any: false, casesensitive: false, fulltext: false, how: 'start' };
	for (const k of ['any', 'casesensitive', 'fulltext', 'how']) {
		res.push(valf(opts[k], di[k]));
	}
	return res;
}
async function startrest() {
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms();
	await load_db();
	await loadCodebase();

	//jetzt hab ich bereits alles was ich brauche!
	//kann buttons zu dTestButtons geben...
	dFiddle.innerHTML = '';
	mStyle(dFiddle, { padding: 0, box: true });



	let ta = AU.ta = mTextArea(dFiddle, { padding: 0, box: true, w: '100%', h: 'rest', outline: 'none', overflow: 'hidden' });

}
function mTaPlain(dParent, styles = {}, opts = {}) {
	opts.tag = 'textarea';
	let ta = mDom(dParent, styles, opts);
	mClass(ta, 'plain');
	return ta;
}



