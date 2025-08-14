    export const cart = [{
        productId:"901eb2ca-386d-432e-82f0-6fb1ee7bf969",
        quantity:1
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2
    }
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