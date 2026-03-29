// 🔐 LOGOUT
function logout(){
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully 👋");
    window.location.href = "login.html";
}

// 📂 SWITCH SECTIONS
function showSection(section){
    let sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(section).style.display = "block";
}

// 📞 CONTACT SCROLL
function goToContact(){
    showSection("contact");
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

// 🧠 QUIZ START
function startQuiz(){
    document.getElementById("quiz").style.display = "block";
    document.getElementById("stream").style.display = "none";
    document.getElementById("result").style.display = "none";
}

// 🎯 STREAM SELECT
function selectStream(){
    document.getElementById("stream").style.display = "block";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "none";
}

// 📊 QUIZ RESULT
function showResult(type){
    let resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    if(type === "tech"){
        resultDiv.innerHTML = `
            <h3>Technology 💻</h3>
            <p>Careers: Software Developer, Data Scientist</p>
            <p>Subjects: Math, Programming</p>
        `;
    } else {
        resultDiv.innerHTML = `
            <h3>Arts 🎨</h3>
            <p>Careers: Designer, Writer</p>
            <p>Subjects: Literature, Creativity</p>
        `;
    }
}

// 📊 STREAM CAREERS
function showStreamCareer(){
    let stream = document.getElementById("streamSelect").value;
    let resultDiv = document.getElementById("result");

    resultDiv.style.display = "block";

    if(stream === "tech"){
        resultDiv.innerHTML = `
            <h3>Technology Careers 💻</h3>
            <p>Software Developer, AI Engineer</p>
            <p>Subjects: Math, Coding</p>
        `;
    }
    else if(stream === "business"){
        resultDiv.innerHTML = `
            <h3>Business Careers 📈</h3>
            <p>Marketing, Entrepreneurship</p>
            <p>Subjects: Economics, Management</p>
        `;
    }
    else{
        resultDiv.innerHTML = `
            <h3>Arts Careers 🎨</h3>
            <p>Designer, Writer</p>
            <p>Subjects: Creativity, Literature</p>
        `;
    }
}

// 🔍 SEARCH CAREER
function searchCareer(){
    let input = document.getElementById("searchInput").value.toLowerCase();

    showSection("search");

    let content = document.getElementById("careerDetailsContent");

    if(input.includes("software")){
        content.innerHTML = `
            <h3>Software Engineer 💻</h3>
            <p>Skills: Coding, Problem Solving</p>
            <p>Subjects: Math, Programming</p>
            <p>Salary: High 💰</p>
            <p>Competition: High ⚔️</p>
        `;
        drawChart([90, 80]);
    }
    else if(input.includes("fashion")){
        content.innerHTML = `
            <h3>Fashion Designer 👗</h3>
            <p>Skills: Creativity, Design</p>
            <p>Subjects: Arts, Design</p>
            <p>Salary: Medium 💰</p>
            <p>Competition: Medium ⚔️</p>
        `;
        drawChart([60, 60]);
    }
    else if(input.includes("doctor")){
        content.innerHTML = `
            <h3>Doctor 🏥</h3>
            <p>Skills: Biology, Patience</p>
            <p>Subjects: Biology, Chemistry</p>
            <p>Salary: High 💰</p>
            <p>Competition: Very High ⚔️</p>
        `;
        drawChart([95, 95]);
    }
    else{
        content.innerHTML = `<p>No data found. Try another career.</p>`;
    }
}

// 📊 SIMPLE GRAPH
function drawChart(data){
    let canvas = document.getElementById("careerChart");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,400,200);

    // Salary bar
    ctx.fillRect(50, 200 - data[0], 50, data[0]);

    // Competition bar
    ctx.fillRect(150, 200 - data[1], 50, data[1]);

    ctx.fillText("Salary", 50, 190);
    ctx.fillText("Competition", 150, 190);
}
// QUESTIONS DATA
let questions = [
    {
        question: "What do you enjoy the most?",
        options: [
            { text: "Solving problems 🧠", type: "tech" },
            { text: "Drawing / creating 🎨", type: "arts" },
            { text: "Talking / convincing 🗣️", type: "business" },
            { text: "Helping people ❤️", type: "healthcare" }
        ]
    },
    {
        question: "Which subject do you like most?",
        options: [
            { text: "Math", type: "tech" },
            { text: "Biology", type: "healthcare" },
            { text: "Economics", type: "business" },
            { text: "Literature", type: "arts" }
        ]
    },
    {
        question: "What kind of work excites you?",
        options: [
            { text: "Building apps 💻", type: "tech" },
            { text: "Designing 🎨", type: "arts" },
            { text: "Running a business 📈", type: "business" },
            { text: "Treating patients 🏥", type: "healthcare" }
        ]
    },
    {
        question: "Your biggest strength?",
        options: [
            { text: "Logical thinking", type: "tech" },
            { text: "Creativity", type: "arts" },
            { text: "Leadership", type: "business" },
            { text: "Empathy", type: "healthcare" }
        ]
    }
];

// SCORE SYSTEM
let scores = {
    tech: 0,
    arts: 0,
    business: 0,
    healthcare: 0
};

let currentQuestion = 0;
let selectedAnswer = "";

// START QUIZ
function startQuiz(){
    document.getElementById("quiz").style.display = "block";
    document.getElementById("stream").style.display = "none";
    document.getElementById("result").style.display = "none";

    currentQuestion = 0;
    loadQuestion();
}

// LOAD QUESTION
function loadQuestion(){
    let q = questions[currentQuestion];

    document.getElementById("questionText").innerText = q.question;

    let optionsHTML = "";

    q.options.forEach(option => {
        optionsHTML += `
            <button onclick="selectAnswer('${option.type}')">
                ${option.text}
            </button><br><br>
        `;
    });

    document.getElementById("optionsContainer").innerHTML = optionsHTML;
}

// SELECT ANSWER
function selectAnswer(type){
    selectedAnswer = type;
}

// NEXT QUESTION
function nextQuestion(){
    if(!selectedAnswer){
        alert("Select an option first!");
        return;
    }

    scores[selectedAnswer]++;
    selectedAnswer = "";

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    } else {
        showFinalResult();
    }
}

// FINAL RESULT
function showFinalResult(){
    document.getElementById("quiz").style.display = "none";

    let resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    let max = Math.max(
        scores.tech,
        scores.arts,
        scores.business,
        scores.healthcare
    );

    let result = "";

    if(max === scores.tech){
        result = `
            <h3>Technology 💻</h3>
            <p>Careers: Software Developer, AI Engineer</p>
            <p>Subjects: Math, Programming</p>
        `;
    }
    else if(max === scores.arts){
        result = `
            <h3>Arts 🎨</h3>
            <p>Careers: Designer, Writer</p>
            <p>Subjects: Literature, Creativity</p>
        `;
    }
    else if(max === scores.business){
        result = `
            <h3>Business 📈</h3>
            <p>Careers: Marketing, Entrepreneur</p>
            <p>Subjects: Economics, Management</p>
        `;
    }
    else{
        result = `
            <h3>Healthcare 🏥</h3>
            <p>Careers: Doctor, Nurse</p>
            <p>Subjects: Biology, Chemistry</p>
        `;
    }

    resultDiv.innerHTML = `
        <h2>Your Best Career Path:</h2>
        ${result}
    `;
}