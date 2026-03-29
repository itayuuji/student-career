// 🔐 LOGOUT
function logout(){
    localStorage.clear();
    alert("Logged out");
    window.location.href = "login.html";
}

// 📂 SWITCH SECTIONS
function showSection(section){
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(section).style.display = "block";
}

// 📞 CONTACT
function goToContact(){
    showSection("contact");
}

// ------------------
// 🔍 SEARCH CAREER
// ------------------
function searchCareer(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    showSection("search");

    let content = document.getElementById("careerDetailsContent");

    if(input.includes("software")){
        content.innerHTML = `<h3>Software Engineer</h3>
        <p>Skills: Coding, Problem Solving</p>
        <p>Salary: High</p>`;
        drawChart([90,80]);
    }
    else if(input.includes("doctor")){
        content.innerHTML = `<h3>Doctor</h3>
        <p>Skills: Biology, Care</p>
        <p>Salary: High</p>`;
        drawChart([95,95]);
    }
    else{
        content.innerHTML = "No data found";
    }
}

// 📊 GRAPH
function drawChart(data){
    let ctx = document.getElementById("careerChart").getContext("2d");
    ctx.clearRect(0,0,400,200);

    ctx.fillRect(50,200-data[0],50,data[0]);
    ctx.fillRect(150,200-data[1],50,data[1]);

    ctx.fillText("Salary",50,190);
    ctx.fillText("Competition",150,190);
}

// ------------------
// 🧠 QUIZ SYSTEM
// ------------------
let questions = [
    {
        q:"What do you like?",
        options:[
            {text:"Problem solving", type:"tech"},
            {text:"Creativity", type:"arts"},
            {text:"Business ideas", type:"business"},
            {text:"Helping people", type:"healthcare"}
        ]
    },
    {
        q:"Favorite subject?",
        options:[
            {text:"Math", type:"tech"},
            {text:"Biology", type:"healthcare"},
            {text:"Economics", type:"business"},
            {text:"English", type:"arts"}
        ]
    }
];

let index=0;
let scores={tech:0,arts:0,business:0,healthcare:0};
let selected="";

function startQuiz(){
    index=0;
    document.getElementById("quiz").style.display="block";
    loadQuestion();
}

function loadQuestion(){
    let q=questions[index];
    document.getElementById("questionText").innerText=q.q;

    let html="";
    q.options.forEach(o=>{
        html+=`<button onclick="selectAnswer('${o.type}')">${o.text}</button><br><br>`;
    });

    document.getElementById("optionsContainer").innerHTML=html;
}

function selectAnswer(type){
    selected=type;
}

function nextQuestion(){
    if(!selected){ alert("select option"); return; }

    scores[selected]++;
    selected="";
    index++;

    if(index<questions.length){
        loadQuestion();
    } else{
        showFinal();
    }
}

function showFinal(){
    let maxKey = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);

    document.getElementById("result").style.display="block";
    document.getElementById("quiz").style.display="none";

    document.getElementById("result").innerHTML = "Best Career: " + maxKey;
}

// STREAM
function selectStream(){
    document.getElementById("stream").style.display="block";
}

function showStreamCareer(){
    let stream=document.getElementById("streamSelect").value;
    document.getElementById("result").style.display="block";
    document.getElementById("result").innerHTML="Careers in "+stream;
}

// ------------------
// 📊 ROADMAP TRACKER
// ------------------
let roadmap = [
    {step:"Learn Basics", done:false},
    {step:"Practice Skills", done:false},
    {step:"Build Projects", done:false},
    {step:"Apply Jobs", done:false}
];

function loadRoadmap(){
    let saved=localStorage.getItem("roadmap");
    if(saved) roadmap=JSON.parse(saved);
    displayRoadmap();
}

function displayRoadmap(){
    let html="";
    roadmap.forEach((s,i)=>{
        html+=`
        <p>
        <input type="checkbox" ${s.done?"checked":""}
        onchange="toggleStep(${i})">
        ${s.step}
        </p>`;
    });

    document.getElementById("roadmapSteps").innerHTML=html;
    updateProgress();
}

function toggleStep(i){
    roadmap[i].done=!roadmap[i].done;
    localStorage.setItem("roadmap",JSON.stringify(roadmap));
    displayRoadmap();
}

function updateProgress(){
    let done=roadmap.filter(s=>s.done).length;
    let percent=Math.floor(done/roadmap.length*100);
    document.getElementById("progressText").innerText="Progress: "+percent+"%";
}

// LOAD
window.onload=function(){
    loadRoadmap();
}