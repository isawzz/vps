
function indexOfAny(s,list,pos){
	let min=1000000;
	let match=null;
	for(const w of list){
		let i=s.indexOf(w,pos);
		if (i>=0 && i<min) {min=i;match=w;}
	}
	return match? [min,match]:[-1,null];
}
function lastIndexOfAny(s,list,pos){
	// eg lastIndexOfAny('das ist gut',[' '],4);
	let min=-1;
	let match=null;
	for(const w of list){
		let i=s.lastIndexOf(w,pos);
		if (i>=0 && i>min) {min=i;match=w;}
	}
	return match? [min,match]:[-1,null];
}

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
















