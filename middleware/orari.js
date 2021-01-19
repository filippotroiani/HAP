const Orario = require('../models/orario');
const Prenotazione = require('../models/prenotazione');
const trovaOrariInIntervallo = (range = ['09:00', '12,30'], intervallo) => {};

module.exports = {
	getOrariMedico:(orariLavoro = '/;/;/;/;/;/;/',
		intervallo = 15,
		data = new Date(),
		prenotazioniCorrenti = [])=>calcolaOrariVisite('Medico', orariLavoro, intervallo, data, prenotazioniCorrenti),
	getOrariSegreteria:(orariLavoro = '/;/;/;/;/;/;/',
		intervallo = 15,
		data = new Date(),
		prenotazioniCorrenti = [])=>calcolaOrariVisite('Segreteria', orariLavoro, intervallo, data, prenotazioniCorrenti),
};

const calcolaOrariVisite= (
		servizio='Medico',
		orariLavoro = '/;/;/;/;/;/;/',
		intervallo = 15,
		dataP,
		prenotazioniCorrenti = [] // per escludere eventualmente gli orari già prenotati, da fare il altra funzione
	) => {
		var data=new Date(dataP);
		console.log('giorno '+data.getDay()+' '+ data);
		var orari = [];
		if(data.getDay()==0){
			orari.push({ora:'CHIUSO',disponibile:false,numPazienti:0});
			return orari;
		}
		const orariGiorno = orariLavoro.split(';')[data.getDay() - 1].split('/'); //orariGiorno sarà un vettore con due elementi stringa: orari mattina [0] e orari pomeriggio [1]
		orariGiorno.forEach((range) => {
			//questo ciclo si ripete quindi due volte, una volta per il range di orari della mattina ed una per quello del pomeriggio
			if (range.indexOf('-') != -1) {
				var [oraInizio, oraFine] = range.split('-');
				var [ore, minuti] = oraFine.split(':');
				const dateFine = new Date(--ore * 60 * 60 * 1000 + minuti * 60 * 1000); //decremento prima con operatore decremento --ore per problema col fuso orario
				var [ore, minuti] = oraInizio.split(':');
				var dateInizio = new Date((--ore * 60 + minuti * 1) * 60 * 1000);
				for (var i = 0; dateInizio < dateFine; i++) {
					var ob={
						ora: `${
							(dateInizio.getHours() < 10 ? '0' : '') + dateInizio.getHours()
						}:${
							(dateInizio.getMinutes() < 10 ? '0' : '') +
							dateInizio.getMinutes()
						}`
					}
					if(servizio==='Medico')
						{if(typeof prenotazioniCorrenti[0]!='undefined'&&ob.ora===prenotazioniCorrenti[0].ora) {
							ob.disponibile=false;
							prenotazioniCorrenti.shift();
						}
						else 
							ob.disponibile=true;}
					else if(servizio==='Segreteria'){
						if(typeof prenotazioniCorrenti[0]!='undefined'&&ob.ora===prenotazioniCorrenti[0].ora) {
							ob.numPazienti=prenotazioniCorrenti[0].numPazienti;
							prenotazioniCorrenti.shift();
						}
						else 
							ob.numPazienti=0;
					}
					orari.push(ob);
					dateInizio.setMinutes(dateInizio.getMinutes()+intervallo);
					/* dateInizio = new Date(
						(ore * 60 + minuti * 1 + intervallo * i) * 60 * 1000
					); */
				}
			}
		});
		return orari;
	};
