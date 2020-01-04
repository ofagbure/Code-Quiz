var questions = [
    {
        title: "What is the most basic language used to create a web page?",
        choices: ["html", "css", "javascript", "jquery"],
        answer: "html"
    },
    {
        title: "In order to add style to a page, one must use ...",
        choices: ["html", "booleans", "css", "c++"],
        answer: "css"
    },
    {
        title: "An example of a css framework is ...",
        choices: ["strings", "jquery", "bootstrap", "bootcampspot"],
        answer: "bootstrap"
    },
    {
        title: "Javascript is used to add character to a page and make it do more fun things",
        choices: ["true", "false"],
        answer: "true"
    },
    {
        title: "An example of a javascript framework is ...",
        choices: ["strings", "jquery", "bootstrap", "bootcampspot"],
        answer: "jquery"
    },
    {
        title: "In order to change an object on a page without changing the html, we use ...",
        choices: ["DOM", "True/False Statements", "css", "code"],
        answer: "DOM"
    },
    {
        title: "A website will NOT work without Javascript",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        title: "A website with ONLY HTML is flat and boring",
        choices: ["true", "false"],
        answer: "true"
    },
    {
        title: "Where in your html do you put links to external css or javascript files?",
        choices: ["body", "shoulder", "footer", "head"],
        answer: "head"
    },
    {
        title: "(Trick Question) Coding is FUN!",
        choices: ["true", "false"],
        answer: "false"
    }
];

$(document).ready(function () {
    var sec = 600;
    let currentQuestion = 0;
    var time;


    function renderQuestion(arr) {
        if (currentQuestion >= questions.length) {
            return console.log("chicken")
        }
        var P = $("<p>")
        var pClass = P.addClass("list-group-item list-group-item-success")
        var pClassText = pClass.text(arr[currentQuestion].title);
        div_questions.append(pClassText)

        for (let i = 0; i < arr[currentQuestion].choices.length; i++) {

            var B = $("<button>")
            var bClass = B.addClass("list-group-item list-group-item-action")
            var bClassText = bClass.text(arr[currentQuestion].choices[i]);
            $(B).attr('data-answer', arr[currentQuestion].choices[i]);
            div_questions.append(bClassText)
            $("#card-questions").append(div_questions);

            $(B).click(function () {
                var userAnswer = $(this).attr("data-answer");
                console.log(userAnswer)
                console.log(arr[currentQuestion].answer)
                console.log(currentQuestion)
                if (userAnswer === arr[currentQuestion].answer) {
                    alert("Correct!")
                    // // move to next question 
                } else {
                    alert("Incorrect")
                    // move to next question 
                    sec -= 15;
                }
                $(div_questions).empty();

                currentQuestion++
                renderQuestion(questions)
            })
        }
    }

    function myTimer() {
        $("#timer-display").text(sec + " seconds left");
        sec--;
        if (sec === -1) {
            clearInterval(time);
            alert("Time's up! You lose")
        }
    }

    var div_questions = $("<div>", "list-group");

    $(".btn-primary").click(function () {
        console.log('clicked')
        time = setInterval(myTimer, 1000)
        // Hide opening text
        $(".card-body").hide();
        renderQuestion(questions)

    });
});

var highscores
// store high scores to local storage