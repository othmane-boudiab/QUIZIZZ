// let time:HTMLElement = document.querySelector(".time");
let title = document.querySelector(".title");
let questions:HTMLElement = document.querySelector(".questions");
let btn:HTMLElement = document.querySelector(".btn");
let steps = document.querySelectorAll(".steps span");

let countdownInterval:number;

let corectAnswerCount:number = 0;



console.log(title);

let correctAnswers:string[] = [];

let curentIndex = 0;

function getQuestion() :void {
    let myRequest:any = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            let myData: string = JSON.parse(myRequest.responseText);
            addQuestion(myData[curentIndex]);
            checkAnswer(myData[curentIndex]);
        }
    };
    myRequest.open("GET", "api/premier.json", true);
    myRequest.send();
}


function addQuestion(myData):void {
    let count = 0;
    myData.forEach((element) => {
        questions.innerHTML += `
        <div class="block">
            <p class="block_title">${element.title}</p>
            <div class="block_answer">
                <input type="radio" id="${++count}answer" name="questions${++count}" value="${element.answer}"  checked>
                <label for="${count}answer">${element.answer}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="${count}answer_1" name="questions${count}" value="${element.answer_1}">
                <label for="${count}answer_1">${element.answer_1}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="${count}answer_2" name="questions${count}" value="${element.answer_2}">
                <label for="${count}answer_2">${element.answer_2}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="${count}answer_3" name="questions${count}" value="${element.answer_3}">
                <label for="${count}answer_3">${element.answer_3}</label>
            </div>
        </div>`;

        
        
    });
}

getQuestion();



countdown(60*5);


function countdown(timer) :void {

    let minutes;
    let seconds;
    countdownInterval = setInterval(() => {
        minutes = parseInt(timer / 60 + "");
        seconds = parseInt(timer % 60 + "");

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        title.innerHTML = `${minutes}:${seconds}`;
        if (--timer < 0) {
            clearInterval(countdownInterval);
            console.log("Time is over");
            // annimateScore(corectAnswerCount);
            
        }

    }, 1000);
}



function checkAnswer(myData): void {
    let correctAnswers:string[] = [];
        myData.forEach(ele => {
        correctAnswers.push(ele.correct);
    });
    console.log(correctAnswers);
    btn.addEventListener("click", e => {
        e.preventDefault();
        let checkedRadio = document.querySelectorAll('[type="radio"]:checked');
        console.log(checkedRadio);
        checkedRadio.forEach((radio,index) => {
            if(radio.attributes[3].value == correctAnswers[index]) corectAnswerCount +=20;
        });
        if(corectAnswerCount >= 80 && curentIndex === 2 ){
            annimateScore(corectAnswerCount);
        }else if (corectAnswerCount >= 40 && curentIndex === 0){
            console.log(corectAnswerCount);
            curentIndex++;
            questions.innerHTML = "";
            getQuestion();
            steps[curentIndex].classList.add('active');
            // corectAnswerCount = 0;
            // console.log(corectAnswerCount);
            
            // getQuestion();
        }else if (corectAnswerCount >= 60 && curentIndex === 1){
            curentIndex++;
            questions.innerHTML = "";
            getQuestion();
            steps[curentIndex].classList.add('active');
            corectAnswerCount = 0;
            console.log(corectAnswerCount);
            document.querySelector(".score").classList.add('hiding');
        }else if (corectAnswerCount < 40){
            annimateScore(corectAnswerCount);
        }
    });
}

function annimateScore(corectAnswerCount) :void {
    let step = 0;
    scrollTo(0,0);
    document.querySelector(".score").classList.remove('hiding');
        setInterval(() => {
            if(step >= corectAnswerCount){return false;}
            step++;
            document.querySelector(".score_block").querySelector('span').innerText = " "+step+"/300 ";
        }, 50);
}

