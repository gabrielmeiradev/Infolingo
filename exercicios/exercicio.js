const questionOption = document.querySelector(".question-options");
const questionText = document.querySelector(".question-answer-text");
const questionTitle = document.querySelector(".question-title");
const correctAnswerAreaA = document.querySelector("#question-answer-correct");
const questions = 
[
        {
                questionTitle: "<strong>Caps lock</strong> permite que os usuários digitem letras maiúsculas",
                rightAnswer: 'Caps lock allows users to generate letters in uppercase',
                words: 'users letters in to allows generate uppercase lock Caps'.split(' ')
        },
        {
                questionTitle: "Te enviei os <strong>documentos</strong>, basta extrair os arquivos",
                rightAnswer: 'I sent you the docs just extract the files',
                words: 'you docs just I extract the sent the files'.split(' ')
        },
        {
                questionTitle: "Meu celular antigo apresenta falhas no sistema, <strong>trava</strong> muito.",
                rightAnswer: 'My old cell phone has system failures crashes a lot',
                words: 'system old has a lot cell phone My failures crashes'.split(' ')
        },
        {
                questionTitle: "Há fotos e videos com alta resolução em meu <strong>display</strong>",
                rightAnswer: 'There is high resolution photos and videos on my display',
                words: 'high resolution videos There is my on display and photos'.split(' ')
        },
        {
                questionTitle: "Eu fiz um S.O e está com uma <strong>falha</strong>",
                rightAnswer: 'I built an O.S and it has a bug',
                words: 'O.S has bug a I built and it an'.split(' ')
        
        },
        {
                questionTitle: "No CSS é possível alterar o sombreamento das <strong>bordas</strong>",
                rightAnswer: 'In CSS it is possible to change the edge shading',
                words: 'CSS it to change is In shading edge the possible'.split(' ')
        },
        {
                questionTitle: "<strong>Diretório</strong> é uma estrutura de organização de arquivos",
                rightAnswer: 'Directory is a file organization structure',
                words: 'file Directory a is organization structure'.split(' ')
        
        },
        {
                questionTitle: "Toque no <strong>campo</strong> de dados de velocidade para abrir o computador de viagem",
                rightAnswer: 'Tap the speed data field to open the trip computer',
                words: 'Tap data trip field the computer open to the speed'.split(' ')
        },
        {
                questionTitle: "A grandeza computacional mais conhecida do mundo: <strong>BYTE</strong>",
                rightAnswer: "The world's best-known computing greatness: BYTE",
                words: "greatness: world's BYTE The best-known computing".split(' ')
        },
        {
                questionTitle: "Estou testando um <strong>compilador</strong> para os códigos em Java",
                rightAnswer: "I am testing a compiler for Java codes",
                words: 'testing Java am a compiler I for codes'.split(' ')
        },
        {
                questionTitle: "O <strong>'DOS'</strong> ajuda a CPU a se comunicar com os demais hardwares.",
                rightAnswer: "DOS helps the CPU to communicate with other hardwares",
                words: 'DOS to other hardwares with communicate helps CPU the'.split(' ')
        }
];

let currentlevel = 0;
let currentWord = [];
let currentLevelArr;


function loadQuestion() {
    questionTitle.innerHTML = questions[currentlevel].questionTitle;
}

function main() {
    currentLevelArrUpdate();
    removeLetters();
    loadQuestion();
    writeLetters();
}
function currentLevelArrUpdate(){
    currentLevelArr = questions[currentlevel];
}

let streak = 0;

function win(){
    if(currentlevel == questions.length-1){
        return true;
    }
    return false
}

// Checa se a variável currentWord tem o mesmo valor do da array
let acertosElement = document.querySelector(".acertos");
let todosElement = document.querySelector(".todos");
let winWindow = document.querySelector('.win-window');
let porcentagemElement = document.querySelector('.porcento');
function submit() {
    if(win()){
		streak+=1;
        porcentagemElement.innerHTML = Math.floor(100/questions.length*streak) + "%";
        todosElement.innerHTML = questions.length;
        acertosElement.innerHTML = streak;
        winWindow.style.display = "flex";
        winWindow.className = 'win-window animate__animated animate__lightSpeedInRight';
    }
    else{
        if (currentWord.join(' ') == currentLevelArr.rightAnswer) {
            streak += 1;
            currentlevel += 1; 
            main();
        }
        else{
			console.log("Errou na " + currentlevel);
            currentlevel += 1;
            main();
        }
        currentLevelArrUpdate();

    }
}

function skip(){
    if(currentlevel >= questions.length-1){
        currentlevel = questions.length-1;
    }
    else{
        currentlevel += 1;
    } 
    main();
}

// Remove as classes question-option da classe questions-options
function removeLetters() {
    currentWord = [];
    let questionOptions = document.querySelectorAll('.question-option');
    for (var i = 0; i <= questionOptions.length - 1; i++) {
        let element = questionOptions[i];
        element.remove();
    }
    currentLevelArrUpdate();
    clearWords();
}


// Escreve as letras na class questions-options
function writeLetters() {
    for (var i = 0; i <= currentLevelArr.words.length - 1; i++) {
        let element = document.createElement('div');
        element.innerHTML = `<p>${questions[currentlevel].words[i]}</p>`;
        element.className = 'question-option';
        questionOption.appendChild(element);
        element.id = `p${i}`;
        element.onclick = () => {
            let arrayQ = element.id.split('');
            pushWord(arrayQ[1]);
        };
    }
    currentLevelArrUpdate();

    correctAnswerAreaA.innerHTML = `<strong>Correct answer: </strong> ${questions[currentlevel].rightAnswer}`;
}

// Checa se uma classe existe no elemento
function checkClasses(element, classNameP) {
    let b;
    for (var i = 0; i <= element.classList.length - 1; i++) {
        if (element.classList[i] == classNameP) {
            b = true;
        }
    }
    currentLevelArrUpdate();
    return b;
}

// Checa se um valor existe na array e onde ele está
function spliceSome(arr, some) {
    let index;
    for (var i = 0; i <= arr.length - 1; i++) {
        if (arr[i] == some) {
            index = i;
        }
    }
    currentLevelArrUpdate();
    arr.splice(index, 1)
    console.log(index);
}

// Mexe com as tags somente, não na array
function pushWord(word) {
    let currentWordElement = document.querySelector(`#p${word}`);
    let currentWordElementP = document.querySelector(`#p${word}>p`);
    console.log(currentWordElementP.innerHTML)
    if (checkClasses(currentWordElement, 'disable-card')) {
        spliceSome(currentWord, currentWordElementP.innerHTML);
        wordAble(word);
    } else {
        currentWord.push(currentWordElementP.innerHTML);
        wordDisable(word);
    }
    currentLevelArrUpdate();
    showWord();
}



// Tratamento de palavras

// Tira a class disable-card da question-option referente
function wordAble(word) {
    let wword = document.querySelector(`#p${word}`);
    wword.className = 'question-option';
}

// Adiciona a class disable-card na question-option referente
function wordDisable(word) {
    let wword = document.querySelector(`#p${word}`);
    wword.className = 'question-option disable-card';
}

// Limpa a array currentWord e tira a class disable-card de todas as questions-options
function clearWords() {
    currentWord = [];
    let questionOptions = document.querySelectorAll('.question-option');
    questionOptions.forEach(element => {
        element.className = 'question-option';
    });

    showWord();
}

// Mostra a palavra sendo digitada pelos cards selecionados
function showWord() {
    let questionTextText = '';
    for (var i = 0; i <= currentWord.length - 1; i++) {
        questionTextText += `${currentWord[i]} `;
        console.log(currentWord[i])
    }
    questionText.innerHTML = questionTextText;
    currentLevelArrUpdate();
}

function backQuestion(){
    if(currentlevel == 0){
        history.back();
    }
    else{
        currentlevel--;
        main();
    }
}