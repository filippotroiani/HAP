const Prenotazione = require('../models/prenotazione');
const Paziente = require('../models/paziente');
const Staff = require('../models/staff');
module.exports={
    indexAreaRiservata(req,res,next){
        if(req.user.idRef.ruolo==='Medico') res.redirect('/area-riservata/medico/prenotazioni');
        else if(req.user.idRef.ruolo==='Segreteria') res.redirect('/area-riservata/segreteria/prenotazioni');
        else res.redirect('/');
    },
    async getPrenotazioniMedico(req,res,next){
        if(typeof req.query.data=='undefined') {
            var data=new Date();
            data.setHours(3);
            data.setMinutes(0);
        }else{
            //var dataRicevuta=req.query.data.split('-'); 
            var data=new Date(`${req.query.data}T03:00:00`)//`${dataRicevuta[2]}-${dataRicevuta[1]}-${dataRicevuta[0]}T03:00:00`);
        }
        var data2=new Date(data);
        data2.setDate(data2.getDate()+1);
        const prenotazioniRisultati =await Prenotazione.find({
            medico: req.user.idRef._id,
            dataPrenotazione:{$gte:data,$lt:data2}
        },null,{sort:{ dataPrenotazione: 1 }}).populate('paziente');
        var prenotazioni = prenotazioniRisultati.map((prenotazione) => {
			var tmpPrenotazione = prenotazione.toObject();
			tmpPrenotazione.ora = `${(tmpPrenotazione.dataPrenotazione.getHours() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getHours()}:${(tmpPrenotazione.dataPrenotazione.getMinutes() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getMinutes()}`;
			return tmpPrenotazione;
        });
        res.render('area-riservata/medico/prenotazioni',{title:'Prenotazioni - HAP', prenotazioni,data});
    },
    async getPazientiMedico(req,res,next){
        const pazienti =await Paziente.find({
            medico: req.user.idRef._id,
        },null,{ sort: { cognome: 1, nome: 1 } });
        res.render('area-riservata/medico/lista-pazienti',{title:'Lista pazienti - Medico - HAP', pazienti});
    },
    async getPrenotazioniSegreteria(req,res,next){
        const medici= await Staff.find({ruolo:'Medico'},'_id cognome nome',{sort:{cognome:1,nome:1}});
        if(typeof req.query.medico=='undefined') var ricercaMedico=medici[0]._id;
        else var ricercaMedico=req.query.medico;
        if(typeof req.query.data=='undefined') {
            var data=new Date();
            data.setHours(3);
            data.setMinutes(0);
        }else{
            //var dataRicevuta=req.query.data.split('-'); 
            var data=new Date(`${req.query.data}T03:00:00`)//`${dataRicevuta[2]}-${dataRicevuta[1]}-${dataRicevuta[0]}T03:00:00`);
        }
        var data2=new Date(data);
        data2.setDate(data2.getDate()+1);
        const prenotazioniRisultati =await Prenotazione.find({
            medico: ricercaMedico,
            dataPrenotazione:{$gte:data,$lt:data2}
        },null,{sort:{ dataPrenotazione: 1 }}).populate('paziente');
        var prenotazioni = prenotazioniRisultati.map((prenotazione) => {
			var tmpPrenotazione = prenotazione.toObject();
			tmpPrenotazione.ora = `${(tmpPrenotazione.dataPrenotazione.getHours() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getHours()}:${(tmpPrenotazione.dataPrenotazione.getMinutes() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getMinutes()}`;
			return tmpPrenotazione;
        });
        res.render('area-riservata/segreteria/prenotazioni',{title:'Prenotazioni - HAP', medici, prenotazioni, ricercaMedico, data});
    },
    async newPrenotazioneSegreteria(req,res,next){
        res.render('area-riservata/segreteria/aggiungi-prenotazione', { title:'Nuova Prenotazione - Segreteria - HAP'});
    },
    async createPrenotazioneSegreteria(req,res,next){
        if (typeof req.body=='undefined') {
			req.session.error = `Inserisci correttamente i dati`;
			res.redirect('/area-riservata/segreteria/aggiungi-prenotazione');
		} else {
			const newPrenotazione = {
				paziente: req.body.prenotazione.paziente,
				servizio: 'Medico',
				medico: req.body.prenotazione.medico,
				dataPrenotazione: new Date(
					req.body.prenotazione.data + 'T' + req.body.prenotazione.ora + ':00'
				),
				motivazione: req.body.prenotazione.motivazione || ''
			};
			await Prenotazione.create(newPrenotazione);
			req.session.success = 'Prenotazione creata con successo.';
			res.redirect('/');
		}
    },
    async getPazientiSegreteria(req,res,next){
        const pazienti =await Paziente.find({
            medico: req.query.medico,
        }, 'cognome nome dataNascita', { sort: { cognome: 1, nome: 1 } });
        res.render('area-riservata/segreteria/lista-pazienti', { title:'Lista pazienti - Segreteria - HAP', pazienti });
    },
    async getIndicazioniSegreteria(req,res,next){
        res.redirect('/prenotazioni/segreteria');
    }



};