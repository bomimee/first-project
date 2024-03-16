'use strict'
// html div
const cart = document.querySelector(".cart-container");
const selectContainer = document.querySelector(".product-detail--select");
const inCart = document.querySelector(".product-incart");
const main1 = document.querySelector(".products");
const slideImgContainer = document.querySelector(".slide-img");
const dots = document.querySelector(".dots");
const priceOnScreen = document.querySelector(".product-detail--price");
const brandOnScreen = document.querySelector(".product-heading");
const purchaseContent = document.querySelectorAll(".purchase-content");
// take values
const sizeSelect = document.querySelector(".product-size");
const quantity = document.querySelector(".quantity");
const quantityIncart = document.querySelector(".quantity-incart");
const subtotal = document.querySelector(".subtotal-incart");
// buttons
const btnViewCart = document.querySelector(".btn-cart--viewcart");
const btnCheckout = document.querySelector(".btn-cart--checkout");
const btnMinus = document.querySelector(".product-quantity-minus");
const btnPlus = document.querySelector(".product-quantity-plus");
const btnAddToCart = document.querySelector(".btn-product--1");
const removeItem = document.querySelector(".btn-product--2");
const btnKeepShop = document.querySelector(".btn-product--3");
const btnSlideLeft =document.querySelector(".slider__btn--left");
const btnSlideRight =document.querySelector(".slider__btn--right");
const btnContainer = document.querySelector(".btns-container");
const btnInfo = document.querySelectorAll(".btn-purchase-info");


// variables 
let curImg=0;
let currentProduct = 0;
let item;
//dummy data

const products = [{ id:1, brand:"Supreme", price:50000, img:["supreme1", "supreme2"], style: "black"}];
const pImgs = products[currentProduct].img;
const quan = +quantity.textContent;
const sz = sizeSelect.value;
const id = products[currentProduct].id;
const price = products[currentProduct].price
const data = JSON.parse(localStorage.getItem("item"));

const maxSlide = pImgs.length;
//Text content value


priceOnScreen.textContent = products[currentProduct].price;
brandOnScreen.textContent =products[currentProduct].brand;



class Cart{
    constructor(id, quantity, size, price, subtotal){
        this.id = id;
        this.quantity = quantity;
        this.size = size;
        this.price = price;
        this.subtotal = this.quan * this.price;
    }
}

const quantityMinus = function(){
    quan > 1 && quan--;
    quantity.textContent = quan;
}

const quantityPlus = function(){
    quan++;
    quantity.textContent = quan;    
}

const handlingAddCart = function(){

    item = new Cart(id, quantity, sz, price, subtotal);
    localStorage.setItem("item", JSON.stringify(item));

    handlingShowCart();
}
const handlingShowCart = function(){
    
    cart.style.opacity = "1";
    selectContainer.classList.add("hidden");
    inCart.classList.remove("hidden");
    document.querySelector(".btn-product--1").style.zIndex="-999";

    if(data?.id === products[currentProduct].id){

        quantity.textContent = data.quantity;
        subtotal.textContent = data.subtotal;
    }
        quantityIncart.textContent = quan;
        subtotal.textContent = quan * price;
      
}

const handlingRemoveItem = function(){
    console.log('click');
    
    cart.style.opacity='0';
    inCart.classList.add("hidden");
    document.querySelector(".btn-product--1").style.zIndex="999";
    selectContainer.classList.remove("hidden");
}

handlingShowCart()

//Slider

const slider = function(){ 
    const createImgs = function(img){
        slideImgContainer.innerHTML = "";
        pImgs.forEach((_,i) => {
            slideImgContainer.insertAdjacentHTML('beforeend', `<a href="imgs/${pImgs[i]}-big.png"><img src="imgs/${pImgs[i]}.png" alt="product-img" 
            class="product-imgs" style="transform:translateX(${100 * (i - img)}%)"> </a>`);
        });
    };

const createDots = function(){
    pImgs.forEach((_,i) => {
        dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
});
};


const activeDot = function(img){
document.querySelectorAll('.dots__dot').forEach(dot =>dot.classList.remove('dots__dot--active'));
document.querySelector(`.dots__dot[data-slide="${img}"]`).classList.add('dots__dot--active');
}

const nextImg = function() {
    if(curImg === maxSlide -1) {
        curImg = 0;
    }else{ curImg++;}
    
    createImgs(curImg);
    activeDot(curImg);
}

const prevImg = function() {
    if(curImg === 0) {
        curImg = maxSlide -1;
    }else{ curImg--;}
    
    createImgs(curImg);
    activeDot(curImg);
}

const init = function(){
    createImgs(curImg);
    createDots();
    activeDot(0);
}

init();


btnSlideLeft.addEventListener('click', prevImg);
btnSlideRight.addEventListener('click', nextImg);
document.addEventListener('keydown', function(e){
    e.key ==='ArrowLeft' && prevImg();
    e.key === 'ArrowRight' && nextImg();
});

dots.addEventListener('click', function(e){
 
     if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset;
        console.log(slide);
        createImgs(slide);
        activeDot(slide);
        
     }
})
}

////////////////////////////////////////////////////////functions


///////////////////////////////////////////////////////////////Event Listeners

btnAddToCart.addEventListener("click", handlingAddCart);
btnMinus.addEventListener("click", quantityMinus);
btnPlus.addEventListener("click", quantityPlus);
removeItem.addEventListener("click",handlingRemoveItem);
slider();



btnContainer.addEventListener('click', function(e){
    const clicked = e.target.closest(".btn-purchase-info");
  
    if(!clicked) return;
  
    if(clicked.classList.contains('btn-upward')) {
      clicked.classList.remove("btn-upward");
      document.querySelector(`.purchase-content--${clicked.dataset.content}`).classList.remove("content-active");
    }
    else{
  
        btnInfo.forEach(b=>b.classList.remove("btn-upward"));
        purchaseContent.forEach(c=>c.classList.remove("content-active"));
        
        clicked.classList.add('btn-upward');
        document.querySelector(`.purchase-content--${clicked.dataset.content}`).classList.add("content-active");
      }
  
  });

