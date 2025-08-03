const ui = new Ui();
const userName = new GitFinder();

const input = document.querySelector("#input-field");
const button = document.querySelector("#get-btn");

button.addEventListener("click",runThis);

function runThis(e){

    e.preventDefault();

    if(input.value===""){
        ui.alertDiv("Please Enter the username","danger");
    }
    else{
        userName.getUser(input.value)
        .then((data)=>ui.getProfile(data))
        .catch((e)=>console.log(e));
    }
    input.value="";
}