function ev_to_gname(ev) { evNoBubble(ev); return evToTargetAttribute(ev, 'gamename'); }

function onclick_game_menu_item(ev) {
	let gamename = ev_to_gname(ev);
	stopgame();
	
	let dMenu = mBy('dMenu');show(dMenu); mClear(dMenu);

	let dForm = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
	let dInputs = mDiv(dForm, {}, 'dMenuInput');
	let dButtons = mDiv(dForm, {}, 'dMenuButtons');
	let bstart = mButton('start', () => {
		let players = DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode }));
		//console.log('players are', players);
		let game = gamename;
		let options = collect_game_specific_options(game);
		for (const pl of players) { if (isEmpty(pl.strategy)) pl.strategy = valf(options.strategy, 'random'); }
		//console.log('options nach collect',options)
		startgame(game, players, options); hide('dMenu');
	}, dButtons, {}, 'button');
	let bcancel = mButton('cancel', () => { hide('dMenu'); }, dButtons, {}, 'button');

	let d = dInputs; mClear(d); mCenterFlex(d);
	let dParent = mDiv(d, { gap: 6 });
	mCenterFlex(dParent);
	DA.playerlist = [];

	//show players
	DA.playerlist = [];
	let params = [gamename, DA.playerlist];
	let funcs = [style_not_playing, style_playing_as_human, style_playing_as_bot];
	for (const u of Serverdata.users) {
		if (['ally', 'bob', 'leo'].includes(u.name)) continue; //lass die aus!!!!
		let d = get_user_pic_and_name(u.name, dParent, 40); mStyle(d, { w: 60 })
		let item = { uname: u.name, div: d, state: 0, strategy: '', inlist: false, isSelected: false };

		//host spielt als human mit per default
		if (isdef(U) && u.name == U.name) { toggle_select(item, funcs, gamename, DA.playerlist); }

		//katzen sind bots per default! (select twice!)
		// if (['nimble', 'guest', 'minnow', 'buddy'].includes(u.name)) { toggle_select(item, funcs, gamename, DA.playerlist); toggle_select(item, funcs, gamename, DA.playerlist); }

		d.onclick = () => toggle_select(item, funcs, gamename, DA.playerlist);
		mStyle(d, { cursor: 'pointer' });
	}
	mLinebreak(d, 10);
	show_game_options(d, gamename);

	mFall('dMenu');
}
function show_games(ms = 500) {

	let dParent = mBy('dGames');
	mClear(dParent);
	mText(`<h2>start new game</h2>`, dParent, { maleft: 12 });

	let d = mDiv(dParent, { fg: 'white', animation: 'appear 1s ease both' }, 'game_menu');
	mCenterFlex(d); //mFlexWrap(d);
	let gamelist = 'aristo bluff spotit ferro fritz'; if (DA.TEST0) gamelist += ' a_game';
	for (const g of dict2list(Config.games)) {
		if (gamelist.includes(g.id)) {
			let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
			let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id, null, 'hop1');
			d1.setAttribute('gamename', g.id);
			d1.onclick = onclick_game_menu_item;
			mCenterFlex(d1);
			mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
			mLinebreak(d1);
			mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);
		}
	}
}


























