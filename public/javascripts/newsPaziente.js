const newsContainerElement = document.querySelector('.newsContainer');
const form = document.querySelector('#cercaNewsForm');
const searchInput = document.querySelector('#cercaInput');
const errorElement = document.querySelector('.error-message');
const loadMoreElement = document.querySelector('#loadMore');
const getNewsAPI_URL =
	'http://' + document.domain + ':3000/comunicazioni/loadComunicazioni';

let skip = 0;
let limit = 20;
let loading = false;
let finished = false;
let search = '';

document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'complete') {
		initPage();
	}
});

const initPage = () => {
	form.reset();
	listAllNews();
};

document.addEventListener('scroll', () => {
	const rect = loadMoreElement.getBoundingClientRect();
	if (rect.top < window.innerHeight && !loading && !finished) {
		loadMore();
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	listAllNews();
});

function loadMore() {
	skip += limit;
	listAllNews(false);
}

function listAllNews(reset = true) {
	loading = true;
	if (reset) {
		skip = 0;
		finished = false;
		search = searchInput.value;
		newsContainerElement.innerHTML = '';
	}
	if (!finished)
		fetch(`${getNewsAPI_URL}?search=${search}&skip=${skip}&limit=${limit}`)
			.then((response) => response.json())
			.then((listaComunicazioni) => {
				listaComunicazioni.comunicazioni.forEach((comunicazione) => {
					const div = document.createElement('div');

					const header = document.createElement('h3');
					header.textContent = comunicazione.titolo;

					const contents = document.createElement('p');
					contents.textContent =
						comunicazione.testo.substring(0, 140) + '...';

					const date = document.createElement('small');
					date.textContent = comunicazione.data;

					const link = document.createElement('p');
					link.innerHTML = `<a href="/comunicazioni/${comunicazione._id}">mostra</a>`;

					div.appendChild(header);
					div.appendChild(contents);
					div.appendChild(date);
					div.appendChild(link);
					div.setAttribute('class', 'comunicazioni');
					newsContainerElement.appendChild(div);
					loading = false;
				});
				if (!listaComunicazioni.meta.has_more) {
					loadMoreElement.style.visibility = 'hidden';
					finished = true;
				} else {
					loadMoreElement.style.visibility = 'visible';
				}
			});
}