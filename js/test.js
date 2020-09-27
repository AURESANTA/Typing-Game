    // DECLARATION DES VARIABLES
 
    let globaltimer = 60
    let timer = 10
    let wordInArray = ""
    let currentWord = document.getElementById("currentword")
    let time = document.getElementById("wordtime")
    let score = 0
    let scorepoint = document.getElementById("point")
    let totaltime = document.getElementById("totaltime")
    let comment = document.getElementById("comment")
    let fail = document.getElementById("fail")
    let testscore = document.getElementById("testscore")
    let ladderboard = document.getElementById("ladderboard")
    let firstSet = false

    let timerGame =  setInterval(() => {
        startPlay()
    }, 11000);
    
    let wordsArray = []
    let usersArray = []

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
        timer = 10
        scorepoint.innerHTML = ""
        let writescore = document.createTextNode("Score actuel : " + score)
        scorepoint.appendChild(writescore)
        playbutton.style.display = 'none' 
    }

    const resetWord = () => {
            startPlay()
            timerGame  
    } 

    const compareWord = (firstWord, secondWord) => {
        return firstWord === secondWord
    }

    const totaltimer = setInterval(() => {
        totaltime.innerHTML = "Temps Total : "
        let writetotaltime = document.createTextNode(globaltimer)
        totaltime.appendChild(writetotaltime)
        globaltimer -= 1
        if (globaltimer == 0) {
            GameOver()
        }
    }, 1000)

    const wordtimer = setInterval(() => {
        time.innerHTML = "Mot suivant dans : "
        let writetime = document.createTextNode(timer)
        time.appendChild(writetime)
        timer -= 1
        if (timer == 0) {
            GameOver()
        }
    }, 1000)

    const ScoreComments = () => {
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
    }

    const GameOver = () => {
        clearInterval(timerGame)
                clearInterval(wordtimer)
                clearInterval(totaltimer)
                fail.innerHTML = "Raté, clique pour rejouer !"
                comment.innerHTML = ""
                playbutton.style.display = 'block'
                LadderDatas()      
    }

    const LadderDatas = () => {

        let pseudo = window.prompt("TERMINÉ, entrez votre pseudo !", "")

        if (localStorage.getItem('allusers')) {
            usersArray = JSON.parse(localStorage.getItem('allusers'))
        }

        usersArray.push({pseudo:pseudo,score:score})
        usersArray.sort((playerOne, playerTwo) => {
            return parseFloat(playerTwo.score) - parseFloat(playerOne.score)
        })

        localStorage.setItem('allusers' , JSON.stringify(usersArray))

        let listLadderDatas = JSON.parse(localStorage.getItem('allusers'));
        if(listLadderDatas){
            if (listLadderDatas.length > 10) {
                listLadderDatas = listLadderDatas.splice(0, 10);
            }
            listLadderDatas.forEach(data => {
                let leader = document.createElement("div");
                leader.classList.add("ladderstyles");
                leader.innerHTML = data.score + ' - ' + data.pseudo;
                ladderboard.appendChild(leader);
            })
        }
    }

    document.body.addEventListener("keydown", function (e) {
        // Keycode 32 = space
        if (e.keyCode === 32) {
            let input = document.getElementById('text')
            if (compareWord(wordInArray, input.value.trim())) {
                score++
                ScoreComments()
                document.getElementById("text").value = ""
                console.log(timerGame)
                clearInterval(timerGame)
                firstSet = true
                timerGame =  setInterval(() => {
                    startPlay()
                }, 11000);
                resetWord()
            } else {
                GameOver()
            }
        }
    })

    // Par défaut, on lance la fonction au lancement de la page
    startPlay()
    if (firstSet === false) {
        resetWord()
    }
  



  
 


    



