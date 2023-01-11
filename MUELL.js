
function test8_jup(){
	getGlobals();
	let dParent = dTable = mBy('dTable'); 
	let list = Globals.function.map(x=>({key:x.key,value:x.key+'('})); //CODE.index.map(x=>({key:x,value:x}));
	for(const n in range(5)) {
		let ta=juPlus(dParent);
		mAutocomplete(dParent,ta,list); //['also','aber','all']);
	}
	return;
	//DA.tas sind all die textareas
	//ich brauch ein popup fuer intellisense
	AU.popup=mPopup(null,dTable,{ position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', family:'verdana', bg: 'powderblue', fg: 'black', border:'gray', radius:8  });

	//ich muss tas mit key handlers verseehen
	getGlobals();
	console.log('funcs',Globals.function);
	for(const ta of DA.tas){ fiddlify(ta);}
}
function fiddlify(ta){
	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == 'Escape' && !isEmpty(AU.list)) {
			au_reset();
		} else if (k == 'Enter' && AU.selected) {
			//insert at caret!
			let w = AU.selected.innerHTML; //enthaelt params auch!
			let params = stringAfter(w, '(');
			let funcname = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix); // s is portion of select entry that is NOT in ta
			let before = AU.ta.value.slice(0, AU.ta.selectionEnd);
			let after = AU.ta.value.slice(AU.ta.selectionEnd);
			AU.ta.value = before + s + after;
			ta.selectionEnd = (before + s).length;
			au_reset();
		} else if (k == 'ArrowDown' && !isEmpty(AU.list)) {
			au_select_down();
		} else if (k == 'ArrowUp' && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
			//} else if (k.startsWith('Arrow')){


		} else if ('abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(k) && !ev.ctrlKey) { //(isAlphaNum(k) || k == '_') && k!='Shift') {
			//console.log('pressed letter', k); //YES!

			let icaret = AU.ta.selectionEnd; //getCaretPosition(AU.ta);
			let line = getTextAreaCurrentLine(AU.ta);
			//console.log('line',line)
			let iline = AU.ta.value.indexOf(line);
			let i = icaret - iline; //ok
			//console.log('i',i);
			let [istart, m] = lastIndexOfAny(line, [',', ' ', ')', '(', '{', '}', ';'], i - 1);
			let pf = line.slice(0, i);
			if (istart >= 0) pf = line.slice(istart + 1, i);
			//console.log('i:' + i, 'istart:' + istart, 'match:' + m, '\n==>pre:' + pf);

			AU.prefix = pf;
			au_show_list();
			if (!isEmpty(AU.list)) au_select_down();

		} else if (k != 'Shift') {
			au_reset();
			//console.log('ELSE!!!!!!!!!')
		}
	}




}

function dummy_reaction(ev) { console.log('clicked', ev.target) }

function test9_autocomplete(){
	dTable = mBy('dTable'); 
	// let tb = mDiv(dTable, { hmargin: 10, padding: 10, cursor: 'pointer' }, null, null, 'top'); mFlexWrap(tb);
	// mButton('Dummy', dummy_reaction, tb);
	// mAutocomplete(tb);

	//mAutocomplete(dTable)

	// return;
	juPlus(dTable);
	let ta = DA.tas[0];
	ta.id='myinput';
	let list = [
		{ key: 'Alabama', value: 'Alabama' },
		{ key: 'Alaska', value: 'Alaska' },
		{ key: 'Arizona', value: 'Arizona' },
		{ key: 'Arkansas', value: 'Arkansas' },
		{ key: 'California', value: 'California' },
		{ key: 'Colorado', value: 'Colorado' },
		{ key: 'Connecticut', value: 'Connecticut' },
		{ key: 'Delaware', value: 'Delaware' },
		{ key: 'Florida', value: 'Florida' },
		{ key: 'Georgia', value: 'Georgia' },
		{ key: 'Hawaii', value: 'Hawaii' },
		{ key: 'Idaho', value: 'Idaho' },
		{ key: 'Illinois', value: 'Illinois' },
		{ key: 'Indiana', value: 'Indiana' },
		{ key: 'Iowa', value: 'Iowa' },
		{ key: 'Kansas', value: 'Kansas' },
		{ key: 'Kentucky', value: 'Kentucky' },
		{ key: 'Louisiana', value: 'Louisiana' },
		{ key: 'Maine', value: 'Maine' },
		{ key: 'Maryland', value: 'Maryland' },
		{ key: 'Massachusetts', value: 'Massachusetts' },
		{ key: 'Michigan', value: 'Michigan' },
		{ key: 'Minnesota', value: 'Minnesota' },
		{ key: 'Mississippi', value: 'Mississippi' },
		{ key: 'Missouri', value: 'Missouri' },
		{ key: 'Montana', value: 'Montana' },
		{ key: 'Nebraska', value: 'Nebraska' },
		{ key: 'Nevada', value: 'Nevada' },
		{ key: 'New Hampshire', value: 'New Hampshire' },
		{ key: 'New Jersey', value: 'New Jersey' },
		{ key: 'New Mexico', value: 'New Mexico' },
		{ key: 'New York', value: 'New York' },
		{ key: 'North Carolina', value: 'North Carolina' },
		{ key: 'North Dakota', value: 'North Dakota' },
		{ key: 'Ohio', value: 'Ohio' },
		{ key: 'Oklahoma', value: 'Oklahoma' },
		{ key: 'Oregon', value: 'Oregon' },
		{ key: 'Pennsylvania', value: 'Pennsylvania' },
		{ key: 'Rhode Island', value: 'Rhode Island' },
		{ key: 'South Carolina', value: 'South Carolina' },
		{ key: 'South Dakota', value: 'South Dakota' },
		{ key: 'Tennessee', value: 'Tennessee' },
		{ key: 'Texas', value: 'Texas' },
		{ key: 'Utah', value: 'Utah' },
		{ key: 'Vermont', value: 'Vermont' },
		{ key: 'Virginia', value: 'Virginia' },
		{ key: 'Washington', value: 'Washington' },
		{ key: 'West Virginia', value: 'West Virginia' },
		{ key: 'Wisconsin', value: 'Wisconsin' },
		{ key: 'Wyoming', value: 'Wyoming' },
	];

	list = CODE.index.map(x=>({key:x,value:x}));
	mAutocomplete(dTable,ta,list); //['also','aber','all']);
}
function mAutocomplete(dParent, elem, list) {

	// let html = `
	// 	<div id="test-autocomplete-textarea-container">
	// 		<textarea id="test-autocomplete-textarea" rows="4" style='box-sizing:border-box;width:100%;' placeholder="States of USA"></textarea>
	// 	</div>
	// 	`;
	// let d = mCreateFrom(html);
	// //list = list.map(x=>({key:x,value:x}));
	// mAppend(dParent, d);


	var tributeAttributes = {
		autocompleteMode: true,
		noMatchTemplate: '',
		values: list,
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
	};
	var tributeAutocompleteTestArea = new Tribute(
		Object.assign(
			{
				menuContainer: dParent, //document.getElementById('test-autocomplete-textarea-container'),
			},
			tributeAttributes
		)
	);
	tributeAutocompleteTestArea.attach(elem); //document.getElementById('test-autocomplete-textarea'));

}

function muell_autocomplete(dParent, elem, list) {
	function autocomplete(inp, arr) {
		var currentFocus;
		inp = toElem(inp);
		console.log('inp', inp)
		inp.addEventListener('input', function (e) { /*execute a function when someone writes in the text field:*/
			console.log('ev input', e)
			var a, b, i, val = this.value;		/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) { return false; }
			currentFocus = -1;
			a = document.createElement('DIV'); /*create a DIV element that will contain the items (values):*/
			a.setAttribute('id', this.id + 'autocomplete-list');
			a.setAttribute('class', 'autocomplete-items');
			this.parentNode.appendChild(a); /*append the DIV element as a child of the autocomplete container:*/
			for (i = 0; i < arr.length; i++) {
				if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					b = document.createElement('DIV'); /*create a DIV element for each matching element:*/
					// b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'; /*make the matching letters bold:*/
					b.innerHTML = arr[i].substr(0, val.length); /*make the matching letters bold:*/
					b.innerHTML += arr[i].substr(val.length);
					b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"; /*insert a input field that will hold the current array item's value:*/
					b.addEventListener('click', function (e) {
						inp.value = this.getElementsByTagName('input')[0].value; /*insert the value for the autocomplete text field:*/
						closeAllLists();
					});
					a.appendChild(b);
				}
			}
		});
		inp.addEventListener('keydown', function (e) {
			var x = document.getElementById(this.id + 'autocomplete-list');
			if (x) x = x.getElementsByTagName('div');
			if (e.keyCode == 40) { // arrow DOWN
				currentFocus++;
				addActive(x);
			} else if (e.keyCode == 38) { //arrow UP
				currentFocus--;
				addActive(x);
			} else if (e.keyCode == 13) { // ENTER
				e.preventDefault();  // if the ENTER key is pressed, prevent the form from being submitted
				if (currentFocus > -1) {
					if (x) x[currentFocus].click(); // simulate a click on the "active" item:
				}
			}
		});
		inp.addEventListener('dblclick', function (e) { evNoBubble(e); });

		function addActive(x) {
			// works with classes from styles.css
			if (!x) return false;
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = x.length - 1;
			x[currentFocus].classList.add('autocomplete-active');
		}
		function removeActive(x) {
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove('autocomplete-active');
			}
		}
		function closeAllLists(elmnt) {
			var x = document.getElementsByClassName('autocomplete-items');
			for (var i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != inp) {
					x[i].parentNode.removeChild(x[i]);
				}
			}
		}

		document.addEventListener('click', function (e) {
			closeAllLists(e.target);
		});
	}
	if (nundef(list)) list = Geo.continents.Europe; console.log('list', list)
	mClass(dParent, 'autocomplete');
	autocomplete(elem, list);
}
function mAutocomplete(dParent) {
	let form = mCreateFrom(`
		<form class='autoform' autocomplete="off" action="javascript:void(0);">
			<div class="autocomplete" style="width: 200px">
				<!--<input id="_myInput" type="text" name="_myCity" placeholder="City" onclick="select()" />-->
				<textarea rows=3 id="myInput" type="text" name="myCity" placeholder="City" onclick="select()"></textarea>
			</div>
			<input style="margin-left:-15px" type="submit" value="Go!" />
		</form>
	`	);
	form.onsubmit = () => {
		let c = mBy('myInput').value.toLowerCase();
		console.log('submit',c);
		// let o = Geo.cities[c];
		// if (nundef(o)) { c = toUmlaut(c); o = Geo.cities[c]; }
		// console.log('c', c);
		// let center = o.center;
		// M.map.flyTo(center, M.map.getZoom(), { animate: false })
	}
	let d = mAppend(dParent, form);
}

async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		//let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
		//let x=cfunctions.split('\r\nfunction'); console.log('splitab',x)
		//let fbodies = splitAtAnyOf(cfunctions,['\r\nfunction','\r\nasync function']).map(x => x.trim()); NO!
		// let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		
		let asyncnames = cfunctions.split('\r\nasync function');
		let asyncs={};
		for(const x of asyncnames){
			let name = stringBefore(x,'(').trim();
			console.log('async',name);
			asyncs[name]=true;
		}
		cfunctions = asyncnames.join('\r\nfunction');
		let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		console.log('fbodies',fbodies)

		//console.log('fbodies',fbodies);
		//let trailing_async = false;
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ') {');
			//if (params.includes('\n')) console.log('params',params);

			//console.log('params',params)
			//let last2=stringLast(params,2);
			//if (last2 != ') ') console.log('...!!!!!!!!',params); //params.substring(params.length-3,params.length)+'"')


			let lines = (stringAfter(f, '{')).split('\r\n');
			//console.log('________bodyparts',bodyparts);
			let body = '';
			//let prev_async = trailing_async; trailing_async=false;
			
			for(const line of lines){
				let ws=toWords(line);
				if (isEmpty(ws[0]) || startsWith(ws[0],'/')) continue;
				if (startsWith(line,'async')) {trailing_async = true; continue;} //gehoert zur next line!!!!
				if (startsWith(line,'class')) {
					//this has to be treated as a NEW function!!!!!
					//das ist recursiv!!!!!!!!!
				}
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1=replaceAllSpecialChars(line,'\t','  ')
				bp1=stringBefore(bp1,'//');
				body+=bp1+'\n';
			}
			// let sig = `${prev_async?'async ':''}function ${name}(${params})`;
			// body=sig+'{\n'+body;
			// res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
			let isasync=isdef(asyncs[name]);
			let sig = `${isasync?'async ':''}function ${name}(${params})`;
			body=sig+'{\n'+body;
			res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: isasync };
		}

		//console.log('functions', res); //get_keys(res));
		return res;

	}
	function parse_consts(code) {
		let res = {};
		//split code into lines
		let lines = code.split('\n');
		//console.log('lines',lines);
		for (const line of lines) {
			if (startsWith(line, 'const')) {
				//console.log('line',line);
				let c = stringBefore(stringAfter(line, 'const'), '=').trim();
				res[c] = c;
			}
		}
		return res;
	}

	let dif = {}, dic = {};
	let paths = ['basemin']; //'basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	//paths.push(`../game/done.js`);
	CODE.paths = paths;
	for (const f of paths) { 
		let base = await route_path_text(f); 
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}

async function load_codebase() {
	function parse_funcs(code) {
		let res = {};
		//let cfunctions = 'function ' + stringAfter(code, 'function '); //jump to first function def
		let cfunctions = '\r\nfunction ' + stringAfter(code, 'function '); //jump to first function def
		//let x=cfunctions.split('\r\nfunction'); console.log('splitab',x)
		//let fbodies = splitAtAnyOf(cfunctions,['\r\nfunction','\r\nasync function']).map(x => x.trim()); NO!
		// let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		
		let asyncnames = cfunctions.split('\r\nasync function');
		let asyncs={};
		for(const x of asyncnames){
			let name = stringBefore(x,'(').trim();
			console.log('async',name);
			asyncs[name]=true;
		}
		asyncnames.join('\r\nfunction');
		let fbodies = cfunctions.split('\r\nfunction').map(x => x.trim());
		console.log('fbodies',fbodies)

		//console.log('fbodies',fbodies);
		let trailing_async = false;
		for (const f of fbodies) {
			if ("'\"_!".includes(f[0])) continue;
			let name = stringBefore(f, '(');
			if (isEmpty(name)) continue;
			let params = stringBefore(stringAfter(f, '('), ') {');
			//if (params.includes('\n')) console.log('params',params);

			//console.log('params',params)
			//let last2=stringLast(params,2);
			//if (last2 != ') ') console.log('...!!!!!!!!',params); //params.substring(params.length-3,params.length)+'"')


			let lines = (stringAfter(f, '{')).split('\r\n');
			//console.log('________bodyparts',bodyparts);
			let body = '';
			let prev_async = trailing_async; trailing_async=false;
			
			for(const line of lines){
				let ws=toWords(line);
				if (isEmpty(ws[0]) || startsWith(ws[0],'/')) continue;
				if (startsWith(line,'async')) {trailing_async = true; continue;} //gehoert zur next line!!!!
				if (startsWith(line,'class')) {
					//this has to be treated as a NEW function!!!!!
					//das ist recursiv!!!!!!!!!
				}
				//console.log('===>ws',ws)
				//console.log('bp',bp)
				let bp1=replaceAllSpecialChars(line,'\t','  ')
				bp1=stringBefore(bp1,'//');
				body+=bp1+'\n';
			}
			let sig = `${prev_async?'async ':''}function ${name}(${params})`;
			body=sig+'{\n'+body;
			res[name.trim()] = { name: name, params: params, sig:sig, body: body, async: prev_async };
		}

		//console.log('functions', res); //get_keys(res));
		return res;

	}
	function parse_consts(code) {
		let res = {};
		//split code into lines
		let lines = code.split('\n');
		//console.log('lines',lines);
		for (const line of lines) {
			if (startsWith(line, 'const')) {
				//console.log('line',line);
				let c = stringBefore(stringAfter(line, 'const'), '=').trim();
				res[c] = c;
			}
		}
		return res;
	}

	let dif = {}, dic = {};
	let paths = ['basemin']; //'basemin', 'board', 'cards', 'gamehelpers', 'select'].map(f => `../basejs/${f}.js`);
	paths = paths.map(f => `../basejs/${f}.js`);
	//paths.push(`../game/done.js`);
	CODE.paths = paths;
	for (const f of paths) { 
		let base = await route_path_text(f); 
		let dinew = parse_funcs(base);
		addKeys(dinew, dif);
		let dicnew = parse_consts(base);
		addKeys(dicnew, dic);
	}
	CODE.funcs = dif;
	CODE.consts = dic;
	CODE.index = get_keys(dif);
	CODE.index.sort();

}

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

function show_sidebar(di, prop_key, prop_info) {
	let h = window.innerHeight - 68;
	// let w = window.innerWidth - 320;
	// let rows = h / 18;
	// let cols = w / 8;
	dSidebar = mBy('dSidebar'); mStyle(dSidebar, { w: 300, hmax: h, overy: 'auto' });
	//mStyle('dFiddle',{h:h})
	let keys = get_keys(di);
	keys.sort();
	//console.log('keys', keys);
	//dBottom = mBy('dBottom')
	for (const k of keys) {
		let key = isdef(prop_key) ? di[k][prop_key] : k;
		let d = mDiv(dSidebar, { cursor: 'pointer', wmin: 100 }, null, key, 'hop1')
		let info = isdef(prop_info) ? di[k][prop_info] : di[k];
		d.onclick = () => AU.ta.value = info;
	}
	// show_fiddle('', rows, cols)
}


function perform_search(records) {
	let words = toWords(mBy('iKeywords').value);
	console.log('keywords are', words, 'records', records);

	let res = [], i = 0;
	for (const c of records) {
		for (const w of words) {
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

	console.log('filtered:', res);
	show_code_list(mBy('dSearchResult'), res);

}
function show_code_list(dParent, list) {
	iClear(dParent);

	for (const code of list) {
		let d = mDiv(dParent, { w: '100%' });
		let dkw = mDiv(d, {}, null, code.kw);
		let text = code.c; let lines = text.split('\n'); let rows = lines.length; // count lines
		//let minmax = arrMinMax(lines, x => x.length); let max = minmax.max;//find longest line
		let dcode = mDiv(d, {}, null, `<textarea rows=${rows} cols=120>${code.c}</textarea>`);
	}
}




async function sidebar_load(url) {
	let code = await route_path_text(url);
	//jetzt brauch ich alle functions in dem code und alle globals
	let functions = parse_funcs(code);
	//console.log('functions', functions);
	let keys = get_keys(functions);
	keys.sort();
	//console.log('keys', keys);
	for (const k of keys) {
		mDiv(dSidebar, { w: 100 }, null, functions[k].name)
	}
}





//function fitbit_close(item) {	console.log('fitbit CLOSE!!!!!!!!!!!!!!!');}


//#region canvas update
function update_position_random(item){rPosition(item);}
function update_position_noise(item){rnPosition(item);}
//#endregion

//#region canvas draw
function draw_ellipse(item){}
//#endregion




function rNoise(min,max,lastx,speed) {

	if (nundef(lastx)) lastx=Perlin.lastx;
	if (nundef(speed)) speed=Perlin.speed;
	lastx+=speed;

	//console.log('lastx',lastx)
	let r01=rPerlin(lastx);
	//console.log('r01',r01)
	let n = map_range(r01, 0, 1, min, max);
	return n;
}
function mStyle(elem, styles, unit = 'px') {

	elem = toElem(elem);
	let bg, fg;
	if (isdef(styles.bg) || isdef(styles.fg)) {
		[bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
	}
	if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
		let rtop = '' + valf(styles.upperRounding, 0) + unit;
		let rbot = '' + valf(styles.lowerRounding, 0) + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	}
	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	if (isdef(styles.round)) styles['border-radius'] = '50%';

	for (const k in styles) {
		let val = styles[k];
		if (k == 'vmargin') styles.mabottom = styles.matop = val;
		else if (k == 'hmargin') styles.maleft = styles.maright = val;
		else if (k == 'vpadding') styles.pabottom = styles.patop = val;
		else if (k == 'hpadding') styles.paleft = styles.paright = val;
	}

	for (const k in styles) {
		let val = styles[k];
		let key = k;
		//console.log('key',key)
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
		else if (k == 'font' && !isString(val)) {
			//font would be specified as an object w/ size,family,variant,bold,italic
			// NOTE: size and family MUST be present!!!!!!! in order to use font param!!!!
			let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
			let ff = f.family;
			let fv = f.variant;
			let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
			let fs = isdef(f.italic) ? 'italic' : f.style;
			if (nundef(fz) || nundef(ff)) return null;
			let s = fz + ' ' + ff;
			if (isdef(fw)) s = fw + ' ' + s;
			if (isdef(fv)) s = fv + ' ' + s;
			if (isdef(fs)) s = fs + ' ' + s;
			elem.style.setProperty(k, s);
			continue;
		} else if (k.toLowerCase() == 'classname') {
			mClass(elem, styles[k]);
		} else if (k == 'border') {
			//console.log('________________________YES!')
			if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
			if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
		} else if (k == 'ajcenter') {
			elem.style.setProperty('justify-content', 'center');
			elem.style.setProperty('align-items', 'center');
		} else if (k == 'layout') {
			if (val[0] == 'f') {
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'flex');
				elem.style.setProperty('flex-wrap', 'wrap');
				let hor, vert;
				if (val.length == 1) hor = vert = 'center';
				else {
					let di = { c: 'center', s: 'start', e: 'end' };
					hor = di[val[1]];
					vert = di[val[2]];

				}
				let justStyle = val[0] == 'v' ? vert : hor;
				let alignStyle = val[0] == 'v' ? hor : vert;
				elem.style.setProperty('justify-content', justStyle);
				elem.style.setProperty('align-items', alignStyle);
				switch (val[0]) {
					case 'v': elem.style.setProperty('flex-direction', 'column'); break;
					case 'h': elem.style.setProperty('flex-direction', 'row'); break;
				}
			} else if (val[0] == 'g') {
				//layout:'g_15_240' 15 columns, each col 240 pixels wide
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'grid');
				let n = allNumbers(val);
				let cols = n[0];
				let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
				elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
				elem.style.setProperty('place-content', 'center');
			}
		} else if (k == 'layflex') {
			elem.style.setProperty('display', 'flex');
			elem.style.setProperty('flex', '0 1 auto');
			elem.style.setProperty('flex-wrap', 'wrap');
			if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
		} else if (k == 'laygrid') {
			elem.style.setProperty('display', 'grid');
			let n = allNumbers(val);
			let cols = n[0];
			let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
			elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
			elem.style.setProperty('place-content', 'center');
		}

		//console.log(key,val,isNaN(val));if (isNaN(val) && key!='font-size') continue;
		//if (k == 'bg') console.log('style', k, key, val, bg)

		if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
		else if (key == 'background-color') elem.style.background = bg;
		else if (key == 'color') elem.style.color = fg;
		else if (key == 'opacity') elem.style.opacity = val;
		else if (key == 'wrap') elem.style.flexWrap = 'wrap';
		else if (startsWith(k, 'dir')) {
			//console.log('.................................................!!!!!!!!!!!!!!!!!!!!!!!')
			//console.log('val',val);
			isCol = val[0] == 'c';
			elem.style.setProperty('flex-direction', 'column'); //flexDirection = isCol ? 'column' : 'row';
			//in order for this to work, HAVE TO set wmax or hmax!!!!!!!!!!!!!
			// if (isCol && nundef(styles.hmax)) { //?????????????? WTF??????????????????
			// 	let rect = getRect(elem.parentNode); //console.log('rect', rect);
			// 	elem.style.maxHeight = rect.h * .9;
			// 	elem.style.alignContent = 'start';
			// } else if (nundef(styles.wmax)) elem.style.maxWidth = '90%';
		} else if (key == 'flex') {
			if (isNumber(val)) val = '' + val + ' 1 0%';
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else {
			//console.log('set property',key,makeUnitString(val,unit),val,isNaN(val));
			//if ()
			elem.style.setProperty(key, makeUnitString(val, unit));
		}
	}
}


//#region get word at caret in textarea
function returnWord(text, caretPos) {
	var index = text.indexOf(caretPos);
	var preText = text.substring(0, caretPos);
	if (preText.indexOf(" ") > 0) {
		var words = preText.split(" ");
		return words[words.length - 1]; //return last word
	} else if (preText.indexOf("\n") > 0) {

		var words = preText.split("\n");
		return words[words.length - 1]; //return last word
	} else {
		return preText;
	}
}

function alertPrevWord() {
	var ta = document.getElementById("textArea");
	var caretPos = getCaretPosition(ta)
	var word = returnWord(ta.value, caretPos);
	if (word != null) {
		alert(word);
	}

}

function getCaretPosition(ctrl) {
	var caret_pos = 0;   // IE Support
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		caret_pos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		caret_pos = ctrl.selectionStart;
	return (caret_pos);
}

//#endregion

function create_day() {
	// available: j l q u x y z
	let list = 'action bath caffeine dunder essen fam ges haushalt interrupt kitchen meditate notion odf piano relax sleep therapy violin walk';
	list = 'action chillax lesen klavier pause random sleep walk';
	let body = 'gehen liegen sitzen';
	let communicate = 'stille musik hoeren sprechen';
	let mind = 'denken ges musik reden spiel tv';
	let channels = 'bliss observer ego'; //'future now past';
	let ego = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let negsubjects = 'finance leute moving nasi prison oasis reise';
	let possubjects = 'beethoven freiheit games klavier math music number programming spaz tod zauber';
	let moods = 'angst confusion eingesperrt frozen guilt manic regrets sorgen unease wrong';
	let poswords = 'himmel engel math algebra skyblue klavier beethoven spaziergang backen office redmond microsoft games';
	let negwords = 'wien menschen oasis immobilien geld finanzen erledigungen termin nasi prison past future taxes';

	//ich haett so gern einen job bei ms aber dazu muss ich das ego bisschen reduzieren
	//was muss ich machen um einen job bei ms zu bekommen? ist das nicht ein valid goal egal jetzt ob ich es tatsaechlich realisiere, einfach es in my mind so gestalten
	//ein jms besteht in: 
	//- prog 9-5 dh 8x60=500' per day, 3k' per week
	//- design documents schreiben: do NOT write code without plan!
	//- dazwischen sind paar meetings: die muss ich auch simulieren
	//- I have a boss / manager who tells me what the requirements are
	//- there are timelines and deadlines
	//- there is some learning / edu involved as well!
	//- best practice has to be followed

	//clearly, a portfolio and a skill set is what I need!
	//ich muss eine loesung finden fuer:
	// - vergessen von gelerntem
	// - unter zeitdruck arbeiten koennen
	// - energie-mangel during day
	// - vereinbarung mit real-life pflichten (fam stuff)

}
function eval_code() {
	let code = G.textarea.value;

	// let statements = code.split(';').map(x=>x.trim());
	// for(const st of statements) eval(st)
	eval(code);
}

function create_fiddle1(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(1, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && ev.ctrlKey && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == 'Escape' && !isEmpty(AU.list)) {
			au_reset();
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'ArrowDown' && ev.ctrlKey && !isEmpty(AU.list) ) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && ev.ctrlKey && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else {
			let [w,prefix]=getTextAreaCurrentWord(AU.ta);
			console.log('current word',w,prefix);
			AU.prefix=prefix;
			au_show_list();
		}
	}
}
function create_fiddle0(dParent) {
	mStyle(dParent, { position: 'relative' })
	let ta = mTextArea(10, 90, dParent, { padding: 20, position: 'relative' });
	setTimeout(() => ta.autofocus = true, 10);
	let buttons = mDiv(dParent, { w: '100%', align: 'right', maright: 4 }); //align:'right','align-self':'end','justify-self':'end'})
	let st = { fz: 14 };
	maButton('RUN (ctl+Enter)', au_run, buttons, st);
	maButton('LINE (ctl+shft+Enter)', au_run_line, buttons, st);
	let tacon = mTextArea(3, 90, dParent, { matop: 4, padding: 20, position: 'relative' });
	ta.focus();
	AU.popup = mDiv(dParent, { position: 'absolute', wmin: 100, hmin: 100, hmax: 600, overy: 'auto', bg: 'blue', fg: 'white' });
	hide(AU.popup)
	AU.fnames = get_keys(DA.funcs); AU.fnames.sort(); AU.list = []; AU.prefix = ''; AU.selected = null; AU.n = -1; AU.ta = ta; AU.tacon = tacon;

	ta.onkeydown = ev => {
		let k = ev.key;
		if (k == 'Enter' && AU.selected) ev.preventDefault();
		if (!isEmpty(AU.list) && (k == 'ArrowDown' || k == 'ArrowUp')) ev.preventDefault();
	}
	ta.onkeyup = ev => {
		let k = ev.key; let fnames = AU.fnames; let popup = AU.popup;
		if (k == 'Enter' && ev.ctrlKey) {
			au_reset();
			let code = ev.shiftKey ? getTextAreaCurrentLine(AU.ta) : AU.ta.value;
			runcode(code);
		} else if (k == ' ' || k == ')') {
			AU.previous = AU.prefix;
			//if completed existing function, now is the time to display params!
			if (isdef(AU.fnames[AU.previous])) {
				let w = AU.selected = AU.previous;
				//AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
				AU.uebernommen = DA.funcs[w];
				//show(popup)
				popup.innerHTML = AU.previous + '(' + AU.uebernommen.params + ')';
			} else {
				au_reset();
			}
		} else if (k == 'Enter' && AU.selected) {
			let w = AU.selected.innerHTML;
			let params = stringAfter(w, '(');
			w = stringBefore(w, '(')
			let s = stringAfter(w, AU.prefix);
			AU.ta.value = AU.ta.value + s; //.slice(0, -1) + s;
			AU.uebernommen = DA.funcs[w];
			popup.innerHTML = w + '(' + AU.uebernommen.params + ')';
			//hide(popup);
		} else if (k == 'Backspace' && AU.prefix.length > 1) {
			AU.prefix = AU.prefix.slice(0, -1);
			au_show_list();
		} else if (k == 'ArrowDown' && !isEmpty(AU.list)) {
			if (AU.n < AU.list.length - 1) AU.n++;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (k == 'ArrowUp' && !isEmpty(AU.list)) {
			if (AU.n > 0) AU.n--;
			let ch = popup.children;
			if (AU.selected) mStyle(AU.selected, { bg: 'blue' });
			AU.selected = ch[AU.n];
			mStyle(AU.selected, { bg: 'green' });
		} else if (isLetter(k) || k == '_') {
			//console.log('pressed letter', k); //YES!
			if (isEmpty(AU.prefix)) AU.selectionEnd = AU.ta.selectionEnd;
			AU.prefix += k;
			au_show_list();

		} else if (k != 'Shift') {
			au_reset();
			//console.log('ELSE!!!!!!!!!')
		}
	}
}

function getTextAreaCurrentWord_(el) {
	let line = '', word = '';
	if (el instanceof HTMLTextAreaElement) {
		let s = el.value;
		let i_caret = el.selectionStart;
		let i_last_break_before_caret = s.lastIndexOf('\n', i_caret - 1);
		if (i_last_break_before_caret < 0) i_last_break_before_caret = 0;
		let i_next_break = s.indexOf('\n', i_caret);
		if (i_next_break < 0) i_next_break = s.length - 1;
		let i_caret_within_line = i_caret - i_last_break_before_caret;
		line = s.slice(i_last_break_before_caret + 1, i_next_break);

		let i_space_before = line.lastIndexOf(' ', i_caret_within_line - 1);
		if (i_space_before < 0) i_space_before = 0;

		let i_space_after = line.indexOf(' ', i_caret_within_line);
		if (i_space_after < 0) i_space_after = line.length - 1;

		word = line.slice(i_space_before, i_space_after);

	}
	//document.getElementById('result').innerHTML = '"'+line+'"';
	return word;
}
function mSidebar() {
	let d = document.body;
	mDiv(d, { float: 'left', h: '100vh' }, 'dSidebar', 'HALLO', 'section');
}


//#region old server.js
function server01() {
	//#region game code: ***NOPE*** global server data
	// const G = {}; //global live game data stored on server
	// function update_player_move(player, move) {
	// 	if (!G.players) G.players = {};
	// 	if (!G.players[player]) G.players[player] = {};
	// 	G.players[player].move = move;
	// }
	//#endregion

	//#region Config: stored in config.yaml and appdata.yaml and tables.yaml
	const Config = fromYamlFile('../y/config.yaml') ?? {};
	const Appdata = fromYamlFile('../y/appdata.yaml') ?? {};
	const Tables = fromYamlFile('../y/tables.yaml') ?? [];
	//#endregion
}

function server00() {
	const express = require('express');
	const app = express();
	app.use(express.static(__dirname + '/..')); //Serve root directory
	app.use(express.json());

	//#region cors
	const cors = require('cors');
	app.use(cors()); //live-server: brauch ich cors!
	//#endregion

	//#region fs
	const yaml = require('js-yaml');
	const yaml2 = require('yaml');
	const fs = require('fs');
	function toYamlFile(data, filePath) { fs.writeFileSync(filePath, yaml2.stringify(data), 'utf8'); }
	function fromYamlFile(filePath) { const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); return yaml.load(data); }
	//#endregion

	//#region game code: global server data
	// const G = {}; //global live game data stored on server
	// function update_player_move(player, move) {
	// 	if (!G.players) G.players = {};
	// 	if (!G.players[player]) G.players[player] = {};
	// 	G.players[player].move = move;
	// }
	//#endregion

	//#region Config: stored in config.yaml and appdata.yaml and tables.yaml
	const Config = fromYamlFile('../y/config.yaml') ?? {};
	const Appdata = fromYamlFile('../y/appdata.yaml') ?? {};
	//for (const k in data) { Config.apps[k].data = data[k]; }
	const Tables = fromYamlFile('../y/tables.yaml') ?? [];

	//console.log('db loaded', DB);
	// function db_save() { toYamlFile(Config, '../y/db.yaml'); }
	// function db_set(key, o) { Config[key] = o; db_save(); }
	// function db_add(key, o) { Config[key].push(o); db_save(); }
	// app.post('/db/init/code', function (req, res) { db_set('code', req.body); res.send(Config); });
	// app.post('/db/add/code', function (req, res) { db_add('code', req.body); res.send(Config); });

	//#endregion

	//#region POST
	app.post('/post/json', function (req, res) {
		let o = req.body; // console.log(req.body);
		if (o.filename && o.data) { toYamlFile(o.data, '../y/' + o.filename + '.yaml'); }
		// else if (o.player && o.move) { update_player_move(o.player, o.move); }
		// else { toYamlFile(o, '../y/test.yaml'); }
		o.checked = true;
		res.send(o); //need to send json object!
	});

	//#endregion

	app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
	app.get('/file', (req, res) => { let filename = `../y/${req.query.name}.yaml`; res.send(fromYamlFile(filename)); });
	// app.get('/save', (req, res) => { db_save(); res.send(Config); });
	app.get('/test', (req, res) => { res.send('<h1>Hello world</h1>'); });
	app.get('/files', (req, res) => {
		var files = fs.readdirSync(`../y/${req.query.dir}`); //'../y/appdata'); //`/y/${req.query.dir}/`);
		console.log('files', files);
		res.send(files);
	});

	//#region socket.io
	const http = require('http');
	const { Server } = require("socket.io");
	const server = http.createServer(app);
	const io = new Server(server, { cors: { origins: '*', } });//live-server: brauch ich cors!

	// io.on('connection', (socket) => { console.log('a user connected'); }); //testing

	io.on('connection', (socket) => {
		handle_connect(socket.id);
		socket.on('message', handle_message);
		socket.on('update', handle_update);
		socket.on('disconnect', handle_disconnect); // ()=>handle_disconnect(socket.id));
	});
	function handle_connect(id) { console.log('connected', id); io.emit('message', 'someone logged in!'); }
	function handle_disconnect(x) { console.log('disconnected', x); io.emit('message', x); }
	function handle_message(x) { console.log('got message', x); io.emit('message', x); }
	function handle_update(x) { console.log('got update', x); io.emit('update', x); }
	//#endregion

	server.listen(3000, () => { console.log('listening on ' + 3000); });

}




//#endregion

//unused!
function fitbit_present(dParent, app) {
	console.log('dParent', dParent);
	//mClear(dParent);
	mLinebreak(dParent);
	let d = mDiv(dParent, { bg: 'blue', fg: 'yellow' });
	DA.app.div = d;
	let steps = lookupSet(app, ['today', 'steps'], 0);
	let d1 = mEditNumber('steps', steps, d, () => save_app_data(app), {})
	DA.app.div_edit = d1;
}
function save_app_data() {
	let val = Number(DA.app.div_edit.innerHTML)
	console.log('val', val);
}

