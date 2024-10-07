// funzione per migliorare l'esperienza utente: mi serve per visualizzare una notifica
function createMessage(element, message, classes = [], timer = 1000) {
  // mostrare un messaggio in un contenitore
  element.textContent = message;

  // posso anche mettere dinamicamente le classi CSS, leggendole dall'array
  if(classes.length > 0) {
    classes.forEach(className => {
      element.classList.add(className);
    })
  }

  //dopo un tot di secondi, il messaggio scompare
  setTimeout(() => {
    classes.forEach(className => {
      element.classList.remove(className);
    })
  }, timer)
}

export default createMessage;