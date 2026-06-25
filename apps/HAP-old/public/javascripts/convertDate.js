function convertDate(d) {
	const data = new Date(d);
	return `${(data.getDate() < 10 ? '0' : '') + data.getDate()}-${
		(data.getMonth() < 10 ? '0' : '') + (data.getMonth() + 1)
	}-${data.getFullYear()} ${
		(data.getHours() < 10 ? '0' : '') + data.getHours()
	}:${(data.getMinutes() < 10 ? '0' : '') + data.getMinutes()}`;
}
