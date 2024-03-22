'use strict'
// html div
const cart = document.querySelector(".cart-container");
const selectContainer = document.querySelector(".product-detail--select");
const inCart = document.querySelector(".product-incart");
const slideImgContainer = document.querySelector(".slide-img");
const dots = document.querySelector(".dots");
const purchaseContent = document.querySelectorAll(".purchase-content");
// take values
const sizeSelect = document.querySelector(".product-size");
const quantitySelect = document.querySelector(".quantity");
const quantityIncart = document.querySelector(".quantity-incart");
const subtotal = document.querySelector(".subtotal-incart");
// buttons
const btnViewCart = document.querySelector(".btn-cart--viewcart");
const btnCheckout = document.querySelector(".btn-cart--checkout");
const btnMinus = document.querySelector(".product-quantity-minus");
const btnPlus = document.querySelector(".product-quantity-plus");
const btnAddToCart = document.querySelector(".btn-add");
const removeItem = document.querySelector(".cancel");
const btnKeepShop = document.querySelector(".btn-shopping");
const btnSlideLeft =document.querySelector(".slider__btn--left");
const btnSlideRight =document.querySelector(".slider__btn--right");
const btnContainer = document.querySelector(".btns-container");
const btnInfo = document.querySelectorAll(".btn-purchase-info");
const textCancel= document.querySelector(".text-red");


//dummy data

window.onload = function () {
  // URL에서 쿼리 매개변수 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  
  // 'id' 값 가져오기
  const selectedID = urlParams.get('id');
  
    fetch(`http://localhost:8080/products/${selectedID}`)
    .then(response => response.json())
    .then(product => {
       processData(product);
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
    });
};
 
  // variables 
  
  function processData(product) {
      //Text content value change
      
      let quan = +quantitySelect.textContent;
      let curImg=0;
      const pImgs = product.img;
      const maxSlide = pImgs.length;
      let cartItems;

    document.querySelector(".product-heading").textContent = product.brand;
    document.querySelector(".product-detail--price").textContent = product.price;
    document.querySelector(".product-text").textContent = product.description;

    //Slider
    const slider = function(){ 
        const createImgs = function(img){
            slideImgContainer.innerHTML = "";
            pImgs.forEach((_,i) => {
                slideImgContainer.insertAdjacentHTML('beforeend', `<a href="imgs/${pImgs[i]}-big.png"><img src="../imgs/${pImgs[i]}.png" alt="product-img" 
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
    
    ///////////////////////////////////////////////////////////miniCart
    class Cart{  
        constructor(id, size, price){
            this.id = id;
            this.size = Array.isArray(size) && size.length === 3 ? size : [0, 0, 0]; 
            this.price = price;
        }
    }
    
    ////////////////////////////////////////////////////////functions
    const quantityMinus = function(){
        quan > 1 && quan--;
        quantitySelect.textContent = quan;
    }
    
    const quantityPlus = function(){
        quan++;
        quantitySelect.textContent = quan;    
    }
    
    const handlingExistingItems = function(){
        cartItems = JSON.parse(localStorage.getItem("items"))
        const foundItem = cartItems.find(item=> item.id === product.id);
        if (foundItem) {
            const quantity = foundItem.size.reduce((s, n) => s + n, 0);
            quantityIncart.textContent = quantity;
            subtotal.textContent = quantity * foundItem.price; 
             cart.classList.remove("hidden");
        }
        else  cart.classList.add("hidden");
    }
            
    
    const handlingShowCart = function(){
       
        handlingExistingItems();
            inCart.classList.remove("hidden");
            removeItem.classList.remove("hidden");
            cart.classList.remove("hidden");    
    }
    
    const initializeCart = function(){
        inCart.classList.add("hidden");
        cart.classList.add("hidden");
        removeItem.classList.add("hidden");
    }
    
    const handlingRemoveItem = function(){   
            localStorage.removeItem("items");
            subtotal.textContent = "0";
            quantityIncart.textContent="0";
        initializeCart();
    }
    
    const handlingAddCart = function(){ 
        cartItems = JSON.parse(localStorage.getItem("items")) || [];
        const id = product.id;
        const sq = +quantitySelect.textContent;
        const sz = +sizeSelect.value;
        const price = product.price
        const size = [0,0,0];
        size[sz] = sq;
        const item = new Cart(id, size, price);
        subtotal.textContent = sq * price;
    
        const existingItem = cartItems.findIndex(item => item.id === id);
        if(existingItem !== -1) { cartItems[existingItem].size[sz] += sq;}
    
        else{
            cartItems.push(item);
        }
        
        localStorage.setItem("items", JSON.stringify(cartItems));
        handlingShowCart();
        quan = 1;
        quantitySelect.textContent = quan;
    }
    
    
    ///////////////////////////////////////////////////////////////Executing Functions & Event Listeners
    
    slider();
    localStorage.length > 0 && handlingExistingItems();
    btnAddToCart.addEventListener("click", handlingAddCart);
    btnMinus.addEventListener("click", quantityMinus);
    btnPlus.addEventListener("click", quantityPlus);
    removeItem.addEventListener("click",handlingRemoveItem);
    textCancel.addEventListener("click", handlingRemoveItem);
    
    
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
}

  
  
