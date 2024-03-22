"use strict"

const itemSelect = function (e) {
  const select = e.target.closest(".product-box");
  const selectID = select.dataset.item;
  const detailPageURL = `index.html?id=${selectID}`;
 
  window.location.href = detailPageURL;
  
}
const container = document.querySelector(".entire-products");
const getData = function () {
  fetch('http://localhost:8080/products')
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then(data => {
      console.log(data); // Optional: Log the data received
      
      data.forEach(item => {
        const html = `<div class="product-box" data-item="${item.id}">
          <img src="imgs/${item.img[0]}.png" alt="" class="item-img">
          <h2 class="item-name">${item.brand}</h2>
        </div>`;     
        container.insertAdjacentHTML("afterbegin", html);
      });
       const imgs = data.map(item => document.querySelector(`[data-item="${item.id}"] .item-img`));
      imgs.forEach(img => img.addEventListener("click", itemSelect));

    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  
};

getData();


