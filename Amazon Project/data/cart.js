    export const cart = [{
        productId:"901eb2ca-386d-432e-82f0-6fb1ee7bf969",
        quantity:1
    },
];

export function addToCart(productName,productId){

    let matchingItem;

    cart.forEach((item)=>{
    if(productId===item.productId){
        matchingItem = item;
    }
    });

    if(matchingItem){
        matchingItem.quantity+=1;
        
    }else{
        cart.push({
        productName : productName,
        quantity : 1,
        productId : productId
        })
    }
}