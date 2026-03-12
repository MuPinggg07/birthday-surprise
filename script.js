const modal=document.getElementById("modal")
const modalContent=document.getElementById("modalContent")

const startScreen=document.getElementById("startScreen")
const quizSection=document.getElementById("quizSection")
const mainPage=document.getElementById("mainPage")

const quizContainer=document.getElementById("quizContainer")

const videoModal=document.getElementById("videoModal")
const videoPlayer=document.getElementById("videoPlayer")

let step=0

function nextPopup(){

step++

let text=""
let buttons=""

let startBtn = document.getElementById("startBtn")

if(step==1){

text="เดี๋ยวก่อน...จะเข้ามาทำไมอะ"

buttons=`<br><br>
<button onclick="closeModal()">ขอเข้าไปดูหน่อย</button>
`

startBtn.innerText="อ่าๆๆๆ งั้นกดอีกที"

}

else if(step==2){

text="แน่ใจนะว่าจะไปดู"

buttons=`<br><br>
<button onclick="closeModal()">แน่ใจสิ!!!!</button>
`

startBtn.innerText="อ่าๆ ให้ได้ดั้ย"

}

else if(step==3){

text="โอเค...งั้นตอบคำถามก่อน 😏"

buttons=`
<br><br>
<button onclick="startQuiz()">ตกลง</button>
<button onclick="catPopup()">ไม่เอาอะ</button>
`

startBtn.innerText="เริ่มเลย!"

}

showModal(text+buttons)

}

function showModal(html){

modalContent.innerHTML=html
modal.classList.add("active")

}

function closeModal(){

modal.classList.remove("active")

}

modal.onclick=e=>{
if(e.target.id==="modal") closeModal()
}

function catPopup(){

showModal(`
<p>จะหนีจริงดิ 😼</p>
<img src="image/200.gif" width="200"><br><br>
<button onclick="startQuiz()">เคๆไปก็ได้</button>
`)

}

function startQuiz(){

showModal(`
<p>
กติกาการตอบคำถาม<br><br>
1. ห้ามโกง<br>
2. ห้ามเปิด Google<br>
3. ตอบผิดไม่เป็นไร<br><br>
ถ้าโกงขอให้ขี้แตก
</p>

<button onclick="startRealQuiz()">เริ่มตอบคำถาม</button>
`)

}

function startRealQuiz(){

closeModal()

startScreen.style.display="none"

quizSection.classList.add("show")

loadQuiz()

}

const questions = [

{
question:"เจ้าของวันเกิดสวยไหม",
options:[
"สวย",
"สวยมาก",
"สวยที่สุด",
"สวยเกินมนุษย์"
],
correct:[0,1,2,3]
},

{
question:"ของขวัญที่อยากได้ที่สุดคืออะไร",
options:[
"เงิน 💸",
"กินบุฟเฟต์",
"แฟนหล่อ ๆ แบบพรี่แชมป์",
"นอนทั้งวัน"
],
correct:2
},

{
question:"อายุวันนี้เท่าไหร่แล้ว",
options:[
"18 ตลอดกาล",
"21 แบบยังไม่อยากโต",
"99 แต่หน้าเด็ก",
"ลืมไปแล้ว"
],
correct:1
},

{
question:"วันนี้วันอะไร",
options:[
"วันหวยออก",
"วันเงินเดือนออก",
"วันเกิดคนสวยที่สุดในโลก",
"วันโลกแตก"
],
correct:2
}

]

function loadQuiz(){

let html=""

answeredCorrect=[]

questions.forEach((q,index)=>{

answeredCorrect.push(false)

html+=`

<div class="quiz-question">

<p>${q.question}</p>

<div class="quiz-option" onclick="checkAnswer(${index},0,this)">
${q.options[0]}
</div>

<div class="quiz-option" onclick="checkAnswer(${index},1,this)">
${q.options[1]}
</div>

<div class="quiz-option" onclick="checkAnswer(${index},2,this)">
${q.options[2]}
</div>

<div class="quiz-option" onclick="checkAnswer(${index},3,this)">
${q.options[3]}
</div>

</div>

`

})

html+=`

<br>

<button id="surpriseBtn"
onclick="finishQuiz()"
style="display:none; margin:40px auto;">

ตอบครบละ!

</button>

`

quizContainer.innerHTML=html

}



// ============================
// ตรวจคำตอบ
// ============================

function checkAnswer(questionIndex,optionIndex,element){

// ถ้าข้อนี้ตอบถูกไปแล้วจะกดไม่ได้อีก
if(answeredCorrect[questionIndex]) return

// ดึงคำตอบที่ถูกของข้อนั้น
let correct = questions[questionIndex].correct

let isCorrect = Array.isArray(correct) 
? correct.includes(optionIndex)
: optionIndex === correct

if(isCorrect){

element.style.background="#4CAF50"
element.innerHTML+=" ✔"

answeredCorrect[questionIndex]=true

let options = element.parentElement.querySelectorAll(".quiz-option")

options.forEach(opt=>{
opt.style.pointerEvents="none"
})

checkAllCorrect()

}


// ============================
// ถ้าตอบผิด
// ============================

else{

element.style.background="#ff4d4d"
element.innerHTML+=" ✖"

showWrongPopup()

}

}

// ============================
// เช็คว่าตอบครบหรือยัง
// ============================

function checkAllCorrect(){

let allCorrect = answeredCorrect.every(v=>v===true)

if(allCorrect){

document.getElementById("surpriseBtn").style.display="block"

}

}

function showWrongPopup(){

let popup=document.createElement("div")

popup.className="wrong-popup"

popup.innerHTML=`
<img src="image/bpk-suspicious.gif" 
alt="wrong answer" 
style="display:block; margin:auto; width:110%; max-width:360px; border-radius:12px; box-shadow:0 10px 20px rgba(255,255,255,0.25);">
`

document.body.appendChild(popup)

// เล่นเสียงตอนตอบผิด
let sound = new Audio("sound/among.mp3")
sound.play()

setTimeout(()=>{
popup.remove()
},3000)

}

function finishQuiz(){

quizSection.classList.remove("show")

mainPage.classList.add("show")

window.scrollTo({
top:0,
behavior:"smooth"
})

confetti()

}

function openVideo(src){

let videoPlayer = document.getElementById("videoPlayer")
let videoModal = document.getElementById("videoModal")

videoPlayer.src = src
videoModal.classList.add("active")

}

function closeVideo(){

let videoPlayer = document.getElementById("videoPlayer")
let videoModal = document.getElementById("videoModal")

videoModal.classList.remove("active")
videoPlayer.src = ""

}

function confetti(){

const items=["❤️","💖","💗","IMG"]

const images=[
"image/cat-meme.gif",
"image/cat-jumping.gif",
"image/el-gato.gif",
"image/hi-cat.gif",
"image/IMG_5459-removebg-preview.png",
"image/IMG_5458-removebg-preview.png",
"image/FBCEB8D9-0B1E-4366-90BD-46AE8BE9076C-removebg-preview.png",
"image/IMG_7100-removebg-preview.png",
]

for(let i=0;i<70;i++){

let el=document.createElement("div")
el.className="heart"

let random=items[Math.floor(Math.random()*items.length)]

if(random==="IMG"){

let img=document.createElement("img")

img.src = images[Math.floor(Math.random()*images.length)]

img.className="heart-img"

el.appendChild(img)

}

else{

el.innerHTML=random

}

el.style.left=Math.random()*100+"%"
el.style.animationDuration=(4+Math.random()*3)+"s"

document.body.appendChild(el)

}

}

window.addEventListener("scroll",()=>{

document.querySelectorAll(".image").forEach(el=>{

let top=el.getBoundingClientRect().top

if(top<window.innerHeight-100){
el.classList.add("show")
}

})

})
