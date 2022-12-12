const { representName } = require("js-yaml/lib/type/str");

function collect_game_specific_options(game) {
	let poss = Config.games[game].options;
	if (nundef(poss)) return;
	let di = {};
	for (const p in poss) {
		let fs = mBy(`d_${p}`);
		//console.log('fs',fs, 'key',p);
		let val = get_checked_radios(fs)[0];
		di[p] = isNumber(val) ? Number(val) : val;
	}
	return di;
}
function rName(){
	
}
function create_random_players(n=1){
	//first player is solo player Ludwig van Beethoven
	let res = [{name:'mimi',playmode:'human',color:'pink'}];
	for(let i=1;i<n;i++){
		let pl = {name:representName(),playmode:'bot',color:rColor()};

	}
}
function ev_to_gname(ev) { evNoBubble(ev); return evToTargetAttribute(ev, 'gamename'); }

function show_standard_title(dParent, title) { mText(title, dParent, { margin: 20, fz: 24 }); }
function show_games(ms = 500) {

	let dParent = mBy('dGames');
	mClear(dParent);
	show_standard_title(dParent, 'Games');

	let d = mDiv(dParent, { fg: 'white' }, 'game_menu');
	//let d = mDiv(dParent, { fg: 'white', animation: 'appear 1s ease both' }, 'game_menu');
	mCenterFlex(d); //mFlexWrap(d);
	let gamelist = 'goalnumber reversi'; //'aristo bluff spotit ferro fritz'; if (DA.TEST0) gamelist += ' a_game';
	for (const g of dict2list(Config.games)) {
		if (gamelist.includes(g.id)) {
			let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
			let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id, null, 'hop1');
			d1.setAttribute('gamename', g.id);
			d1.onclick = onclick_game_menu_item;
			mCenterFlex(d1);
			mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
			mLinebreak(d1, 4);
			mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);
		}
	}
}
function show_game_options_menu(gamename) {
	let dMenu = mBy('dMenu'); show(dMenu); mClear(dMenu);
	show_standard_title(dMenu, 'Game Options');

	let d = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
	let dOptions = mDiv(d, {}, 'dMenuInput'); mCenterFlex(dOptions);
	let dButtons = mDiv(d, { display: 'flex', justify: 'center', w: '100%' }, 'dMenuButtons');

	//soll es players geben? NEIN
	DA.playerlist = null;

	//game options
	show_game_options(dOptions, gamename); 

	//button start and cancel
	let astart = maButton('Start', start_game, dButtons); // mLink("javascript:void(0)", dButtons, {}, null, 'Start', 'a');
	let acancel = maButton('Cancel', cancel_game, dButtons); // mLink("javascript:void(0)", dButtons, {}, null, 'Cancel', 'a');',startgame,dButtons);
}
function show_game_options(dParent, gamename) {
	DA.gamename = gamename;
	mRemoveChildrenFromIndex(dParent, 2);
	let poss = Config.games[gamename].options;
	if (nundef(poss)) return;
	for (const p in poss) {
		let key = p;
		let val = poss[p];
		if (isString(val)) {
			let list = val.split(','); // make a list 
			let fs = mRadioGroup(dParent, { maright: 12 }, `d_${key}`, key);
			for (const v of list) { mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { vmargin:4, align: 'left', cursor: 'pointer' }, null, key, true); }
			measure_fieldset(fs);
		}
	}
}

function stop_game() { console.log('stopgame'); }
function start_game() {
	let gamename = DA.gamename;
	let options = collect_game_specific_options(gamename);
	console.log('options nach collect',options)
	let players = DA.playerlist? DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode, strategy: valf(x.strategy, options.strategy, 'random')})):create_random_players(options.nplayers);
	console.log('players are', players);
	_start_game(gamename, players, options); hide('dMenu');
	//console.log('startgame'); 
}
function _start_game(gamename,players,options){

}
function cancel_game() { console.log('cancelgame'); }















