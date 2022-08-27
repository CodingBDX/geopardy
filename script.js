const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

const jeopardyCategories = [
    {
        genre: "who",
        questions: [
            {
                question: "who write harry potter",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "easy"
            },
            {
                question: "who write harry potter",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "medium"
            },
            {
                question: "who write harry potter",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "hard"
            },
        ]
    },
    {
        genre: "where",
        questions: [
{
                question: "Dans quel balise HTML plaçons-nous le code JavaScript?",
                answer: ["La balise javascript", "La balise js"],
                correct: "La balise javascript",
                level: "easy"
            },
            {
                question: "who write lord of the ring",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "medium"
            },
            {
                question: "who write harry potter",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "hard"
            },
{
                question: "who write harry potter",
                answer: ["jr rolin", "JKK tolkien"],
                correct: "jr rolin",
                level: "hardest"
            },
        ]
    },
]

let score = 0 ;

function addCategory(category){
    const column = document.createElement('div');
    column.classList.add('genre-column');

    const genreTitle = document.createElement('div');
    genreTitle.classList.add('genre-title');
    
    genreTitle.innerHTML = category.genre;
    
    column.appendChild(genreTitle)
    game.append(column);
    
    category.questions.forEach(question => {
        // const flipDisplay = document.createElement('div');
        const card = document.createElement('div');
        card.classList.add('card-flip');
        card.classList.add('card');
        column.append(card);
        

        // if (question.level === 'easy') {
        //     card.innerHTML = 100;
        // }

        // if (question.level === 'medium') {
        //     card.innerHTML = 200;
        // }

        // if (question.level === 'hard') {
        //     card.innerHTML = 300;
        // }
        switch (question.level) {
            case 'easy':
               card.innerHTML = 100 + '$'
                break;
         case 'medium':
               card.innerHTML = 200 + '$'
                break;
             case 'hard':
               card.innerHTML = 300 + '$'
                break;
                 case 'hardest':
               card.innerHTML = 400 + '$'
                break;
        }
        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answer[0])
        card.setAttribute('data-answer-2', question.answer[1])


        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value',card.innerHTML + '$')


        card.addEventListener('click', flipCard)
        
    })
}


jeopardyCategories.forEach(category => addCategory(category));

function flipCard() {
    this.innerHTML = "";
    this.style.fontSize = "16px";
    this.style.lineHeight = "22px";

    const textDisplay = document.createElement('div');
    textDisplay.classList.add('card-text');

    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button');
    const secondButton = document.createElement('button');

    firstButton.classList.add('first-button');
    secondButton.classList.add('second-button');

    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')

    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)

    this.append(textDisplay, firstButton, secondButton);


    const allCards = Array.from(document.querySelectorAll('.card'));

    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click', flipCard));

   const cardOfButton = this.parentElement;

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {

       score =  score + parseInt(cardOfButton.getAttribute('data-value')) 
        scoreDisplay.innerHTML = score + '$';
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
                
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
        },100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
                
            }
            cardOfButton.innerHTML = 0;
            
        }, 100);
    }
    cardOfButton.removeEventListener('click', flipCard);   
}


