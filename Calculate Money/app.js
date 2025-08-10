// ITEM controller, App Controller, Model Controller

//Storage Ctrl
const StorageCtrl = (function Store(){

    return {
        getAddedItem : function(item){
        
            let task;

            if(localStorage.getItem("task")===null){
                task=[];
                task.push(item);
                localStorage.setItem("task",JSON.stringify(task));
                
            }
            else{
                task = JSON.parse(localStorage.getItem("task"));
                task.push(item);
                localStorage.setItem("task",JSON.stringify(task));
                
            }
            return task;
        },

        getItemInStorage : function(){
            let task;
            if(localStorage.getItem("task")===null){
                 task = [];
            }
            else{
                task = JSON.parse(localStorage.getItem("task"));
            }
            return task;
        },

        deleteInStorage : function(id){
            console.log(id);
          let  task = JSON.parse(localStorage.getItem("task"));
            console.log(task);
            // task.forEach((item)=>{
                // if(id===item.id){
                //     task.splice(index,1);
                // }
                // console.log(item.id);
            // })
            // localStorage.setItem("task",JSON.stringify(task));
        }
    }
})();

//Item Controller
const Item = (function Items(){

    const Item = function(id,name,money){

        this.id=id;
        this.name=name;
        this.money=money
    }

    const data ={ 
         items:   [
            {id:0, name:"Bike", money:1000},
            {id:1, name:"Car", money:10000},
            {id:2, name:"Food", money:500}
    ],
            currentItem:null,
            totalMoney:0
        
    }
        return {
            getItems: function(){
            return data.items;
        },
        
        getList : function(items){

            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            items.forEach(function (item) {
                const newItem = new Item(ID, item.name, item.amount);
                data.items.push(newItem);
                Ui.newItemsToUi(newItem);
            });

        },

        totalMoney : function(){

            let total=0;
            if(data.items.length>0){

                data.items.forEach((item)=>{
                    total+=item.money
                })
            }else{
                return data.totalMoney=0;
            }
            return total;
        },

        itemEdit : function(itemToEdit){

            let found = null;

            data.items.forEach(item=>{
                if(item.id===itemToEdit){
                    found = item;
                }
            })

            return found;

        },

        setItems : function(setItem){
            data.currentItem = setItem;
        },

        getCurrentItems : function(){
            StorageCtrl.getAddedItem(data.currentItem);
            return data.currentItem;
        },

        deleteItem : function(id){
            const ids = data.items.map(item=>{
                return item.id
            })

            const index = ids.indexOf(id);
            data.items.splice(index,1);
        },

        updateItems : function(){
            const currentItem = data.currentItem;
            const newName = document.querySelector("#item-name").value;
            const newMoney = parseInt(document.querySelector("#money").value);

            let updated = null;

            data.items.forEach(item => {
                if (item.id === currentItem.id) {
                    item.name = newName;
                    item.money = newMoney;
                    updated = item;
                }
    });

    return updated;
}
,

        clearItems: () => {
        data.items = []; // This clears the original array
    }

    }
})();

//Ui Controller
const Ui = (function Ui(){

    return {

    getItemsInUi : function(items){

    const html=document.querySelector("#group-item");
    let htmlData ='';
    items.forEach((item)=>{
        htmlData+=`
        <li class="collection-item" id="item-${item.id}">
            <strong>${item.name} :</strong>
            <em>${item.money} rs</em>
            <a href="#" class="secondary-content edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
        </li>
    `
    
    })
    html.innerHTML=htmlData;
},

    clearState : function(){
            document.querySelector(".add-btn").style.display="inline"
            document.querySelector(".update-btn").style.display="none";
            document.querySelector(".delete-btn").style.display="none"
            document.querySelector(".back-btn").style.display="none"
    },

    showState : function(){
            document.querySelector(".add-btn").style.display="none"
            document.querySelector(".update-btn").style.display="inline";
            document.querySelector(".delete-btn").style.display="inline"
            document.querySelector(".back-btn").style.display="inline"
    },

    newItemsToUi : function(newItemtoUi){

        const ul = document.querySelector("#group-item");

        let newElement = document.createElement("li");
        newElement.className="collection";
        newElement.id=`item-${newItemtoUi.id}`;

        newElement.innerHTML=`
        
        <strong>${newItemtoUi.name} :</strong>
        <em>${newItemtoUi.money} rs</em>
        <a href="#" class="secondary-content edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </a>

        `
        ul.appendChild(newElement);
    },

    showTotalMoney : function(totalMoney){
        document.querySelector("#total-money").innerText = totalMoney;
    },

    deleteListItem : function(id){

        const itemId = `#item-${id}`;
        const item = document.querySelector(itemId);
        item.remove();
        M.toast({
            html: "Item Deleted Successfully!",
            classes: "green darken-1 white-text rounded"
        });
        let itemName= document.querySelector("#item-name");
        let money= document.querySelector("#money");

        itemName.value="";
        money.value="";

    },

    addCurrentItem : function(){
        document.querySelector("#item-name").value=Item.getCurrentItems().name;
        document.querySelector("#money").value=Item.getCurrentItems().money;
    },

    showUpdatedItem : function(updated){
    let list = document.getElementById(`item-${updated.id}`);
    
    list.innerHTML = `
        <strong>${updated.name} :</strong>
        <em>${updated.money} rs</em>
        <a href="#" class="secondary-content edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </a>
    `
}

}

})();

//App Controller
const App = (function App(){

    const loadEvents = function(){

        const editBtn = document.querySelector("#group-item");
        editBtn.addEventListener("click",editClick);

        const addBtn = document.querySelector(".add-btn");
        addBtn.addEventListener("click",addFunction);

        const clearBtn = document.querySelector("#clear-btn");
        clearBtn.addEventListener("click",clearFunction);

        const deleteBtn = document.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteList);

        const backBtn = document.querySelector(".back-btn");
        backBtn.addEventListener("click",getBack);

        const updateBtn = document.querySelector(".update-btn");
        updateBtn.addEventListener("click",updateFunction);
    }

    const updateFunction = function(){

        const updated = Item.updateItems();
        //Getting total calculated money from ItemCtrl
        const totMoney = Item.totalMoney();
        Ui.showTotalMoney(totMoney);//Showing total money in Ui
        Ui.showUpdatedItem(updated);

        M.toast({
    html: "Item Updated Successfully!",
    classes: "blue darken-1 white-text rounded"
});


        
    }

    const getBack = function(){

        Ui.clearState();

        let itemName= document.querySelector("#item-name");
        let money= document.querySelector("#money");

        itemName.value="";
        money.value="";
    }

    const deleteList= function(){

        const getCurrent = Item.getCurrentItems();

        Item.deleteItem(getCurrent.id);

        Ui.deleteListItem(getCurrent.id);

        StorageCtrl.deleteInStorage(getCurrent.id);

        //Getting total calculated money from ItemCtrl
        const totMoney = Item.totalMoney();
        Ui.showTotalMoney(totMoney);//Showing total money in Ui

    }

    const clearFunction = function(){
        let list = document.querySelector(".collection");
        
        list.innerHTML=""; 

        Item.clearItems();

        //Getting total calculated money from ItemCtrl
        const totMoney = Item.totalMoney();
        Ui.showTotalMoney(totMoney);//Showing total money in Ui

        M.toast({
                html: "Cleared All Items",
                classes: "green darken-1 white-text rounded"
            });
        let itemName= document.querySelector("#item-name");
        let money= document.querySelector("#money");

        itemName.value="";
        money.value="";
    }
    

    const addFunction = function(){

    let itemName= document.querySelector("#item-name");
    let money= document.querySelector("#money");
    const list =[
        {name : itemName.value , amount : parseInt(money.value)}
    ];

        if(itemName.value ==="" || money.value===""){   
            M.toast({
                html: "⚠️ Please enter all fields!",
                classes: "red darken-1 white-text rounded"
            });
        }else{
            const items = Item.getList(list);
            M.toast({
            html: "Added Successfully!",
            classes: "green white-text rounded"
        });
        }
        itemName.value="";
        money.value="";

     //Getting total calculated money from ItemCtrl
    const totMoney = Item.totalMoney();
    Ui.showTotalMoney(totMoney);//Showing total money in Ui 
    StorageCtrl.getAddedItem(list);
}

const editClick = function(e) {
    if (e.target.closest(".edit")) {
        console.log(e.target.parentElement.parentElement);
        Ui.showState();

        //Gettind Items ID
        const deleteList = e.target.parentElement.parentElement.id;
        const split = deleteList.split("-");
        const id = parseInt(split[1]);
        
        const itemToEdit = Item.itemEdit(id);
        
        Item.setItems(itemToEdit);

        Ui.addCurrentItem();
    }
}

    return {
        init: function(){
            const item = Item.getItems();
            
            if(item.length > 0 ){
                Ui.getItemsInUi(item);
                //Getting total calculated money from ItemCtrl
                const totMoney = Item.totalMoney();
                Ui.showTotalMoney(totMoney);//Showing total money in Ui
            }
            loadEvents();
        },
    }
})();App.init();

document.addEventListener("DOMContentLoaded",function(){
    Ui.clearState();
})