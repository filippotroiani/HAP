const orariSegreteria = {
		orari:
			'09:00-13:00/15:00-19:00;09:00-13:00/15:00-19:00;09:00-13:00/15:00-19:00;09:00-13:00/15:00-19:00;09:00-13:00/15:00-19:00;/;/',
		intervallo: 15,
		descrizione: 'Orari Segreteria',
		tipo: 'Ordinari',
		servizio: 'Segreteria',
		medico: null,
		inizioValidità: new Date('2020-11-18')
	},
	orariMedico1 = {
		orari:
			'08:00-12:30/15:00-17:00;08:00-11:00/15:00-19:00;10:00-12:30/15:00-19:00;08:00-12:30/;08:00-12:30/15:00-18:00;/;/',
		intervallo: 15,
		descrizione: 'Orari visite Dott. Contini',
		tipo: 'Ordinari',
		servizio: 'Medico',
		medico: '5fde4c4322ab894cdcffcaf1',
		inizioValidità: new Date('2020-11-18')
	},
	orariMedico2 = {
		orari:
			'/15:00-19:00;08:30-12:30/15:00-17:00;08:30-12:30/;09:00-12:30/15:00-17:30;09:00-12:00/15:00-18:00;/;/',
		intervallo: 15,
		descrizione: 'Orari visite Dott.ssa Nardi',
		tipo: 'Ordinari',
		servizio: 'Medico',
		medico: '5fde4d0122ab894cdcffcaf3',
		inizioValidità: new Date('2020-11-18')
	};
