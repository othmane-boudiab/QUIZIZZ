// let msg:string = "Hello World";
// alert(msg);

function getQuestion() {
    let myRequest:any = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            let myData:string = JSON.parse(myRequest.responseText);
            console.log(myData);
            
        }
    };
    myRequest.open("GET", "api/premier.json", true);
    myRequest.send();
}

getQuestion();

// class Question {
//     constructor(public question:string, public answer:string) 
//     {
//         this.question = question;
//         this.answer = answer;
//     }
// }
