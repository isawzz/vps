onload = start;

function start(){

	Geo.cities = Geo.continents.Africa;

	mAutocomplete('dTable');
	return;

	let inp=document.getElementsByTagName('input')[0];
	console.log('inp',inp);

	autocomplete('hallo',['aber','das','ist','doch','alles','egal']);
	
}