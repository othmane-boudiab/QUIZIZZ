// let msg:string = "Hello World";
// alert(msg);
let questions = document.querySelector(".questions");
function getQuestion() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            let myData = JSON.parse(myRequest.responseText);
            console.log(myData[0]);
            addQuestion(myData);
        }
    };
    myRequest.open("GET", "api/premier.json", true);
    myRequest.send();
}
function addQuestion(myData) {
    myData.forEach((element) => {
        questions.innerHTML += `
        <div class="block">
            <p class="block_title">${element.title}</p>
            <div class="block_answer">
                <input type="radio" class="answer" name="questions"  checked>
                <label  class="">${element.answer}</label>
            </div>
            <div class="block_answer">
                <input type="radio" class="answer" name="questions">
                <label class="">${element.answer_1}</label>
            </div>
            <div class="block_answer">
                <input type="radio" class="answer" name="questions">
                <label  class="">${element.answer_2}</label>
            </div>
            <div class="block_answer">
                <input type="radio" class="answer" name="questions">
                <label class="">${element.answer_3}</label>
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
