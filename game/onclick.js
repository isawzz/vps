
function onclick_game_menu_item(ev) {
	let gamename = ev_to_gname(ev);
	stop_game();

	show_game_options_menu(gamename);
}
function generic_present(d,g){
		
	let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
	let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id, null, 'hop1');
	d1.setAttribute('gamename', g.id);
	//d1.onclick = onclick_apps_menu_item;
	mCenterFlex(d1);
	mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
	mLinebreak(d1, 4);
	mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);

}
function get_app_presenter(id){
	let di = {};
	return di[id] || generic_present;
}
function fitbit_present(dParent,app){
	console.log('dParent',dParent);
	//mClear(dParent);
	mLinebreak(dParent);
	let d=mDiv(dParent,{bg:'blue',fg:'yellow'}); 
	DA.app.div = d;
	let steps = lookupSet(app,['today','steps'],0);
	let d1=mEditNumber('steps',steps,d,()=>save_app_data(app),{})
	DA.app.div_edit = d1;
}
function save_app_data(){
	let val = Number(DA.app.div_edit.innerHTML)
	console.log('val', val);
}
















