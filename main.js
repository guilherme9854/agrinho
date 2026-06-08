const themeBtn =
document.getElementById("theme-btn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
themeBtn.innerHTML="☀️";
}else{
themeBtn.innerHTML="🌙";
}

});

const tabs =
document.querySelectorAll(".tab-btn");

const contents =
document.querySelectorAll(".tab-content");

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(btn=>{
btn.classList.remove("active");
});

contents.forEach(content=>{
content.classList.remove("active");
});

tab.classList.add("active");

document
.getElementById(tab.dataset.tab)
.classList.add("active");

});

});