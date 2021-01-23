const Prenotazione = require('../models/prenotazione');
module.exports={
    indexAreaRiservata(req,res,next){
        if(req.user.idRef.ruolo==='Medico') res.redirect('/area-riservata/medico/prenotazioni');
        else if(req.user.idRef.ruolo==='Segreteria') res.redirect('/area-riservata/segreteria/prenotazioni');
        else res.redirect('/');
    },
    async getPrenotazioni(req,res,next){
        if(typeof req.body.data=='undefined') {
            var data=new Date();
            data.setHours(0);
            data.setMinutes(0);
        }else{
            var dataRicevuta=req.body.data.split('-'); 
            var data=new Date(`${dataRicevuta[2]}-${dataRicevuta[1]}-${dataRicevuta[0]}T00:00:00`);
        }
        var data2=new Date(data);
        data2.setDate(data2.getDate()+1);
        const prenotazioniRisultati =await Prenotazione.find({
            medico: req.user.idRef._id,
            dataPrenotazione:{$gte:data,$lt:data2}
        });
        var prenotazioni = prenotazioniRisultati.map((prenotazione) => {
			var tmpPrenotazione = prenotazione.toObject();
			tmpPrenotazione.ora = `${tmpPrenotazione.dataPrenotazione.getHours()}:${tmpPrenotazione.dataPrenotazione.getMinutes()}`;
			return tmpPrenotazione;
		});
        console.log(prenotazioni);
        res.status(302).send('OK.');
    }
};