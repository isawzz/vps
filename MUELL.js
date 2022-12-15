//unused!
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

