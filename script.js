import createMessage from "./modules/messageUI.js";
import {
  getArtists,
  getArtistById,
  createArtist,
  deleteArtist,
  editArtist,
} from "./modules/artistApi.js";
import { showArtist } from "./modules/artistUI.js";

// Selezioniamo gli elementi del dom
// Contenitore artisti
const artistsContainer = document.querySelector("#artists-container");
// Form di modifica artista e relativo pulsante di submit
const editArtistForm = document.querySelector("#edit-artist-form");
const editArtistFormSubmitButton = editArtistForm.querySelector(
  "#edit-artist-button"
);
const closeEditFormButton = editArtistForm.querySelector(
  "#close-edit-form-button"
);
const loadingState = document.querySelector("#loading-state");
// Form di creazione artista e relativo pulsante di submit
const createArtistForm = document.querySelector("#create-artist-form");
const artistCreateButton = createArtistForm.querySelector("button");
// Contenitore messaggi
const messageContainer = document.querySelector("#message-container");

// Funzione chiamata al caricamento della pagina per popolare l'elenco di artisti
populateArtistsContainer();

// Funzione per recuperare i artisti dal backend
function populateArtistsContainer() {
  // Vado a fare la fetch al backend
  getArtists().then((artists) => {
    if (artists.length > 0) {
      // Quando recupero i artisti dal backend, faccio un loop sul singolo artista
      artists.forEach((artist) => {
        // Creo la card per mostrare i dettagli passando 4 argomenti: le info del artista, il contenitore in cui inserirlo, una funzione per cancellarlo e una per mostrare il form di modifica
        showArtist(
          artist,
          artistsContainer,
          handleDeleteArtist,
          showArtistToEdit
        );
      });
    } else {
      artistsContainer.innerHTML = "<h2>No artists available</h2>";
    }
  });
}

// Listener sul pulsante di invio form creazione nuovo artista
artistCreateButton.addEventListener("click", (e) => {
  // evito il refresh della pagina (comportamento di default del form action)
  e.preventDefault();
  let createdArtistForm = new FormData(createArtistForm);
  // Fetch creazione artista
  createArtist(createdArtistForm).then((data) => {
    // svuoto il form
    createArtistForm.reset();
    // svuoto il contenitore
    artistsContainer.innerHTML = "";
    // recupero nuovamente tutti gli artisti dal backend
    populateArtistsContainer();
    // Messaggio di avviso
    createMessage(
      messageContainer,
      "Artist created!",
      ["show", "success"],
      1500
    );
  });
});

// Listener sul pulsante di invio del form di modifica prodotto
editArtistFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Prelevo i dati dei campi del form e li metto in un oggetto di tipo FormData.
  let editedArtistForm = new FormData(editArtistForm);
  // creo un oggetto vuoto: lo riempirò con i campi del form facendo un ciclo
  let artistUpdate = {};
  // faccio un ciclo su FormData
  editedArtistForm.forEach((value, key) => {
    // riempio artistUpdate
    artistUpdate[key] = value;
  });
  // Fetch per modificare il prodotto a database
  editArtist(artistUpdate.artistId, artistUpdate).then((data) => {
    // nascondo il form di editing
    hideArtistToEditForm();
    // svuoto il contenitore
    artistsContainer.innerHTML = "";
    // recupero nuovamente tutti prodotti dal backend
    populateArtistsContainer();
    // Messaggio di avviso
    createMessage(
      messageContainer,
      "artist updated!",
      ["show", "success"],
      1500
    );
  });
});

closeEditFormButton.addEventListener("click", () => {
  // nascondo il form di editing
  hideArtistToEditForm();
});

// Funzione per nascondere il form di modifica di un prodotto
function hideArtistToEditForm() {
  editArtistForm.style.display = "none";
}

// Funzione per gestire la cancellazione di un prodotto
function handleDeleteArtist(id) {
  // Fetch eliminazione prodotto
  deleteArtist(id).then((data) => {
    // svuoto il contenitore
    artistsContainer.innerHTML = "";
    // recupero nuovamente tutti prodotti dal backend
    populateArtistsContainer();
    createMessage(messageContainer, data.message, ["show", "success"], 1500);
  });
}

// Funzione per mostrare il form di modifica di un prodotto
function showArtistToEdit(id) {
  // mostriamo il loading state
  loadingState.style.display = "block";
  // Facciamo una fetch delle info del prodotto
  getArtistById(id)
    .then((artist) => {
      loadingState.style.display = "none";
      // Quando abbiamo le info, mostriamo il form
      editArtistForm.style.display = "block";
      // Riempiamo il form con le informazioni del prodotto
      editArtistForm.querySelector('[name="artistId"]').value = artist._id;
      editArtistForm.querySelector('[name="name"]').value = artist.name;
      editArtistForm.querySelector('[name="description"]').value =
        artist.description;
      editArtistForm.querySelector('[name="category"]').value = artist.category;
    })
    .catch((err) => {
      console.dir(err);
    });
}
