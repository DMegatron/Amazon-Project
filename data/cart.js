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

let timeOutId;

export function showAddedPopup(productId) {
    document.querySelector(`.added-to-cart-${productId}`).style.opacity = 1;

    if (timeOutId) {
        clearTimeout(timeOutId);
        timeOutId = 0;
    }

    timeOutId = setTimeout(() => {
        document.querySelector(`.added-to-cart-${productId}`).style.opacity = 0;
    }, 3000);
}

