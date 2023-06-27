const lista_tweets = document.querySelector("#lista_tweets");
const formulario = document.querySelector("#formulario");
const contenedorPrincipal = document.querySelector("#contenido");

let tweets = [];

iniciarEventos()

function iniciarEventos() {
    formulario.addEventListener('submit', agregarTweet)

    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        mostrarTweets()
    })
}

function agregarTweet(e) {
    e.preventDefault()

    
    const tweet = document.querySelector('#tweet').value.trim();
    if (!tweet) {
        mostrarError("Digita su tweet")
        return;
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    };

    tweets = [...tweets, tweetObj]
    formulario.reset();
    formulario.querySelector("textarea").focus()
    mostrarTweets()
    

}

function mostrarTweets() {
    limpiarHTML();
    if(tweets.length){
        tweets.forEach(tweet=>{
            const btnDelete = document.createElement('a')
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerText = "X";
            btnDelete.onclick = ()=>{
                borrarTweet(tweet.id)
            }

            let tweetHTML = document.createElement('li');
            tweetHTML.innerHTML = tweet.tweet;
            tweetHTML.appendChild(btnDelete)
            lista_tweets.appendChild(tweetHTML);
        });
    }
    setStorage();
}

function borrarTweet(idTweet){
    console.log("borrando...",idTweet);
    let tweetsUpdate = tweets.filter(tweet => tweet.id !== idTweet)
    
    tweets = [...tweetsUpdate];
  
    mostrarTweets();
}

function mostrarError(error) {
    suprimirAlerta(contenedorPrincipal)

    const contentError = document.createElement('p');
    contentError.textContent = error;
    contentError.classList.add("error");

    contenedorPrincipal.appendChild(contentError);
    setTimeout(() => {
        contentError.remove();
    }, 2000)
}

function suprimirAlerta(referencia) {
    const alerta = referencia.querySelector(".error")
    if (alerta) {
        alerta.remove();
    }
}

function limpiarHTML(){
    while (lista_tweets.firstChild) {
        lista_tweets.removeChild(lista_tweets.lastChild);   
    }
}

function setStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets));
}
