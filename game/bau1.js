
function mSearch(handler, dParent, styles, classes) {
	let html0 = `
		<form id="fSearch" action="javascript:void(0);" style='display:flex;align-items:center'>
			<label class='label'>Keywords:</label>
			<input id="iKeywords" type="text" name="keywords" style="flex-grow:1" class='input' />
			<button type="submit" class='btn'>Search</button>
		</form>
	`;
	let html = `
		<form id="fSearch" action="javascript:void(0);" class='form'>
			<label>Keywords:</label>
			<input id="iKeywords" type="text" name="keywords" style="flex-grow:1" />
			<button type="submit" class='hop1' >Search</button>
		</form>
	`;
	let elem = mCreateFrom(html);
	mAppend(dParent, elem);
	elem.onsubmit = handler;
	return elem;
}

function half_goal() {
	//if 
}

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























