//btn - button

const initBtn = document.querySelector("#initBtn");
const home = document.querySelector(".home");
const search = document.querySelector(".search");
const placeHldr = "./img/capaNaoEncontrada.png"
const infos = {
  method: 'GET'
}

initBtn.addEventListener("click", () => {

  pageSearch()
  search.style.display = "block"
})

function pageSearch() {
  home.style.display = "none"

  const templateSearch = `
    <div class="header">
        <img src="./img/book.png" alt="">
        <button id="returnBtn" >Voltar</button>
        <button class="backBtn">Sair</button>
    </div>
    <input type="text" id="searchInput" placeholder="Busque por Autor, Editora ou Título">
    <button id="searchBook">Buscar</button>
    <div id="searchResult">
    </div>
    <div id="individualBook">
    </div>
    `
  search.innerHTML = templateSearch;

  const backBtn = document.querySelector(".backBtn");
  backBtn.addEventListener("click", () => {
    search.style.display = "none"
    home.style.display = "block"
  })

  const searchResult = document.querySelector("#searchResult");
  const searchInput = document.querySelector("#searchInput");
  const searchBook = document.querySelector("#searchBook");
  const bookLink = "https://www.googleapis.com/books/v1/volumes?q="

  searchBook.addEventListener("click", () => {
    
    searchResult.innerHTML = "";
    
    const book = bookLink + searchInput.value.replace(" ", "-");

    fetch(book, infos)
      .then((response) => response.json())
      .then((json) => {
        searchInput.value= "";
        console.log(json);
        displayResults(json);

        const eachCard = document.querySelectorAll(".eachBook");
        eachCard.forEach((card) => {
          card.addEventListener("click", (e) => {
            showInfos(e)
          })
        });

        const showInfos = (e) => {
          const eachBook = e.target.parentNode;
          fetch(eachBook.id, infos)
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              const imageBoock = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr
              const name = json.volumeInfo.title;
              const author = item.volumeInfo.authors;
              const publisher = item.volumeInfo.publisher;
              const bookRating = item.volumeInfo.categories
              const description = item.volumeInfo.description
              //const isbn = 
              fetch("https://6015b2e155dfbd00174ca812.mockapi.io/api/v1/Livrarias", infos)
                .then((response) => response.json())
                .then((json) => {
                  const individualBook = document.querySelector("#individualBook")
                  mostrarLIvroIndividual(imageBoock,name,author,publisher,bookRating,description,individualBook)
                  console.log(json)
                })
                .catch((erro) => console.log("Erro:" + erro));
            })
            .catch((erro) => console.log("Erro:" + erro));
        }
      })
      .catch((erro) => console.log("Erro:" + erro));
  })
}

function displayResults(response) {
  for (let i = 0; i < response.items.length; i++) {
    item = response.items[i];
    title = item.volumeInfo.title;
    author = item.volumeInfo.authors;
    publisher = item.volumeInfo.publisher;
    bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;
    selfLink = item.selfLink;

    searchResult.innerHTML += formatOutput(title, author, publisher, bookImg, selfLink);
  }
};

function formatOutput(title, author, publisher, bookImg, selfLink) {
  var bookCard = `
  <div class="eachBook" id="${selfLink}">
    <img src="${bookImg}" alt="${title}">
    <div id="${selfLink}">
      <h2>${title}</h2>
      <p>Autor: ${author}</p>
      <p>Editora: ${publisher}</p>
    </div>
  </div>`
  return bookCard;
}
function mostrarLIvroIndividual (imageBoock,name,author,publisher,bookRating,description, individualBook){
  const templateLivroUNico = `
  <h1>${name}</h1>
  <div> 
  <img src="${imageBoock}" alt="${name}">
  <div>
    <p>${author}</p>
    <p>${publisher}</p>
    <p>${bookRating}</p>
  </div>
  </div>
  <div>
    <p>${description}</p>
  </div> 

  `

  individualBook.innerHTML = templateLivroUNico
}
