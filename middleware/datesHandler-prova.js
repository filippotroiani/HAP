const Data = {
	anno: 2020,
	mese: 01,
	giorno: 01,
	ore: 00,
	minuti: 00,
	constructor: () => {},
	setData: (anno, mese, giorno, ore, minuti) => {
		this.anno = anno;
		this.mese = mese;
		this.giorno = giorno;
		this.ore = ore;
		this.minuti = minuti;
	},
	setDatafromObj: (data = new Date()) => {
		this.anno = data.getFullYear;
		this.mese = data.getMonth() + 1;
		this.giorno = data.getDate();
		this.ore = data.getHours();
		this.minuti = data.getMinutes();
	},
	toString: () => {
		return `${(this.giorno < 10 ? '0' : '') + this.giorno}-${
			(this.mese < 10 ? '0' : '') + this.mese
		}-${this.anno} ${(this.ore < 10 ? '0' : '') + this.ore}:${
			(this.minuti < 10 ? '0' : '') + this.minuti
		}`;
	},
	toObject: () => {
		return new Date(
			this.anno,
			this.mese - 1,
			this.giorni,
			this.ore,
			this.minuti
		);
	}
};
module.exports = Data;
