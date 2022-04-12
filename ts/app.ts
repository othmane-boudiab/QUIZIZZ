// let msg:string = "Hello World";
// alert(msg);
let questions:HTMLElement = document.querySelector(".questions");

function getQuestion() {
    let myRequest:any = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            let myData: string = JSON.parse(myRequest.responseText);
            console.log(myData[0]);
            
            addQuestion(myData);
        }
    };
    myRequest.open("GET", "api/premier.json", true);
    myRequest.send();
}

function addQuestion(myData):void {
    myData.forEach((element) => {
        questions.innerHTML += `
        <div class="block">
            <p class="block_title">${element.title}</p>
            <div class="block_answer">
                <input type="radio" id="answer" name="questions"  checked>
                <label for="answer" class="">${element.answer}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="answer_1" name="questions">
                <label for="answer_1" class="">${element.answer_1}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="answer_2" name="questions">
                <label for="answer_2" class="">${element.answer_2}</label>
            </div>
            <div class="block_answer">
                <input type="radio" id="answer_3" name="questions">
                <label for="answer_3" class="">${element.answer_3}</label>
            </div>
        </div>`;

        
        
    });
}

getQuestion();

// class Question {
//     constructor(public question:string, public answer:string) 
//     {
//         this.question = question;
//         this.answer = answer;
//     }
// }
