let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
    function filterDesserts(option) {
        const menuCards = document.querySelectorAll('.menu-card');
        menuCards.forEach(card => {
          if (option === 'all' || option === '') {
            card.style.display = 'block';
          } 
          else if (card.classList.contains(option)) {
            card.style.display = 'block';
          }else {
            card.style.display = 'none';
          }
        });
      }
const heartIcons = document.querySelectorAll('.heart-icon');
const menu=document.querySelectorAll('.menu-card')
heartIcons.forEach(heartIcon => {
  heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('far');
    const menuCard = heartIcon.closest('.menu-card');
    if (menuCard) {
      menuCard.style.backgroundColor = heartIcon.classList.contains('fas') ? 'pink' : '';
      menuCard.style.color = heartIcon.classList.contains('fas') ? 'black' : '';
    }
  });
});
$(document).ready(function() {
  let cartItems = [];

  function addToCart(itemName, itemPrice) {
    let cartItem = {
      name: itemName,
      price: itemPrice
    };
    cartItems.push(cartItem); 
    updateCart();
  }

  function updateCart() {
    let cartTable = $('#cart-table');
    let cartTotal = $('#cart-total'); 
    cartTable.find('tbody').empty();
    cartItems.forEach(function(item, index) {
      let row = $('<tr></tr>');
      row.append('<td>' + item.name + '</td>');
      row.append('<td>$' + item.price.toFixed(2) + '</td>');
      let removeButton = $('<button class="remove-item">Remove</button>').click(function() {
        cartItems.splice(index, 1); 
        updateCart();
      });
      row.append($('<td></td>').append(removeButton));

      cartTable.find('tbody').append(row);
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartTotal.text('$' + totalPrice.toFixed(2));
  }
  $('.cart-icon').click(function() {
    let menuItem = $(this).closest('.menu-card');
    let itemName = menuItem.find('h3').text().trim();
    let itemPriceText = menuItem.find('h4').text().trim();
    let itemPrice = parseFloat(itemPriceText.replace('Price: $', '').trim());
    addToCart(itemName, itemPrice);
  });
});





