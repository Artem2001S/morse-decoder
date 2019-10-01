const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
};

function decode(expr) {
	if (expr.length < 10) return 0;

	let exprWithSeparator = '';

	// add separator
	for (let i = 9; i < expr.length; i += 10) {
		exprWithSeparator += expr.slice(i - 9, i + 1) + '|';
	}

	//get source array, create res array 
	const arrayExpr = exprWithSeparator.split('|');
	const arrayRes = new Array(arrayExpr.length);

	for (let i = 0; i < arrayExpr.length; i++) {
		arrayRes[i] = '';
		for (let j = 1; j < arrayExpr[i].length; j += 2) {
			//if get '**********' then specify this a space
			if (arrayExpr[i] === '**********') {
				arrayRes[i] = ' ';
				continue;
			}

			let exprCode = arrayExpr[i][j - 1] + arrayExpr[i][j];
			if (exprCode == '11') arrayRes[i] = arrayRes[i] + '-';
			if (exprCode == '10') arrayRes[i] = arrayRes[i] + '.';
		}

		//decode
		if (arrayRes[i] !== ' ') {
			arrayRes[i] = decodeMorseSymbol(arrayRes[i]);
		}
	}

	return arrayRes.join('');
}

function decodeMorseSymbol(str) {
	return MORSE_TABLE[str];
}

module.exports = {
	decode
}