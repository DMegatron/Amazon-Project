// import {cart} from '../data/cart.js'

let cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);
import { products } from '../data/products.js';

// let cart = [
//     { Id: '901eb2ca-386d-432e-82f0-6fb1ee7bf969', quantity: 1 },
//     { Id: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9', quantity: 1 },
//     { Id: 'c2a82c5e-aff4-435f-9975-517cfaba2ece', quantity: 1 } 
// ]


let orderSummary = '';
let totalQuantity = 0;
let finalPrice = 0;
let productToAdd;
// console.log("test1");

// console.log(cart);


function finalPriceCalc() {
    finalPrice = 0;
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((product) => {
        products.forEach((p) => {
            if (p.id === product.productId) {
                finalPrice += ((p.priceCents / 100) * product.quantity);
            }
        });
    });
}


cart.forEach((product) => {
    // console.log("test3");
    products.forEach((p) => {
        if (p.id === product.productId) {
            productToAdd = p;
            // console.log(productToAdd);
        }
    });
    totalQuantity += product.quantity;
    orderSummary += `
            <div class="cart-item-container-${productToAdd.id}">
                    <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                    </div>

                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src=${productToAdd.image}>

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${productToAdd.name}
                        </div>
                        <div class="product-price">
                        $${(productToAdd.priceCents / 100)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${product.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary" data-product-id="${productToAdd.id}">
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${productToAdd.id}">
                        <div>
                            <div class="delivery-option-date">
                            Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                            FREE Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="${productToAdd.id}">
                        <div>
                            <div class="delivery-option-date">
                            Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                            $4.99 - Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="${productToAdd.id}">
                        <div>
                            <div class="delivery-option-date">
                            Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                            $9.99 - Shipping
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        `;
});

document.querySelector('.order-summary').innerHTML = orderSummary;

calculateCart();

export function calculateCart() {
    finalPriceCalc();
    document.querySelector('.payment-summary').innerHTML = `
        <div class="payment-summary">
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (${totalQuantity}):</div>
                    <div class="payment-summary-money">$${finalPrice}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$4.99</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${(finalPrice + 4.99).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${((finalPrice + 4.99) * 0.1).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${((finalPrice + 4.99) + ((finalPrice + 4.99) * 0.1)).toFixed(2)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
                </div>
            ` ;
    document.querySelector('.checkout-header-middle-section').innerHTML = "Checkout (" + totalQuantity + " items)";
}




document.querySelectorAll('.delete-quantity-link')
    .forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            console.log('debug');
            const id = deleteBtn.dataset.productId;
            console.log(deleteBtn.dataset.productId);
            document.querySelector(`.cart-item-container-${id}`).remove();
            cart = cart.filter(item => item.productId !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
            calculateCart();
        });
    });

