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


function renderhighscore() {

    var userArray = localStorage.getItem('userScoresObject');
    console.log(userArray);
    // var scores = $("<li>")
    // var eachScore = $("#scoreform").value + userScore
    // scores.textContent = eachScore
    // scores.setAttribute("data-index", i);
}

$(document).click(".nav-link", function (e) {
    renderhighscore();
})


$(document).ready(function () {
    var sec = 600;
    let currentQuestion = 9;
    var time;
    $(document).on("submit", "#scoreform", function (e) {
        e.preventDefault()
        var userName = e.target.elements[0].value.trim();
        var userObject = { 'name': userName, 'score': sec };
        //get user object in local storage
        var userObjectInStorage = localStorage.getItem('userScoresObject');
        if (userObjectInStorage) {
            //if Array exists get it parse it and push new object
           var usersArray = JSON.parse(userObjectInStorage);
            usersArray.push(userObject);
            localStorage.setItem('userScoresObject', JSON.stringify(usersArray));
        } else {
            //if array does not exist create it in local storage
            localStorage.setItem('userScoresObject', JSON.stringify([userObject]));
        }
    })

    function highscores(arr) {
        var userScore = sec;
        var lastPage = $("<form id = 'scoreform'>")
        var label = $("<label>").text("Congratulations!! You've finished the game! Enter your name below to save your highscore. Your score is " + userScore)
        lastPage.append(label)
        var input = $("<input id = 'userinitials'>")
        var inputClass = input.addClass("form-control")
        lastPage.append(inputClass)
        $("#text").append(lastPage)

    }

    function renderQuestion(arr) {
        if (currentQuestion >= questions.length) {
            clearInterval(time);
            highscores(); 
            return;
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
        time = setInterval(myTimer, 1000)
        // Hide opening text
        $(".card-body").hide();
        renderQuestion(questions)

    });
});


