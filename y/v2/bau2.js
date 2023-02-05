async function load_codebase(paths, preserveRegionNames = false) {
	if (nundef(paths)) {
		paths = ['basemin', 'board', 'cards', 'gamehelpers', 'select']; //.map(f => `../basejs/${f}.js`);
		paths = paths.map(f => `../basejs/${f}.js`);
		//paths.push(`../game/done.js`);
		// let paths = [`../game/aaa.js`];
	}
	let superdi = {cla:{},func:{},const:{},var:{}};
	for (const f of paths) {
		console.log('...processing file', f);
		let current_file = stringBefore(stringAfterLast(f, '/'), '.');
		let base = await route_path_text(f);
		let res = parseCodefile(base, current_file, preserveRegionNames, {}, superdi);
		//console.log('res',res, '\nnum functions:',get_keys(res.dicode).length)
		//reslist.push(res);
	}
	return superdi;
}
function downloadCodebase(superdi) {
	//macht 1 normales .js file mit dem gesamten code (ohne regions!)
	//und 1 yaml dict mit der info (sig,code,region...)
	//lass mal den code aus
	//search: bei var, const, clas: 1. mal x im file bei func: function ${x}
	let text = '';
	for (const type of ['var', 'const', 'cla', 'func']) {
		let keys = get_keys(superdi[type]);
		// if (type=='cla' ||type == 'func') sortCaseInsensitive(keys);
		if (type != 'const') sortCaseInsensitive(keys);
		for (const k of keys) {
			let code = superdi[type][k].code;
			if (!isEmptyOrWhiteSpace(code)) {
				text += code;
				if (code.trim() == '}') text += '\r\n';
				//text+= (type == 'var' || type == 'const' ? '' : '\r\n');
			}
		}
	}
	downloadAsText(text, 'hallo', 'js');
	downloadAsYaml(superdi, 'hallo');
}
//#region dirlist
function getDirList() {
	let dirlist = [
		//legacy (DATA):
		'C:\\DATA\\dev\\js\\02harris\\_global',
		'C:\\DATA\\dev\\js\\02harris\\manyCars',
		'C:\\DATA\\dev\\js\\02harris\\wipgame',
		'C:\\DATA\\dev\\js\\02harris\\ch9',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch01\\examples',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch02\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch03\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch04\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch07\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch09\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch10\\scripts',
		// 'C:\\DATA\\dev\\js\\03seidlin\\ch11\\scripts',
		'C:\\DATA\\dev\\js\\03seidlin\\ch12\\scripts',
		'C:\\DATA\\dev\\js\\06verou',
		'C:\\DATA\\dev\\js\\07joeames\\js',
		'C:\\DATA\\dev\\js\\08cardGame1\\script',
		'C:\\DATA\\dev\\js\\16kaefer\\js',
		'C:\\DATA\\dev\\js\\19lifeGame\\version1',
		'C:\\DATA\\dev\\js\\20testPongApp',
		'C:\\DATA\\dev\\js\\23Animations_CSS_JS\\_my\\clock\\js',
		'C:\\DATA\\dev\\js\\23Animations_CSS_JS\\_my\\learning\\final\\js',
		'C:\\DATA\\dev\\js\\24memory',
		'C:\\DATA\\dev\\js\\25nnImage\\scripts',
		'C:\\DATA\\dev\\js\\26udaCanvas',
		'C:\\DATA\\dev\\js\\28cards\\test02',
		'C:\\DATA\\dev\\js\\31p0',
		'C:\\DATA\\dev\\js\\32t0\\grid',
		'C:\\DATA\\dev\\js\\33cardGameStarter',
		'C:\\DATA\\dev\\js\\40cardSolitaire\\cg01',
		'C:\\DATA\\dev\\js\\42deckOfCards\\test02',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\work2',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\work',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\wCOMMON\\js',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\wCOMMON\\js\\rsgTypes',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid2\\js',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid2\\rsg',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid0\\static\\front\\js',
		'C:\\DATA\\dev_2020\\CBII\\zLastVid\\vid0\\static\\rsg\\js',
		'C:\\DATA\\dev_2020\\CODEBASE\\tnt_code\\_front\\asimple\\js',
		'C:\\DATA\\dev_2020\\CODEBASE\\tnt_code\\_front\\front_console\\js',
		'C:\\DATA\\dev_2020\\CODEBASE\\okt21\\static\\js',
		'C:\\DATA\\dev_2020\\CODEBASE\\work\\nov08\\js',

		//middle
		'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\rsg93\\static\\js',
		'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\okt21\\static\\js',
		'C:\\Users\\tawzz\\OneDrive\\dev\\CBII\\CODE_SAFE\\CODE\\js',
		'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\gsm2_tictactoe\\js',
		'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tnt_code\\_front\\asimple\\js',
		'C:\\Users\\tawzz\\OneDrive\\dev\\CODEBASE\\tntCode\\js',
		'C:\\D\\a00\\git_archive\\testing\\BASE\\features',
		'C:\\D\\a00\\git_archive\\testing\\BASE',
		'C:\\D\\a00\\git_archive\\test01\\public\\BASE',
		'C:\\D\\a00\\git_archive\\test01\\public\\t99',
		'C:\\D\\a00\\FLASK\\step4\\base\\js',
		'C:\\D\\a00\\FLASK\\step4\\base\\features',
		'C:\\D\\a00\\git_archive\\vid_old\\static\\rsg\\js',
		'C:\\D\\a00\\git_archive\\vid_old\\static\\front\\js',
		'C:\\D\\a00\\git_archive\\vid\\frontend\\static\\rsg\\js',
		'C:\\D\\a00\\git_archive\\vid\\frontend\\static\\front\\js',
		'C:\\D\\a00\\git_archive\\gsmTester\\C',
		'C:\\D\\a00\\git_archive\\gsmTester\\DIE',
		'C:\\D\\a00\\git_archive\\gsmTester\\DOC',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\done',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\measureArrange',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\R',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\testing',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\types',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js\\uiCreation',
		'C:\\D\\a00\\git_archive\\gsmTester\\RSG\\js',
		'C:\\D\\a00\\git_archive\\gsmTester\\SPGAME',
		'C:\\D\\a00\\git_archive\\gsmTester\\SPNEW',
		'C:\\D\\a00\\git_archive\\cardTests\\_test\\ex03',
		'C:\\D\\a00\\git_archive\\cardTests\\simple01',
		'C:\\D\\a00\\git_archive\\cardTests\\ex06_fromScratch',
		'C:\\D\\a00\\git_archive\\eximple\\static',
		'C:\\D\\a00\\git_archive\\eximple\\static\\games',
		'C:\\D\\a00\\git_archive\\dycon_ui_test\\base\\js',
		'C:\\D\\a00\\git_archive\\course-player-socketio\\public\\t99',
		'C:\\D\\a00\\git_archive\\asstest\\CODE',
		'C:\\D\\a00\\git_archive\\asstest\\SIMPLE',
		'C:\\D\\a00\\git_archive\\animaludos\\public\\work',
		'C:\\D\\a00\\git_archive\\animaludos\\public\\work\\done',
		'C:\\D\\a00\\git_archive\\also\\MZZ',
		'C:\\D\\a00\\git_archive\\also\\BASE',
		'C:\\D\\a00\\git_archive\\also\\BASE\\features',
		'C:\\D\\a00\\git_archive\\animaludos\\public',
		'C:\\D\\a00\\git_archive\\animaludos\\public\\BASE',
		'C:\\D\\a00\\git_archive\\animaludos\\public\\BASE\\features',
		'C:\\D\\a00\\git_archive\\abra',
		'C:\\D\\a00\\hive\\hive',
		'C:\\D\\a00\\TESTING\\base\\js',
		'C:\\D\\a00\\TESTING\\cosensus',
		'C:\\D\\a00\\TESTING\\easy',
		'C:\\D\\a00\\TESTING\\feedback',
		'C:\\D\\a00\\TESTING\\games',
		'C:\\D\\a00\\TESTING\\index_palette',
		'C:\\D\\a00\\videmo\\frontend\\static\\front\\js',
		'C:\\D\\a00\\videmo\\frontend\\static\\rsg\\js',
		'C:\\D\\a00\\videmo\\games\\catan\\_rsg',
		'C:\\D\\a00\\videmo\\games\\ttt\\_rsg',
		'C:\\D\\a00\\vid\\vid0\\static\\front\\js',
		'C:\\D\\a00\\vid\\vid0\\static\\rsg\\js',
		'C:\\D\\a00\\vid\\work2',
		'C:\\D\\a00\\vid\\wCOMMON\\js\\rsgTypes',
		'C:\\D\\a00\\vid\\wCOMMON\\js',
		'C:\\D\\a00\\vid\\vid2\\js',
		'C:\\D\\a00\\vid\\vid2\\rsg',
		'C:\\D\\a01\\chatApp\\public\\BASE',
		'C:\\D\\a01\\chatApp\\public\\BASE\\features',
		'C:\\D\\a01\\chatApp\\public\\work',
		'C:\\D\\a01\\chatApp\\public\\work\\done',
		'C:\\D\\a01\\chatApp\\public',
		'C:\\D\\a01\\chess',
		// more important:
		'C:\\xampp\\htdocs\\aroot\\_other\\perlen\\work\\done',
		'C:\\xampp\\htdocs\\aroot\\_other\\perlen\\work',
		'C:\\xampp\\htdocs\\aroot\\_other\\perlen',
		'C:\\xampp\\htdocs\\aroot\\_other\\bella\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\bg\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\bg4\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\canyonglen',
		'C:\\xampp\\htdocs\\aroot\\_other\\cards',
		'C:\\xampp\\htdocs\\aroot\\_other\\caristo',
		'C:\\xampp\\htdocs\\aroot\\_other\\chatas\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\chatas2',
		'C:\\xampp\\htdocs\\aroot\\_other\\chmultOrig\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\feedback',
		'C:\\xampp\\htdocs\\aroot\\_other\\frontend',
		'C:\\xampp\\htdocs\\aroot\\_other\\happy',
		'C:\\xampp\\htdocs\\aroot\\_other\\hive',
		'C:\\xampp\\htdocs\\aroot\\_other\\klavier',
		'C:\\xampp\\htdocs\\aroot\\_other\\phpchat\\public\\socket.io-client\\lib',
		'C:\\xampp\\htdocs\\aroot\\_other\\simply\\js',
		'C:\\xampp\\htdocs\\aroot\\_other\\v0_chatas',
		'C:\\xampp\\htdocs\\aroot\\base\\js',
		'C:\\xampp\\htdocs\\aroot\\base\\code',
		'C:\\xampp\\htdocs\\aroot\\belinda\\js',
		'C:\\xampp\\htdocs\\aroot\\belinda\\features',
		'C:\\xampp\\htdocs\\aroot\\cosensus',
		'C:\\xampp\\htdocs\\aroot\\easy',
		'C:\\xampp\\htdocs\\aroot\\iconViewer\\js',
		'C:\\xampp\\htdocs\\aroot\\rechnung',
		'C:\\xampp\\htdocs\\aroot\\simple',
		'C:\\xampp\\htdocs\\aroot\\videos\\js',
		'C:\\D\\a03\\nodemaster\\all\\caba',
		'C:\\D\\a03\\nodemaster\\all\\canvas\\lib',
		'C:\\D\\a03\\nodemaster\\all\\canvas\\noc',
		'C:\\D\\a03\\nodemaster\\all\\canvas\\smooth',
		'C:\\D\\a03\\nodemaster\\all\\cita',
		'C:\\D\\a03\\nodemaster\\all\\coding\\public\\javascripts',
		'C:\\D\\a03\\nodemaster\\all\\favicontester',
		'C:\\D\\a03\\nodemaster\\all\\fileupload\\public',
		'C:\\D\\a03\\nodemaster\\all\\fractals\\nature',
		'C:\\D\\a03\\nodemaster\\all\\fractals\\nn\\031_FlappyBird\\P5',
		'C:\\D\\a03\\nodemaster\\all\\fractals\\plant',
		'C:\\D\\a03\\nodemaster\\all\\fractals\\tree',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf90',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf91',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leafp',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leaf94',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\leafstreetview',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\mapgame',
		'C:\\D\\a03\\nodemaster\\all\\leaflet\\routing',
		// 'C:\\D\\a03\\nodemaster\\all\\mapbox\\mapbox',
		'C:\\D\\a03\\nodemaster\\all\\mybrary\\public\\javascripts',
		'C:\\D\\a03\\nodemaster\\all\\openlayers\\map',
		'C:\\D\\a03\\nodemaster\\all\\openlayers\\mapTEXT',
		'C:\\xampp\\htdocs\\aroot\\games',
		'C:\\D\\a03\\nodemaster\\basejs',
		'C:\\D\\a03\\nodemaster\\cai',
		'C:\\D\\a03\\nodemaster\\noc',
		'C:\\D\\a03\\nodemaster\\socketstarter',
		'C:\\D\\a04\\basejs',
		'C:\\D\\a04\\game',

	];
}
//#endregion done




















