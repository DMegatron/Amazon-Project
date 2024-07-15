// let cart = [];
let cart = [];


export function addToCart(productId) {
    cart = JSON.parse(localStorage.getItem('cart'));
    let noOfProduct = Number(document.querySelector(`.product-quantity-${productId}`).value);
    // console.log(typeof(noOfProduct));
    let itemInCart;
    cart.forEach((item) => {
        if (productId === item.productId) {
            itemInCart = item;
        }
    });
    if (itemInCart) {
        itemInCart.quantity += noOfProduct;
    }
    else {
        cart.push({
            productId: productId,
            quantity: noOfProduct
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity() {
    cart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    cart.forEach((item) => {
        total += item.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = total;
}


const timeOutIds = {};

export function showAddedPopup(productId) {
    document.querySelector(`.added-to-cart-${productId}`).style.opacity = 1;

    if (timeOutIds[productId]) {
        clearTimeout(timeOutIds[productId]);
        timeOutIds[productId] = 0;
    }

    timeOutIds[productId] = setTimeout(() => {
        document.querySelector(`.added-to-cart-${productId}`).style.opacity = 0;
    }, 2000);
}

