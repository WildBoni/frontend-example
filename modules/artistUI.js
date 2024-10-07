import { backendUrl } from "./constants.js";

// funzione per creare la card dell'artista
function showArtist(artist, container, deleteFn, editFn) {
  // Creo l'elemento article in cui inserire titolo, descrizione, etc.
  let artistContainer = document.createElement("article");

  let artistName = document.createElement("h2");
  artistName.textContent = artist.name;

  let artistImage = document.createElement("img");
  artistImage.src = `${backendUrl}/${artist.image}`;

  let artistDescription = document.createElement("p");
  artistDescription.textContent = artist.description;

  // Pulsante per eliminare l'artista con relativo listener
  let artistDeleteButton = document.createElement("button");
  artistDeleteButton.textContent = "Delete";
  artistDeleteButton.addEventListener("click", () => {
    artistDeleteButton.disabled = true;
    artistDeleteButton.textContent = "Deleting...";
    deleteFn(artist._id);
  });

  // Pulsante per modificare l'artista con relativo listener
  let artistEditButton = document.createElement("button");
  artistEditButton.textContent = "Edit";
  artistEditButton.addEventListener("click", () => {
    editFn(artist._id);
  });

  // assemblo tutti i blocchi dentro a <article>
  artistContainer.append(artistName);
  artistContainer.append(artistImage);
  artistContainer.append(artistDescription);
  artistContainer.append(artistEditButton);
  artistContainer.append(artistDeleteButton);

  // aggiungo l'artista nel contenitore
  container.append(artistContainer);
}

export { showArtist };
