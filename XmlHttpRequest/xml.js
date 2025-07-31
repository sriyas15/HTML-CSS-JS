const categories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "explicit",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "political",
    "religion",
    "science",
    "sport",
    "travel"
];

btnDiv = document.querySelector("#all-btn");

inputs = document.querySelector("#input-field");

getBtn = document.querySelector("#get");

ul = document.querySelector("#ul");


let newBtns;

categories.forEach(function(names){
    
    newBtns = document.createElement("button");
    newBtns.className="btn btn-dark ms-2 btns";
    
    newBtns.innerText=names;
    
    btnDiv.appendChild(newBtns);
});

let btn = document.querySelectorAll(".btns");

btn.forEach(function(btns){
    btns.addEventListener("click",runThis);
})



function runThis(){

    console.log(`You have selected ${this.innerText}`);
    
    inputs.value=this.innerText;

}

getBtn.addEventListener("click",getJoke);

function getJoke(){
    
    if(!inputs.value){
        
        alert(`Provid Category`);
        return;
    }
    
    let xhr = new XMLHttpRequest();

    xhr.open("GET",`https://api.chucknorris.io/jokes/random?category=${inputs.value}`,true);

    xhr.onload = function(){
        console.log(`Fetching ${inputs.value}`);

        inputs.value="";

        let result = JSON.parse(xhr.responseText);

        if(xhr.status===200){
             
            let newLi = document.createElement("li");
            newLi.innerHTML=`${result.value}`;

            ul.appendChild(newLi);
        }
        else{
            console.log("Error");
        }
    }
    xhr.send();
}