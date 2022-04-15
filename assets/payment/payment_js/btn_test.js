"use strict"
function start(){
    // quantityCartTest()
    btnClick();
    renderCart();
    renderQuantity();
    renderCartTotal();
    renderNumberAmount();
    // Render add mobile
    btnClick2();
     // rENDER cOUTTRI
     renderTextCountry();
     renderTextCurrency();
}
start();
function btnClick(){
    var boxAdds = document.querySelectorAll('.box-hover');
    
    var myQuantity = 0;
    boxAdds.forEach(function(boxAdd,index){
        boxAdd.onclick = function(e){
            // console.log(hm[index].querySelector('.productTitleName').innerText)
            e.preventDefault();
            var productItem =   e.target.closest('.container__introduce-two-L');
            var productItemName = productItem.querySelector('.block-item').innerText;
            var productItemPrice = productItem.querySelector('.price-itemCart').innerText;
            var productItemImg = productItem.querySelector('.container__introduce-two-body-img-link').src;
            var myCartItem = new Array(productItemName, productItemPrice,productItemImg);

            // RenderCart
            var myCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : new Array();
            myCart.push(myCartItem);
            localStorage.setItem('cart', JSON.stringify(myCart));
            renderCart();

            // Quantity
            var myQuantity = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')) : 0;
            myQuantity++;
            localStorage.setItem('quantity', JSON.stringify(myQuantity));
            renderQuantity()
        }
    })
}
// Box hover ADD Mobile-Tablet
function btnClick2(){
    var boxAdds = document.querySelectorAll('.box-hover-add-2');
    var myQuantity = 0;
    boxAdds.forEach(function(boxAdd,index){
        boxAdd.onclick = function(e){
            // console.log(hm[index].querySelector('.productTitleName').innerText)
            e.preventDefault();
            alert('Products already in the cart')
            var productItem =   e.target.closest('.container__introduce-two-L');
            var productItemName = productItem.querySelector('.block-item').innerText;
            var productItemPrice = productItem.querySelector('.price-itemCart').innerText;
            var productItemImg = productItem.querySelector('.container__introduce-two-body-img-link').src;
            var myCartItem = new Array(productItemName, productItemPrice,productItemImg);

            // RenderCart
            var myCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : new Array();
            myCart.push(myCartItem);
            localStorage.setItem('cart', JSON.stringify(myCart));
            renderCart();

            // Quantity
            var myQuantity = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')) : 0;
            myQuantity++;
            localStorage.setItem('quantity', JSON.stringify(myQuantity));
            renderQuantity()
        }
    })
}
function renderQuantity(){
    const quantityRender = document.querySelector('.header__sidebar-cart-quantity');
    var quantityString = localStorage.getItem('quantity');
    var numberQuantity;
    if(quantityString !== null){
        numberQuantity = JSON.parse(quantityString);
    }
    else{
        numberQuantity = 0;
    }
    quantityRender.innerHTML = numberQuantity;
}
// Add Cart
function renderCart(){
    var todoList;
    var dataString = localStorage.getItem('cart');
    if(dataString !== null){
        todoList = JSON.parse(dataString);
    }
    else{
        todoList = [];
    }
    const cartBodyRender = document.querySelector('.table-cart-body');
    var tr = document.createElement("tr");
    var div='';
    todoList.forEach(function(todoItem,index){
             div += `<tr class="item_cart-body">
                     <td class="cart_render-img">
                         <img src="${todoItem[2]}" alt="">
                     </td>
                     <td class="cart_render-name">
                         <p class="productTitleName">${todoItem[0]}</p>
                     </td>
                     <td class="cart_render-price">
                         <sup>$</sup><span>${todoItem[1]}</span>
                     </td>
                     <td class="cart_render-input">
                         <input onclick="inputCartItemChange(${index})" class="input-cart-item" type="number" value="1" min="1">
                     </td>
                     <td class="cart_render-btn">
                         <button onclick="deleteCartItem(${index})" class="btn-delete-item-cart">Xóa</button>
                     </td>
                     </tr>`
    })
    // for(var i=0; i<todoList.length; i++){
    // }
                cartBodyRender.innerHTML = div;
    cartTotal();
};
// Delete Cart Item
function deleteCartItem() {
    var deleteCartItems = document.querySelectorAll('.cart_render-btn');
    const quantityRender = document.querySelector('.header__sidebar-cart-quantity');
    deleteCartItems.forEach(function (deleteCartItem,index){
        deleteCartItem.onclick = function(e){
            e.preventDefault();
            // quantityLeave();
            var quantityString = localStorage.getItem('quantity');
            var quantityTest = JSON.parse(quantityString);
            quantityTest--;
            quantityRender.innerHTML = quantityTest
            localStorage.setItem('quantity', JSON.stringify(quantityTest));
            if(e.target.parentElement.parentElement){
                 var todoList;
                 var dataString = localStorage.getItem('cart');
                 if(dataString !== null){
                     todoList = JSON.parse(dataString);
                 }
                 else{
                     todoList = [];
                 }
                e.target.parentElement.parentElement.remove();
                todoList.splice(index,1);
                localStorage.setItem('cart', JSON.stringify(todoList)); 
                localStorage.removeItem('inputAmountList'+index)
            }
            cartTotal();
        }
    })
}
// Total Price
function renderQuantity(){
    const quantityRender = document.querySelector('.header__sidebar-cart-quantity');
    var quantityString = localStorage.getItem('quantity');
    var numberQuantity;
    if(quantityString !== null){
        numberQuantity = JSON.parse(quantityString);
    }
    else{
        numberQuantity = 0;
    }
    quantityRender.innerHTML = numberQuantity;
}
// Cart Total
function cartTotal() {
    var cartItems = document.querySelectorAll('tbody tr');
    var totalPrice = 0;
    var amountInputCartItem;
    for(var i = 0; i < cartItems.length; i++) {
        var numberInputString = localStorage.getItem('amountInputCart'+[i]);
        if(numberInputString !== null){
            amountInputCartItem = JSON.parse(numberInputString);
        }
        else{
            amountInputCartItem = 1;
        }
        var inputPrice= cartItems[i].querySelector('span').innerText;
        var totalPriceItem  = inputPrice * amountInputCartItem;
        totalPrice = totalPrice + totalPriceItem;
    }
    if(totalPrice == 0){
        document.querySelector('.form-cart').classList.add('none');
        document.querySelector('.form-cart').classList.remove('block');
        document.querySelector('.header__sidebar-cart-body-nocart-text').classList.add('block');
        document.querySelector('.header__sidebar-cart-body-nocart-text').classList.remove('none');
    }
    else{
        document.querySelector('.form-cart').classList.remove('none');
        document.querySelector('.form-cart').classList.add('block');
        document.querySelector('.header__sidebar-cart-body-nocart-text').classList.add('none');
        document.querySelector('.header__sidebar-cart-body-nocart-text').classList.remove('block');
    }
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    renderCartTotal();
}
function renderCartTotal(){
    const totalRender = document.querySelector('.totalPrice span');
    var totalString = localStorage.getItem('totalPrice');
    var numberPrice;
    if(totalString !== null){
        numberPrice = JSON.parse(totalString);
    }
    else{
        numberPrice = 0;
    }
    totalRender.innerHTML = numberPrice;
}
// Input Amount Change Item Cart 
function inputCartItemChange(id){
    var inputCartItems = document.querySelectorAll('.input-cart-item');
    localStorage.setItem('amountInputCart'+id, JSON.stringify(parseInt(inputCartItems[id].value)));
    cartTotal();
}
function renderNumberAmount(){
    var amountInputCartItem;
    var listInputCart =  document.querySelectorAll('.input-cart-item');
    for (var i = 0; i < listInputCart.length; i++){
        var numberInputString = localStorage.getItem('amountInputCart'+[i]);
        if(numberInputString !== null){
            amountInputCartItem = JSON.parse(numberInputString);
        }
        else{
            amountInputCartItem = 1;
        }
        document.querySelectorAll('.input-cart-item')[i].value = amountInputCartItem;
    }
}
//  tabmenu click icon 
const iconTabMenuLists = document.querySelectorAll('.header__sidebar-item-plus');
iconTabMenuLists.forEach(function(iconTabMenuList,index){
    iconTabMenuList.onclick = function() { 
            const headerSlibarMobile = document.querySelectorAll('.tabmenu-list-block');
            const headerSlibarMobileChildren = document.querySelectorAll('.tabmenu-list-children-block');
            const headerSlibarMobileBlock = document.querySelectorAll('.tabmenu-list-block.block');
            // const headerSlibarItemList = 
            const iconPlus = document.querySelectorAll('.header__sidebar-item-plus');
                iconPlus[index].classList.toggle('rotate-icon');
                headerSlibarMobile[index].classList.toggle('block');
                // document.querySelectorAll('.header__sidebar-item-list')[index].classlist.toggle('tabmenuItemChildren');
                // headerSlibarMobileChildren[index].classList.toggle('block');
    }
})
// Windown scroll
window.addEventListener('scroll', function(e){
    var scrollProgress = document.querySelector(".progress");
    var progressValue = document.querySelector('.progress-value');
    var pos = document.documentElement.scrollTop;
    var calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollValue = Math.round(pos * 100 / calcHeight);
    scrollProgress.style.background = "conic-gradient(var(--hover-color) " + scrollValue + "%, #ccc " + scrollValue + "%)";
    progressValue.textContent = `${scrollValue}%`;
    if(parseInt(scrollY) == 0){
        document.querySelector('.progress').classList.add('none-progress');
    }
    else{ 
        document.querySelector('.progress').classList.remove('none-progress');
    }
  
})
// Input Search
var headerSidebarSearch = document.querySelector('.header__sidebar-search-icon');
headerSidebarSearch.onclick = function(){
    document.querySelector('.header__sidebar-list').style.display = 'none';
    iconPre.style.display = 'block';
    document.querySelector('.input-search-body').style.display = 'block';
    document.querySelector('.input-search-item').style.opacity = 1;
    document.querySelector('.input-search-item').style.width = 90 +'%';
    document.querySelector('.icon-left-sidebar').style.display = 'block';
    document.querySelector('.input-search-item').style.display = 'block';
    document.querySelector('.text-search-body').style.display = 'block';
    this.style.display = 'none';
}
var iconPre = document.querySelector('.icon-pre');
iconPre.onclick = function(){
    document.querySelector('.header__sidebar-list').style.display = 'flex';
    iconPre.style.display = 'none';
    document.querySelector('.input-search-item').style.display = 'none';
    document.querySelector('.input-search-item').style.width = 0 +'%';
    document.querySelector('.header__sidebar-search-icon').style.display = 'block';
    document.querySelector('.text-search-body').style.display = 'none';
}
// Onclick thanh toán
const paymentBtn = document.querySelector('.btn-payment');
const inputCartItems = document.querySelectorAll('.input-cart-item');
paymentBtn.onclick = function(e) {
        e.preventDefault();
        // confirm('You want to pay?')
        if(confirm('You want to pay?') == true) {
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('cart');
            localStorage.removeItem('quantity');
            inputCartItems.forEach(function(inputCartItem,index) {
                localStorage.removeItem('amountInputCart'+index);
            })
            alert('Your information is pending confirmation')
        }
        else{
            alert('Payment has not been made')
        }
}

// Assign Paypent page


var payment = document.querySelector('.payment');
var paymentchild = document.querySelector('.header__sidebar-cart-body-child');
var paymentMBTL = document.querySelector('.header-payment');
var item1Header = document.querySelector('.header__sidebar-item1');
payment.onclick = function(e){
    e.preventDefault();
    window.location.assign('payment.html');
}

paymentMBTL.onclick = function(e){
    e.preventDefault();
    window.location.assign('payment.html');
}
paymentchild.onclick = function(e){
    e.preventDefault();
    window.location.assign('payment.html');
}
item1Header.onclick = function(e){
    e.preventDefault();
    window.location.assign('index.html');
}

// Assign logo 
var imgLogo = document.querySelector('.header__under-logo-img');
imgLogo.onclick = function(e){
    window.location.assign('index.html');
    document.querySelector('#modal').style.display = 'none';
}

// Onclick language 

const languages = document.querySelectorAll('.header__unit-country-item');
const currencyList = document.querySelectorAll('.header__unit-currency-items');
languages.forEach(function(language,index){
    language.onclick = function(e){
        // imgCountryShow.src = 
        // imgCountryShow.src = language.querySelector('.header__unit-country-list-img').src;
        // textCountryShow.innerHTML = language.querySelector('.header__unit-country-list-language').textContent;
        var imgCountry = language.querySelector('.header__unit-country-list-img').src;
        var textCountry = language.querySelector('.header__unit-country-list-language').textContent;
        var objUnit = {
            img: imgCountry,
            text: textCountry 
        }
        var languageList = localStorage.getItem('languageList') ? JSON.parse(localStorage.getItem('languageList')) : new Array();
        if(languageList.length < 3 ){
            languageList.splice(0,1,objUnit);
        }else if(languageList.length = 0 ){
            languageList.push(objUnit);
        }
        localStorage.setItem('languageList', JSON.stringify(languageList))
        renderTextCountry();
    }
})
function renderTextCountry(){
    var languageList = localStorage.getItem('languageList') ? JSON.parse(localStorage.getItem('languageList')) : new Array();
    const imgCountryShow = document.querySelector('.header__unit-country-img');
    const textCountryShow = document.querySelector('.header__unit-country-language')
    if(languageList.length > 0){
        textCountryShow.innerHTML = languageList[0].text;
        imgCountryShow.src = languageList[0].img;
    }
}
// Curency
currencyList.forEach(function(currencyItem,index){
    currencyItem.onclick = function(e){
        var textCurrency = currencyItem.querySelector('.header__unit-currency-item').textContent;
        var currencyList = localStorage.getItem('currencyList') ? JSON.parse(localStorage.getItem('currencyList')) : new Array();
        if(currencyList.length < 2 ){
            currencyList.splice(0,1,textCurrency);
        }else
            if(languageList.length = 0 ){
                    languageList.push(textCurrency);
            };
            localStorage.setItem('currencyList', JSON.stringify(currencyList))
            renderTextCurrency();
    }
})
function renderTextCurrency(){
    const textCurrencyShow = document.querySelector('.header__unit-currency-language')
    var currencyList = localStorage.getItem('currencyList') ? JSON.parse(localStorage.getItem('currencyList')) : new Array();
    if(currencyList.length > 0){
        textCurrencyShow.innerHTML = currencyList[0];
    }
}

// Language & Curency icon
var windown = window.matchMedia("(max-width: 1024px)")
    const languageItem = document.querySelector('.header__unit-country');
    const currencyItem = document.querySelector('.header__unit-currency');
    if(windown.matches){
        languageItem.onclick = function(e){
            var languageIconUp = document.querySelector('.language-tiup');
            document.querySelector('.header__unit-country-list').classList.toggle('block');
            languageIconUp.classList.toggle('rotate-icon');
        }
        currencyItem.onclick = function(e){
            var currencyIconUp = document.querySelector('.currency-tiup');
            document.querySelector('.header__unit-currency-list').classList.toggle('block');
            currencyIconUp.classList.toggle('rotate-icon');
        }
    }
