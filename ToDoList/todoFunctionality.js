bookinput = document.querySelector("#book-value");

authorinput = document.querySelector("#author-value");

isbninput = document.querySelector("#isbn");

addBtn = document.querySelector("#add-btn");

clearBtn = document.querySelector("#clear-btn");

table = document.querySelector(".tbody");

removes = document.querySelector("#cross");

div = document.querySelector(".divHtml");


class Book{

    constructor(bookName,authorName,isbnNo){
        this.bookName=bookName;
        this.authorName=authorName;
        this.isbnNo=isbnNo;
    }

}

class UI{

    addBooks(){
        let getBook = new Book(bookinput.value,authorinput.value,isbninput.value)

        if(bookinput.value==="" || authorinput.value==="" || isbninput.value===""){
            this.alertFunction("Please Fill the All Details","danger");
        }

        else

            {
            let newElement = document.createElement("tr")
            newElement.className="trow remove";

            newElement.innerHTML=`<td>${bookinput.value}</td>
            <td>${authorinput.value}</td>
            <td>${isbninput.value}</td>
            <td id="cross"><i class="fa-regular fa-xmark"></i></td>`

            table.appendChild(newElement);
            this.alertFunction("Added","success");
            ui.locStorage();
        }
    }

    clearFunction(){
        table.innerHTML="";
        ui.alertFunction("Cleared","success");
    }

    removeFunction(e){
        if(e.target.parentNode.parentNode.className==="trow remove"){
            e.target.parentNode.parentNode.remove();
            ui.alertFunction("Removed","success");
           
        }
    }

    alertFunction(msg,alert){
        this.msg=msg;
        this.alert=alert;

        let newDiv = document.createElement("div");
        newDiv.className=`alert alert-${alert}`;
        newDiv.innerHTML=`${msg}`;
        div.appendChild(newDiv);

        setTimeout(() => {
        newDiv.remove();
    }, 3000);
    }

    locStorage(){

        let getBook = new Book(bookinput.value,authorinput.value,isbninput.value)
        let task;

        if(localStorage.getItem("books")===null){

            task=[];
            task.push(getBook);
            localStorage.setItem("books",JSON.stringify(task));
            console.log(getBook);
            console.log("1st task Completed");
        }

        else{
            task= JSON.parse(localStorage.getItem("books"));
            task.push(getBook);
            localStorage.setItem("books",JSON.stringify(task));
            console.log("Task Completed");

        }
    }
   

}
let ui = new UI();
addBtn.addEventListener("click", ui.addBooks.bind(ui));
clearBtn.addEventListener("click",ui.clearFunction);
table.addEventListener("click",ui.removeFunction);
document.addEventListener("DOMContentLoaded",retrive);

document.addEventListener("DOMContentLoaded", retrive);

function retrive() {
    let ui = new UI();

    // Get books string from localStorage
    let booksString = localStorage.getItem("books");

    // If there is something stored in localStorage
    if (booksString !== null) {
        // Convert string to array
        let taskList = JSON.parse(booksString);

        // Loop through the array manually
        for (let i = 0; i < taskList.length; i++) {
            let book = taskList[i];

            let newElement = document.createElement("tr");
            newElement.className = "trow remove";

            newElement.innerHTML = `
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.isbnNo}</td>
                <td id="cross"><i class="fa-regular fa-xmark"></i></td>`;

            table.appendChild(newElement);
        }
    }
}

