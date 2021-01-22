const Prenotazione = require('../models/prenotazione');
module.exports={
    async getPrenotazioni(req,res,next){
        dataRicevuta=req.body.data.split('-');
        const data=new Date(`${dataRicevuta[2]}-${dataRicevuta[1]}-${dataRicevuta[0]}T00:00:00`);
        var data2=new Date(data);
        data2.setDate(data2.getDate()+1);
        const prenotazioniRisultati =await Prenotazione.find({
            medico: '5fde4c4322ab894cdcffcaf1',//req.user.idRef._id,
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