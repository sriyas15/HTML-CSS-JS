let btn = document.querySelector("#btn");

let jsonBtn = document.querySelector("#json-btn");

let apiBtn = document.querySelector("#api-btn");

let text = document.querySelector("#div");


btn.addEventListener("click",getText);
jsonBtn.addEventListener("click",getJson);
apiBtn.addEventListener("click",getApi);

function getText(){
    ;
    fetch("text.txt").then(function(val){

        return val.text() ;

    }).then(function(response){

        text.innerHTML=`${response}`;

    }).catch(function(error){

        text.innerHTML=`${error}`;

    })
}

function getJson(){

    fetch("text.json").then(function(val){

        return val.json();

    }).then(function(response){
        let result =""
        response.forEach(function(user){
            result+= `<li>${user}</li>`
            
        })
        text.innerHTML=result;
    }).catch(function(error) {
            text.innerHTML = `Error: ${error}`;
        });
}

function getApi(){

    fetch("https://api.chucknorris.io/jokes/random?category=travel").then(function(val){

        return val.json();

    }).then(function(response){
        text.innerHTML=response.value;
    }).catch(function(error) {
            text.innerHTML = `Error: ${error}`;
        });
}