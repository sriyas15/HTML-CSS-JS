export const cart = [
    
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