    // DECLARATION DES VARIABLES
 
    let globaltimer = 0
    let timer = 0
    let wordInArray = ""
    let currentWord = document.getElementById("currentword")
    let time = document.getElementById("wordtime")
    let score = 0
    let scorepoint = document.getElementById("point")
    let totaltime = document.getElementById("totaltime")
    let comment = document.getElementById("comment")
    let fail = document.getElementById("fail")

    // ON REMPLIT LE TABLEAU ET ON GENERE ALEATOIREMENT UN INDEX
    const getWordInArray = () => {
        const wordsArray = [
            "ordinateur",
            "nintendo",
            "sony",
            "microsoft",
            "sega"]
        let targetWord = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[targetWord];
    }


    const startPlay = () => {
        wordInArray = getWordInArray()
        currentWord.innerHTML = ""
        let text = document.createTextNode(wordInArray)
        currentWord.appendChild(text)
        // On remet le timer du mot uniquement à 0 lors de l'appel de la function
        timer = 0
        scorepoint.innerHTML = ""
        let writescore = document.createTextNode("Score actuel : " + score)
        scorepoint.appendChild(writescore)
        // On cache le bouton rejouer par défaut
        playbutton.style.display = 'none'
     
}
    // ON COMPARE LE MOT GENERE ET L'INPUT
    const compareWord = (firstWord, secondWord) => {
        return firstWord === secondWord
    }
    // Gestion du timer global (seul le bouton rejouer le fait reset)
    let totaltimer = setInterval(() => {
        totaltime.innerHTML = "Temps Total : "
        let writetotaltime = document.createTextNode(globaltimer)
        totaltime.appendChild(writetotaltime)
        globaltimer += 1
    }, 1000)
    // Gestion du timer du mot
    let wordtimer = setInterval(() => {
        time.innerHTML = "Mot suivant dans : "
        let writetime = document.createTextNode(timer)
        time.appendChild(writetime)
        timer += 1
    }, 1000)
 
    // Lorsqu'on appuie sur entrée, on entre dans l'event
    document.body.addEventListener("keydown", function (e) {
        // Keycode 13 = entrée
        if (e.keyCode === 13) {
            let input = document.getElementById('text')
            if (compareWord(wordInArray, input.value.trim())) {
                score++
                // Essai de générer un commentaire en fonction du score
                if (score == 3) {
                    comment.innerHTML = "Pas mal !";
                }
                if (score == 5) {
                    comment.innerHTML = "Un vrai pro !"
                }
                if (score == 10) {
                    comment.style.color = "green"
                    comment.innerHTML = "MONSTRUEUX"
                }
              
                document.getElementById("text").value = ""
                startPlay()
            } else {
                clearInterval(timerText)
                clearInterval(wordtimer)
                clearInterval(totaltimer)
                fail.innerHTML = "Raté, clique pour rejouer !"
                comment.innerHTML = ""
                // On affiche le bouton rejouer pour recommencer
                playbutton.style.display = 'block'
            }
        }
    })



    // Par défaut, on lance la fonction au lancement de la page
    startPlay()
    let timerText = setInterval(() => {
        startPlay()
        // Toutes les 10 secondes, le mot reset ainsi que le timer du mot
    }, 10000);

    
