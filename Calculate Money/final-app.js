
// Storage Controller
const StorageCtrl = (function () {
    return {
        getAddedItem: function (item) {
            let tasks = JSON.parse(localStorage.getItem("task")) || [];
            tasks.push(item);
            localStorage.setItem("task", JSON.stringify(tasks));
        },
        loadStorageInDOM: function () {
            let tasks = JSON.parse(localStorage.getItem("task"));
            if (tasks && tasks.length > 0) {
                tasks.forEach(task => {
                    const newList = {
                        name: task.name,
                        money: parseInt(task.money),
                        id: task.id
                    };
                    Item.getItems().push(newList);
                });
                Ui.getItemsInUi(Item.getItems());
                const totMoney = Item.totalMoney();
                Ui.showTotalMoney(totMoney);
            } else {
                console.log("There is no data in storage");
            }
        }
    }
})();

// Item Controller
const Item = (function () {
    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;
    };

    const data = {
        items: [
            { id: 0, name: "Bike", money: 1000 },
            { id: 1, name: "Car", money: 10000 },
            { id: 2, name: "Food", money: 500 }
        ],
        currentItem: null,
        totalMoney: 0
    };

    return {
        getItems: () => data.items,

        getList: function (items) {
            let ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;
            items.forEach(function (item) {
                const newItem = new Item(ID, item.name, item.amount);
                data.items.push(newItem);
                Ui.newItemsToUi(newItem);
                StorageCtrl.getAddedItem(newItem);
            });
        },

        totalMoney: function () {
            let total = 0;
            data.items.forEach(item => total += item.money);
            return total;
        },

        itemEdit: function (id) {
            return data.items.find(item => item.id === id);
        },

        setItems: (setItem) => data.currentItem = setItem,

        getCurrentItems: () => data.currentItem,

        deleteItem: function (id) {
            const index = data.items.findIndex(item => item.id === id);
            if (index !== -1) data.items.splice(index, 1);
        },

        updateItems: function () {
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
        },

        clearItems: () => { data.items = []; }
    };
})();

// UI Controller
const Ui = (function () {
    return {
        getItemsInUi: function (items) {
            const html = document.querySelector("#group-item");
            let htmlData = '';
            items.forEach((item) => {
                htmlData += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name} :</strong>
                        <em>${item.money} rs</em>
                        <a href="#" class="secondary-content edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                    </li>`;
            });
            html.innerHTML = htmlData;
        },

        clearState: function () {
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },

        showState: function () {
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },

        newItemsToUi: function (newItemtoUi) {
            const ul = document.querySelector("#group-item");
            let newElement = document.createElement("li");
            newElement.className = "collection-item";
            newElement.id = `item-${newItemtoUi.id}`;
            newElement.innerHTML = `
                <strong>${newItemtoUi.name} :</strong>
                <em>${newItemtoUi.money} rs</em>
                <a href="#" class="secondary-content edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>`;
            ul.appendChild(newElement);
        },

        showTotalMoney: (totalMoney) => {
            document.querySelector("#total-money").innerText = totalMoney;
        },

        deleteListItem: function (id) {
            const item = document.querySelector(`#item-${id}`);
            if (item) item.remove();
            M.toast({
                html: "Item Deleted Successfully!",
                classes: "green darken-1 white-text rounded"
            });
            document.querySelector("#item-name").value = "";
            document.querySelector("#money").value = "";
        },

        addCurrentItem: function () {
            const current = Item.getCurrentItems();
            document.querySelector("#item-name").value = current.name;
            document.querySelector("#money").value = current.money;
        },

        showUpdatedItem: function (updated) {
            const list = document.getElementById(`item-${updated.id}`);
            list.innerHTML = `
                <strong>${updated.name} :</strong>
                <em>${updated.money} rs</em>
                <a href="#" class="secondary-content edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>`;
        }
    };
})();

// App Controller
const App = (function () {
    const loadEvents = function () {
        document.querySelector("#group-item").addEventListener("click", editClick);
        document.querySelector(".add-btn").addEventListener("click", addFunction);
        document.querySelector("#clear-btn").addEventListener("click", clearFunction);
        document.querySelector(".delete-btn").addEventListener("click", deleteList);
        document.querySelector(".back-btn").addEventListener("click", getBack);
        document.querySelector(".update-btn").addEventListener("click", updateFunction);
    };

    const updateFunction = function () {
        const updated = Item.updateItems();
        Ui.showTotalMoney(Item.totalMoney());
        Ui.showUpdatedItem(updated);
        M.toast({
            html: "Item Updated Successfully!",
            classes: "blue darken-1 white-text rounded"
        });
    };

    const getBack = function () {
        Ui.clearState();
        document.querySelector("#item-name").value = "";
        document.querySelector("#money").value = "";
    };

    const deleteList = function () {
        const current = Item.getCurrentItems();
        Item.deleteItem(current.id);
        Ui.deleteListItem(current.id);
        Ui.showTotalMoney(Item.totalMoney());
    };

    const clearFunction = function () {
        document.querySelector("#group-item").innerHTML = "";
        Item.clearItems();
        Ui.showTotalMoney(0);
        M.toast({
            html: "Cleared All Items",
            classes: "green darken-1 white-text rounded"
        });
        document.querySelector("#item-name").value = "";
        document.querySelector("#money").value = "";
    };

    const addFunction = function () {
        const itemName = document.querySelector("#item-name");
        const money = document.querySelector("#money");

        if (itemName.value === "" || money.value === "") {
            M.toast({
                html: "⚠️ Please enter all fields!",
                classes: "red darken-1 white-text rounded"
            });
            return;
        }

        const list = [{
            name: itemName.value,
            amount: parseInt(money.value)
        }];

        Item.getList(list);

        itemName.value = "";
        money.value = "";

        Ui.showTotalMoney(Item.totalMoney());
        M.toast({
            html: "Added Successfully!",
            classes: "green white-text rounded"
        });
    };

    const editClick = function (e) {
        if (e.target.closest(".edit")) {
            Ui.showState();
            const id = parseInt(e.target.closest("li").id.split("-")[1]);
            const itemToEdit = Item.itemEdit(id);
            Item.setItems(itemToEdit);
            Ui.addCurrentItem();
        }
    };

    return {
        init: function () {
            const items = Item.getItems();
            if (items.length > 0) {
                Ui.getItemsInUi(items);
                Ui.showTotalMoney(Item.totalMoney());
            }
            loadEvents();
        }
    };
})();

App.init();
document.addEventListener("DOMContentLoaded", function () {
    Ui.clearState();
    StorageCtrl.loadStorageInDOM();
});
