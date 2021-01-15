const Data = require('./Data');

const trovaOrariInIntervallo = (range = ['09:00', '12,30'], intervallo) => {};

module.exports = {
	convertDate: (data) => {
		return `${(data.getDate() < 10 ? '0' : '') + data.getDate()}-${
			(data.getMonth() < 10 ? '0' : '') + (data.getMonth() + 1)
		}-${data.getFullYear()} ${
			(data.getHours() < 10 ? '0' : '') + data.getHours()
		}:${(data.getMinutes() < 10 ? '0' : '') + data.getMinutes()}`;
	},
	calcolaOrariVisite: (
		orariLavoro = '/;/;/;/;/;/;/',
		intervallo = 15,
		data = new Date(),
		prenotazioniCorrenti = []
	) => {
		const orariGiorno = orariLavoro.split(';')[data.getDay() - 1].split('/'); //orariGiorno sarà un vettore con due elementi stringa: orari mattina [0] e orari pomeriggio [1]
		var orari = [];

		orariGiorno.forEach((range) => {
			//questo ciclo si ripete quindi due volte, una volta per il range di orari della mattina ed una per quello del pomeriggio
			if (range.indexOf('-') != -1) {
				var [oraInizio, oraFine] = range.split('-');
				var [ore, minuti] = oraFine.split(':');
				const dateFine = new Date(--ore * 60 * 60 * 1000 + minuti * 60 * 1000); //operatore decremento --ore per problema col fuso orario
				var [ore, minuti] = oraInizio.split(':');
				var dateInizio = new Date((--ore * 60 + minuti * 1) * 60 * 1000);
				for (var i = 0; dateInizio < dateFine; i++) {
					orari.push({
						ora: `${
							(dateInizio.getHours() < 10 ? '0' : '') + dateInizio.getHours()
						}:${
							(dateInizio.getMinutes() < 10 ? '0' : '') +
							dateInizio.getMinutes()
						}`,
						disponibile: true
					});
					dateInizio = new Date(
						(ore * 60 + minuti * 1 + intervallo * i) * 60 * 1000
					);
				}
			}
		});
		return orari;
	}
};
