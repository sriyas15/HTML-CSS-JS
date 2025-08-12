const StorageCtrl = (function Storage(){

    return{

        storeInLs: function(item) { 
            let task;
            if (localStorage.getItem("task") === null) {
                task = [];
            } else {
                task = JSON.parse(localStorage.getItem("task"));
            }
            task.push(item); 
            localStorage.setItem("task", JSON.stringify(task));
        },

        loadInDOM : function(){
            let task;
            
            if(localStorage.getItem("task")===null){
                task = [];
            }
            else{
                task = JSON.parse(localStorage.getItem("task"));
                ItemCtrl.setItemsFromStorage(task);
                UICtrl.loadFromStorage(task);
            }
        },

        deleteFromStorage: function(deleted) {
            let task = JSON.parse(localStorage.getItem("task")) || [];
            deleted.forEach(dItem => {
                task = task.filter(item => item.id !== dItem.id);
            });
            localStorage.setItem("task", JSON.stringify(task));
            
        },

        updateInStorage : function(updated){
        
            let task = JSON.parse(localStorage.getItem("task")) || [];
            let found;
            task.forEach(item=>{
                if(item.id === updated.id){
                    console.log("Yes it is");
                    found = updated;
                    item.name = found.name;
                    item.money = found.money;
                }
            })
            localStorage.setItem("task", JSON.stringify(task));
        }
    }

})();

const ItemCtrl = (function Item(){
    const Item = function(id,name,money){
        this.id = id;
        this.name = name;
        this.money = money;
    };

    const data = {
        items : [
            {id:0,name:"Dinner",money:110},
            {id:1,name:"Shirt",money:750}
        ],
        currentItem : null,
        totalMoney : 0
    };

    return {
        getItems : function(){
            return data.items;
        },

        getNewItem : function(newItems){

            let ID;
            let newList;

            if(data.items.length>0){
            ID = data.items[data.items.length-1].id+1;
            }
            else{    
                ID=0;
            }
            newList = new Item(ID,newItems.name,newItems.money)
            data.items.push(newList);
            UICtrl.showAddedItems(newList);
            
            return newList;
        },

        getMoney : function(){
            let total = 0; 
            if(data.items.length>0){
                data.items.forEach(item=>{
                    total += parseInt(item.money) || 0;
                });
            }else{
                return data.totalMoney=0;
            }
            data.totalMoney = total;
            return total;
        },

        editItem : function(id){
            let found = null;
            data.items.forEach(item=>{

                if(item.id === id){
                    found = item;
                    document.querySelector("#item-name").value = item.name;
                    document.querySelector("#money").value = item.money;
                }
            })
            return found;
        },

        setItem : function(current){
            data.currentItem = current;
            return data.currentItem;
        },

        updateItem : function(updated){

            const currentItem = data.currentItem;
            let updateList;
            updated.forEach(item=>{
                currentItem.name = item.name;
                currentItem.money = item.money;
            })
            UICtrl.showUpdatedList(data.currentItem);
            StorageCtrl.updateInStorage(data.currentItem);
        },

        deleteItem : function(){
            let current = data.currentItem;
            const index = data.items.findIndex(item => item.id === current.id);
            let deleted;
            if (index !== -1) {
            deleted = data.items.splice(index, 1);
            }
            UICtrl.afterDeletedItem(deleted);
            StorageCtrl.deleteFromStorage(deleted);
        },

        clearAll : function(){
            data.items= [];
        },

        setItemsFromStorage: function(itemsFromStorage) {
            data.items = itemsFromStorage;
        },
    }
})();

const UICtrl = (function UI(){

    return{

        showItems : function(item){
        
        const ul = document.querySelector(".collection");
        item.forEach(item=>{
        
            let li = document.createElement("li");
            li.innerHTML=`
            <li class="collection-item" id="item-${item.id}">
                <strong>${item.name} :</strong>
                <em>${item.money} rs</em>
                <a href="#" class="secondary-content edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>
            </li>
            `
            ul.appendChild(li);
        })
        },

        clearState : function(){
        document.querySelector(".add-btn").style.display="inline";
        document.querySelector(".update-btn").style.display="none";
        document.querySelector(".delete-btn").style.display="none";
        document.querySelector(".back-btn").style.display="none";
        },

        showState : function(){
            document.querySelector(".add-btn").style.display="none";
            document.querySelector(".update-btn").style.display="inline";
            document.querySelector(".delete-btn").style.display="inline";
            document.querySelector(".back-btn").style.display="inline";
        },

        showMoney : function(){
        const money = document.querySelector("#total-money");
        money.innerHTML=ItemCtrl.getMoney();
        },

        clearValues : function(){
            const name = document.querySelector("#item-name");
            const money = document.querySelector("#money");
            name.value="";
            money.value="";
        },

        showAddedItems : function(newList){
            const name = document.querySelector("#item-name").value;
            const money = document.querySelector("#money").value;

            if(name==="" || money===""){
                M.toast({
                    html:"Please Enter All the details",
                    classes: "red darken-1 white-text rounded" 
                });
            }
            else{
                let ul = document.querySelector("#group-item");
                let addedList = document.createElement("li");
                
                addedList.innerHTML=`
                    <li class="collection-item" id="item-${newList.id}">
                    <strong>${newList.name} :</strong>
                    <em>${newList.money} rs</em>
                    <a href="#" class="secondary-content edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    </li>
                    `
                ul.appendChild(addedList);
                this.clearValues();
                this.showMoney();
            }
        },

        showUpdatedList : function(updated){
            
            let li = document.querySelector(`#item-${updated.id}`);
            li.innerHTML=`
                <strong>${updated.name} :</strong>
                    <em>${updated.money} rs</em>
                    <a href="#" class="secondary-content edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a> `;
            M.toast({
                html : "Updated the item",
                classes : "green darken-1"
            });
            this.showMoney();
        },

        afterDeletedItem : function(deletedItem){

            deletedItem.forEach(deleteItem=>{
                let li = document.querySelector(`#item-${deleteItem.id}`);
                li.remove();
            });
            M.toast({
                html : "Deleted",
                classes : "green darken-1"
            });
            this.showMoney();      
            this.clearValues();      
            this.clearState();
        },

        loadFromStorage :function(item){
            let ul = document.querySelector("#group-item");
            item.forEach(list=>{
                let li = document.createElement("li");
                li.innerHTML=`
                <li class="collection-item" id="item-${list.id}">
                    <strong>${list.name} :</strong>
                    <em>${list.money} rs</em>
                    <a href="#" class="secondary-content edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    </li>
                `;
                ul.appendChild(li);
            });
            this.showMoney();
        },
    }   
})();


const AppCtrl = (function App(){

    const loadEvents = function(){

    const editBtn = document.querySelectorAll("#group-item");
    editBtn.forEach(btn=>{
        btn.addEventListener("click",editFunction);
    });

    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click",addFunction);

    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click",backFunction);

    const updateBtn = document.querySelector(".update-btn");
    updateBtn.addEventListener("click",updateFunction);

    const deleteBtn = document.querySelector(".delete-btn");
    deleteBtn.addEventListener("click",deleteFunction);

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click",clearFunction);
    }

    const clearFunction = function(){
        ItemCtrl.clearAll();
        let ul = document.querySelector("#group-item");
        ul.innerHTML="";
        M.toast({
                html : "Cleared All Items",
                classes : "green darken-1"
            });
            UICtrl.showMoney();      
            UICtrl.clearValues();  
    }

    const deleteFunction = function(){
        ItemCtrl.deleteItem();
    }

    const updateFunction = function(){
        
        const updateList = [
            {
                name : document.querySelector("#item-name").value,
                money : parseInt(document.querySelector("#money").value)
            }
        ];
        if(document.querySelector("#item-name").value ==="" || parseInt(document.querySelector("#money").value==="")){

            M.toast({
                html : "Please Enter your Updated Items",
                classes : "red darken-1"
            });

        }
        else{
            ItemCtrl.updateItem(updateList);
        }
    }

    const backFunction = function(){
        UICtrl.clearState();
        UICtrl.clearValues();
    }

    const addFunction = function(){
        const name = document.querySelector("#item-name").value;
        const money = document.querySelector("#money").value;

        const addedItems = 
            {name : name, money : parseInt(money)};

        const newItem = ItemCtrl.getNewItem(addedItems);
        StorageCtrl.storeInLs(newItem);

       M.toast({
        html : "Added Successfully!",
        classes : "green darken-1"
       })
    }

    const editFunction = function(e){
        const itemId = e.target.parentElement.parentElement.id;

        const getId = itemId.split("-");
        const currentId = parseInt(getId[1]);
        const id = ItemCtrl.editItem(currentId);

        ItemCtrl.setItem(id);
        UICtrl.showState();
    }

    return {
        init : function(){
             const storedTasks = localStorage.getItem("task");
            if (storedTasks) {
                StorageCtrl.loadInDOM();
            } 
            else{
                const item = ItemCtrl.getItems();
                if(item.length>0){
                    UICtrl.showItems(item);
                    UICtrl.showMoney();
                }
            }
            loadEvents();
        }
    }

})();AppCtrl.init();

document.addEventListener("DOMContentLoaded",function(){
    UICtrl.clearState();
})