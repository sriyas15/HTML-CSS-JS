import {cart,addToCart} from "../data/cart.js";
import {products} from "../data/products.js";

let productsDiv = document.querySelector(".products-wrapper");

    let newProducts = "" ;

products.forEach(function(values){

     newProducts += `
    
    <div>
    
    <img width="220px" height="220px" id="product-image" src="${values.image}" alt="">
    
    <p><span class="text-break">${values.name}</span></p>
        <img id="ratings" width="90px" height="20px" src="./assets/ratings/rating-${values.rating.stars}.png" alt=""><span id="span-color">${values.rating.count}</span>
        <h4>₹${values.price}</h4>
        <select name="quantities">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <button id="buy-btn"
        data-product-name="${values.name}"
        data-product-id="${values.id}"
        >Add to Cart</button>
    </div>
    
    `
})
    
productsDiv.innerHTML= newProducts;

const cartBtn = document.querySelectorAll("#buy-btn");

function cartQuantity(){

    let cartQuantity=0;
    cart.forEach(item=>{
        cartQuantity+=item.quantity;
    });
    
    let cartNumber = document.querySelector(".cart-quantity");
    cartNumber.innerHTML=cartQuantity;

}

cartBtn.forEach(btn=>{

    btn.addEventListener("click",function(){

    const productName = btn.dataset.productName;
    const productId = btn.dataset.productId;

    addToCart(productName,productId);
    cartQuantity();

});
});
