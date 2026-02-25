const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyXO9_mJNI-5UL_eBLoVahYXMG3asmUK-TkpWgANnmlnSupOFRQ4D3pABrr_rtXXmDzvQ/exec";

// ================= INDEX PAGE LOGIN LOGIC =================
function startQuiz() {
    var email = document.getElementById("email").value.trim();
    var code = document.getElementById("code").value.trim();
    var message = document.getElementById("message");

    // Basic validation
    if (email === "" || code === "") {
        message.innerHTML = "Please enter Email and Participant Code";
        return;
    }

    // ===== QUIZ TIME SETTINGS =====
    // Change these for your real event
    var startHour = 0; // testing mode 24h
    var endHour = 23;

    var now = new Date();
    var currentHour = now.getHours();

    // Before start
    if (currentHour < startHour) {
        message.innerHTML = "Quiz will start at 2:00 PM";
        return;
    }

    // After end
    if (currentHour >= endHour) {
        message.innerHTML = "Quiz time is over";
        return;
    }

    // If within time → go to quiz page
    window.location.href = "quiz.html?email=" + encodeURIComponent(email) + "&code=" + encodeURIComponent(code);
}

// ================= QUIZ PAGE LOGIC =================

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuizPage() {
    if (!document.getElementById("question")) return; // Only run on quiz.html
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        // Quiz finished
        document.body.innerHTML = `
<div class="final-message">
    <h2>Thank you for participating!</h2>
    <p>Your result will be posted on our YouTube channel.</p>
    <p>If you are selected for Round 2, you will receive an email.</p>
    <p>Junior Quiz Team</p>
</div>
`;
        return;
    }

    // Reset timer
    timeLeft = 15;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    // Load question
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    // Update counter
    document.getElementById("counter").innerText =
        "Question " + (currentQuestion + 1) + "/" + questions.length;

    // Load options
    let optionsHtml = "";
    q.options.forEach((opt, index) => {
        optionsHtml += `<button class="option" onclick="selectAnswer(${index})">${opt}</button>`;
    });
    document.getElementById("options").innerHTML = optionsHtml;

    // Start timer
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(index) {
    clearInterval(timer);
    if (index === questions[currentQuestion].answer) {
        score++; // Score kept internally
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}
async function startQuiz() {
    const email = document.getElementById("email").value.trim();
    const code = document.getElementById("code").value.trim();
    const message = document.getElementById("message");

    if (!email || !code) {
        message.innerText = "Please enter Email and Code";
        return;
    }

    try {
        const res = await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                email: email,
                code: code
            })
        });

        const data = await res.json();

        if (data.status === "valid") {
            localStorage.setItem("email", email);
            localStorage.setItem("code", code);
            window.location.href = "quiz.html";
        } 
        else if (data.status === "blocked") {
            message.innerText = "You are blocked.";
        } 
        else {
            message.innerText = "Invalid Email or Code.";
        }

    } catch (err) {
        message.innerText = "Server error.";
        console.log(err);
    }
}
async function sendScore(score) {
    const email = localStorage.getItem("email");
    const code = localStorage.getItem("code");

    if (!email || !code) return;

    try {
        await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "submit",
                email: email,
                code: code,
                score: score
            })
        });
    } catch (e) {
        console.error("Score send failed");
    }
}
