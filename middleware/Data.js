module.exports = {
	constructor(oggettoData = new Date()) {
		this.giorno = oggettoData.getDate();
		this.mese = oggettoData.getMonth() + 1;
		this.anno = oggettoData.getFullYear();
		this.ore = oggettoData.getHours();
		this.minuti = oggettoData.getMinutes();
		this.secondi = oggettoData.getSeconds();
	},
	setDate(anno = 2020, mese = 1, giorno = 1, ore = 0, minuti = 0, secondi = 0) {
		this.giorno = giorno;
		this.mese = mese;
		this.anno = anno;
		this.ore = ore;
		this.minuti = minuti;
		this.secondi = secondi;
	},
	setDateFromObj(oggettoData) {
		constructor(oggettoData);
	},
	setDateFromString(data = '01-01-2020 00:00:00') {
		const trattino = '-';
		const slash = '/';
		var componenti =
			data.indexOf(trattino) != -1 ? data.split(trattino) : data.split(slash); //se il separatore non è il trattino utilizza per gli slash per separare
		this.mese = componenti[1] - 0; //-0 trasforma il numero nella stringa in un intero
		if (componenti[2].indexOf(' ') != -1) {
			const componenti2 = componenti[2].split(' ');
			componenti[2] = componenti2[0];
			const orario = componenti2[1].split(':');
			this.ore = orario[0] - 0;
			this.minuti = orario[1] - 0;
			this.secondi = orario[2] - 0;
		} else {
			this.ore = 0;
			this.minuti = 0;
			this.secondi = 0;
		}
		if (componenti[0].length > componenti[2].length) {
			this.giorno = componenti[2] - 0;
			this.anno = componenti[0] - 0;
		} else {
			this.giorno = componenti[0] - 0;
			this.anno = (componenti[2].length == 2 ? '20' : '') + componenti[2] - 0;
		}
	},
	getDate(separatore = '-') {
		return `${(this.giorno < 10 ? '0' : '') + this.giorno}${separatore}${
			(this.mese < 10 ? '0' : '') + this.mese
		}${separatore}${this.anno}`;
	},
	getTime() {
		return `${(this.ore < 10 ? '0' : '') + this.ore}:${
			(this.minuti < 10 ? '0' : '') + this.minuti
		}:${(this.secondi < 10 ? '0' : '') + this.secondi}`;
	},
	getFullDate(separatore = '-') {
		return `${(this.giorno < 10 ? '0' : '') + this.giorno}${separatore}${
			(this.mese < 10 ? '0' : '') + this.mese
		}${separatore}${this.anno} ${(this.ore < 10 ? '0' : '') + this.ore}:${
			(this.minuti < 10 ? '0' : '') + this.minuti
		}`;
	},
	getFullDateHTML(separatore = '-') {
		return `${this.anno}${separatore}${
			(this.mese < 10 ? '0' : '') + this.mese
		}${separatore}${(this.giorno < 10 ? '0' : '') + this.giorno}`;
	},
	getDateObj() {
		return new Date(
			this.anno,
			this.mese - 1,
			this.giorno,
			this.ore,
			this.minuti,
			this.secondi
		);
	}
};
