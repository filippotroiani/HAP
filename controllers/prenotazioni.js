const Prenotazione = require('../models/prenotazione');
const Orario = require('../models/orario');
const Paziente = require('../models/paziente');
const { getOrariSegreteria, getOrariMedico } = require('../middleware/orari');
const prenotazione = require('../models/prenotazione');
async function getPrenotazioniSegreteria(dataP= new Date()){
	const data=new Date(dataP);
	data.setHours(0);
	var data2=new Date(data);
	data2.setDate(data2.getDate()+1);
	var orari=await Prenotazione.aggregate(
				[
				{$match: {
						servizio:'Segreteria',
						dataPrenotazione:{
							$gte:data,
							$lt:data2
						}
					}
				}, 
				{$group: {
						_id:{$dateToString: { format: "%H:%M", date: "$dataPrenotazione", timezone:"+01:00" }},
						numPazienti: {
							$sum: 1
						}
					}
				},
				{$project: {
						_id:0,
						'ora':"$_id",
						numPazienti:1
					}
				},
				{$sort: {
						ora:1
					}
				}
				]);
				return orari;
};
module.exports = {
	indexPrenotazioni(req, res, next) {
		res.redirect('prenotazioni/new');
	},
	async newPrenotazioni(req, res, next) {
		const oggi = new Date();
		oggi.setHours(3, 0, 0);
		const prenotazioni = await Prenotazione.find({
			paziente: req.user.idRef._id,
			dataPrenotazione: { $gte: oggi }
		});
		const orariMedico = await Orario.findOne(
			{ medico: req.user.idRef.medico },
			'orari intervallo'
		);
		const orari = getOrariMedico(
			orariMedico.orari,
			orariMedico.intervallo
		);
		res.render('prenotazioni/new', {
			title: 'Nuova prenotazione - HAP',
			prenotazioni,
			orari
		});
	},
	async getOrariMedicoAPI(req, res, next) {
		const dataParamentro = req.query.day.split('-');
		const dataRicerca =`${dataParamentro[2]}-${dataParamentro[1]}-${dataParamentro[0]}T00:00:00`;
		const orariMedico = await Orario.findOne(
			{ medico: req.user.idRef.medico },
			'orari intervallo'
		);
		const orari = getOrariMedico(
			orariMedico.orari,
			orariMedico.intervallo,
			dataRicerca,
			await getPrenotazioniSegreteria(dataRicerca)
		);
		/* orari.forEach((orario) => {
			orario.numPazienti = 3;
		}); */
		res.json({
			orari
		});
	},
	async createPrenotazioni(req, res, next) {
		if (!req.body) {
			req.session.error = `Seleziona la data e l'orario che preferisci`;
			res.redirect('/prenotazioni');
		} else {
			//const paziente = await Paziente.findById(req.user.idRef._id);
			const newPrenotazione = {
				paziente: req.user.idRef._id,
				servizio: req.body.prenotazione.servizio,
				medico: req.user.idRef.medico, //paziente.medico,
				dataPrenotazione: new Date(
					req.body.prenotazione.data + 'T' + req.body.prenotazione.ora + ':00'
				),
				motivazione: req.body.prenotazione.motivazione || ''
			};
			const prenotazione = await Prenotazione.create(newPrenotazione);
			req.session.success = 'Prenotazione creata con successo.';
			res.redirect('/prenotazioni/new');
		}
	},
	async showPrenotazione(req, res, next) {
		var prenotazione = await Prenotazione.findById(req.params.id_prenotazione);
		prenotazione.dataCreazione = convertDate(prenotazione.dataCreazione);
		prenotazione.dataPrenotazione = convertDate(prenotazione.dataPrenotazione);
		res.render('prenotazioni/show', {
			title: `Prenotazione ${prenotazione.dataPrenotazione} - HAP`,
			prenotazione
		});
	},
	async deletePrenotazioni(req, res, next) {
		await Prenotazione.findByIdAndDelete(req.params.id_prenotazione);
		req.session.success = 'Prenotazione eliminata con successo.';
		res.redirect('/prenotazioni');
	},
	async indexSegreteria(req, res, next) {
		const orariSegreteria = await Orario.find(
			{ servizio: 'Segreteria' },
			'orari intervallo'
		);
		console.log(orariSegreteria)
		const orari = await getOrariSegreteria(
			orariSegreteria[0].orari,
			orariSegreteria[0].intervallo,
			undefined,
			await getPrenotazioniSegreteria()
		);
		res.render('../views/prenotazioni/segreteria', { orari });
	},
	async getOrariSegreteriaAPI(req, res, next) {
		const dataParamentro = req.query.day.split('-');
		const dataRicerca =`${dataParamentro[2]}-${dataParamentro[1]}-${dataParamentro[0]}T00:00:00`;//new Date(`${dataParamentro[2]}-${dataParamentro[1]}-${dataParamentro[0]}T00:00:00`);
		const orariSegreteria = await Orario.find(
			{ servizio: 'Segreteria' },
			'orari intervallo'
		);
		const orari = getOrariSegreteria(
			orariSegreteria[0].orari,
			orariSegreteria[0].intervallo,
			dataRicerca,
			await getPrenotazioniSegreteria(dataRicerca)
		);
		/* orari.forEach((orario) => {
			orario.numPazienti = 3;
		}); */
		res.json({
			orari
		});
	},






	async provaQuery(req, res, next) {
		// **************** SOLO PER TESTARE QUERY
		const newPrenotazione = {
				paziente: req.user.idRef._id,
				servizio: 'Segreteria',
				dataPrenotazione: new Date(
					'2021-01-20T10:45:00'
				),
				motivazione: ''
			};
		// await Prenotazione.create(newPrenotazione)
		req.query.aggregate;
		if (req.query.find == 1) {
			console.log(await Paziente.find(JSON.parse(req.query.query)));
			res.status(200).send('OK.');
		} else if (req.query.aggregate == 1) {
			var risultato=await Prenotazione.aggregate(
				[
				{$match: {
						servizio:'Segreteria',
						dataPrenotazione:{
							$gte:new Date('2021-01-20T00:00:00'),
							$lt:new Date('2021-01-21T00:00:00')
						}
					}
				}, 
				{$group: {
						_id:{$dateToString: { format: "%H:%M", date: "$dataPrenotazione", timezone:"+01:00" }},
						numPazienti: {
							$sum: 1
						}
					}
				},
				{$project: {
						_id:0,
						'ora':"$_id",
						numPazienti:1
					}
				}
				]);
/* [{$match:{servizio:'Segreteria',dataPrenotazione:{$gte:new Date('2021-01-20'), $lt:new Date('2021-01-21')}}},{ $group: { _id: 'dataPrenotazione', count: {$sum:1} } }] */
			console.log(
				'aggregate ' + JSON.stringify(risultato));
			res.status(200).send('OK.');
		} else {
			console.log('find: ' + req.query.find);
			res.status(404).send('Pagina non trovata.');
		}
	}
};
