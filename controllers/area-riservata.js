const Prenotazione = require('../models/prenotazione');
module.exports={
    indexAreaRiservata(req,res,next){
        if(req.user.idRef.ruolo==='Medico') res.redirect('/area-riservata/medico/prenotazioni');
        else if(req.user.idRef.ruolo==='Segreteria') res.redirect('/area-riservata/segreteria/prenotazioni');
        else res.redirect('/');
    },
    async getPrenotazioni(req,res,next){
        if(typeof req.query.data=='undefined') {
            var data=new Date();
            data.setHours(3);
            data.setMinutes(0);
        }else{
            var dataRicevuta=req.query.data.split('-'); 
            var data=new Date(`${req.query.data}T03:00:00`)//`${dataRicevuta[2]}-${dataRicevuta[1]}-${dataRicevuta[0]}T03:00:00`);
        }
        var data2=new Date(data);
        data2.setDate(data2.getDate()+1);
        const prenotazioniRisultati =await Prenotazione.find({
            medico: req.user.idRef._id,
            dataPrenotazione:{$gte:data,$lt:data2}
        }).populate('paziente');
        var prenotazioni = prenotazioniRisultati.map((prenotazione) => {
			var tmpPrenotazione = prenotazione.toObject();
			tmpPrenotazione.ora = `${(tmpPrenotazione.dataPrenotazione.getHours() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getHours()}:${(tmpPrenotazione.dataPrenotazione.getMinutes() < 10 ? '0' : '') + tmpPrenotazione.dataPrenotazione.getMinutes()}`;
			return tmpPrenotazione;
        });
        res.render('area-riservata/medico/prenotazioni',{title:'Prenotazioni - HAP', prenotazioni,data});
    }
};