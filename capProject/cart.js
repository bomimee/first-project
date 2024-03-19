'use strict'

const productImg = document.querySelector('.product-img');
const brand = document.querySelector(".p-brand");
const style =document.querySelector(".p-style");
const quantityEach =document.querySelector(".p-quantity");
const priceEach = document.querySelector(".price-each");
const pSize = document.querySelector(".p-size")
const subtotal = document.querySelector(".subtotal");
const itemsContainer = document.querySelector(".items-in-cart");


// data 가져오기

const cartItems = JSON.parse(localStorage.getItem("items"));

//dummy data
const products = [{ id:1, brand:"Supreme", price:50000, img:["supreme1", "supreme2"], style: "black"}];


//functions

const cartState = function(){
    if(!cartItems || cartItems.length === 0 ) { 

    document.querySelector(".cart-state").insertAdjacentHTML('afterbegin', `
    <p class="empty-cart"> 장바구니가 비었습니다. </p>
    `);
    itemsContainer.classList.add("hidden");
   return;}
  
   cartItems.forEach(item=> {
 //[1,0,1]
    const product = products.find(p=>p.id === item.id);
    const [small, medium, large] = item.size;
    const quantity = item.size.reduce((s, n) => s + n, 0);

 const html = ` 
 <div class="img-box col-1"> <img src="imgs/${product.img[0]}.png" alt="small-product-image" class="product-img"></div>                  
 <div class="order-descriptions col-2">
         <span class="small-label">brand </span><span class="p-brand">${product.brand}</span> <br>
          <span class="small-label">style </span><span class="p-style">${product.style}</span><br>
         <span class="small-label">size </span><span class="p-size">${small !== 0 ? 'small:' + small + ',' : ''}${medium !== 0 ? 'medium:' + medium + ',' : ''}${large !== 0 ? 'large:' + large : ''} </span><br>
         <span class="small-label">quantity </span><span class="p-quantity">${quantity} </span>
 </div>
 <div class="col-3">                             
     <button class="item-remove" data-id="${product.id}">remove</button>
 </div>
 <div class="col-4">
     <span class="price-each">${product.price*quantity} &#8361;</span>
 </div>                              
  `;
  
  subtotal.textContent=`${product.price*quantity}`
  document.querySelector(".cart-state").insertAdjacentHTML('afterbegin', html);
   })
   const remove = document.querySelector(".item-remove");

   const removeItem = function(){
    const selectedItem = parseInt(this.dataset.id);
    const leftItems = cartItems.filter(i=> i.id !== selectedItem);
    localStorage.setItem("items", JSON.stringify(leftItems) );
      this.closest('.cart-state').remove();
    if(leftItems.length===0){
        document.querySelector(".cart-state").insertAdjacentHTML('afterbegin', `
    <p class="empty-cart"> 장바구니가 비었습니다. </p>
    `);
    }
   }
   remove.addEventListener('click', removeItem)
}
cartState();
