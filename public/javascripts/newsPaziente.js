const newsContainerElement = document.querySelector(".newsContainer");
const form = document.querySelector("#cercaNewsForm");
const searchInput=document.querySelector("#cercaInput");
const errorElement = document.querySelector(".error-message");
const loadMoreElement = document.querySelector("#loadMore");
const getNewsAPI_URL = "http://localhost:5000/news";

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;
let search='';

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initPage();
  }
});

const initPage=()=>{
  form.reset();
  listAllNews();
}


document.addEventListener("scroll", () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});



form.addEventListener("submit", (event) => {
  event.preventDefault();
  listAllNews();
});

function loadMore() {
  skip += limit;
  listAllNews(false);
}

function listAllNews(reset = true) {
  //loading = true;
  if (reset) {
    skip = 0;
    finished = false;
    search = searchInput.value;
    newsContainerElement.innerHTML='';
  }
  fetch(`${getNewsAPI_URL}?search=${search}&skip=${skip}&limit=${limit}`)
    .then((response) => response.json())
    .then((listaComunicazioni) => {
      listaComunicazioni.news.forEach((comunicazione) => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = comunicazione.titolo;

        const contents = document.createElement("p");
        contents.textContent = comunicazione.testo;

        const date = document.createElement("small");
        date.textContent = new Date(comunicazione.data);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        newsContainerElement.appendChild(div);
      });
      //loadingElement.style.display = "none";
      if (!listaComunicazioni.meta.has_more) {
        loadMoreElement.style.visibility = "hidden";
        finished = true;
      } else {
        loadMoreElement.style.visibility = "visible";
      }
      //loading = false;
    });
}
