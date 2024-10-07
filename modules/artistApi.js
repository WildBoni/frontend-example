import { apiUrl } from "./constants.js";

// prendo le informazioni di tutti i prodotti
async function getArtists() {
  let res = await fetch(`${apiUrl}`);
  let data = await res.json();
  return data;
  // lo stesso codice con then
  // return fetch(`${apiUrl}`)
  //   .then(res => res.json())
  //   .then(data => data.artists)
}

// prendo le informazioni di un singolo artista
function getArtistById(id) {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
}

// creo un nuovo artista
function createArtist(artistDetails) {
  return fetch(`${apiUrl}`, {
    method: "POST",
    body: artistDetails,
  }).then((res) => res.json());
}

// modifico un artista
function editArtist(id, artistDetails) {
  // trasformo in JSON le informazioni che arrivano dal form
  let updatedartist = JSON.stringify(artistDetails);

  return fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    // metto una header in cui specifico che invio in formato JSON
    headers: {
      "Content-Type": "application/json",
    },
    body: updatedartist,
  }).then((res) => res.json());
}

// cancello un artista
function deleteArtist(id) {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export { getArtists, getArtistById, createArtist, deleteArtist, editArtist };
