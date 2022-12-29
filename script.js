const temp = document.getElementById("template");
const cartShow = document.getElementById("mycart");
const cartHeader = document.getElementById("cart-header");
const cartClose = document.getElementById("cart-close");
const profileLogin = document.getElementById("profile-header");
const productContainer = document.getElementsByClassName("product-container");
const closePopUpBtn = document.getElementById("popup-close");
const modal = document.querySelector(".modal");
const cartValue = document.getElementById("total-cart-value");
let storeData = [];
let cart=[];
// let search = document.getElementById("search-bar");
fetch("https://fakestoreapi.com/products")
.then(res=> res.json())
.then((data)=>{
    // console.log(data);
    storeData=data.map((obj,index)=>{
        const temp = `
        <div class="product-container" id=${index}>
        <div class="product-image"><img src=${obj.image} /></div>
        <div class="product-title">${obj.title}</div>
        <div class="product-price"><h3>${obj.price} $</h3></div>
        <div class="product-rating">${(obj.rating.rate)}/5</div>
        <div class="add-to-cart" onclick="handleCart(${index})">Add to cart <i class="fa-solid fa-cart-plus"></i></div>
        </div>`;
        document.getElementById("list").insertAdjacentHTML("beforeend",temp);
        return obj;
    })
    // console.log(storeData);
}).catch((error)=>{console.log("Error Fetching Data",error)})

function showCart(){
    cartShow.classList.toggle("show");
}
cartHeader.addEventListener("click",showCart);
cartClose.addEventListener("click",showCart);
closePopUpBtn.addEventListener("click",()=>{modal.close()});
profileLogin.addEventListener("click",()=>{modal.showModal()});


const cart_list = document.getElementById("cart-list");

function cartProductContainer(obj){
    let product =`
           <div class="cart-outter">
             <div class="cart-container">
              <div class="cart-image"><img src=${obj.image} /></div>
              <div class="cart-title">${obj.title}</div>
             </div>
             <div>${obj.price} $</div>
             <div class="qty">Qty: <span id="cart-qty">${obj.qty}</span>
              <button class="cart-btn" onclick="cartQtyIncrement(${obj.id})" id="cart-plus">+</button>
              <button class="cart-btn" onclick="cartQtyDecrement(${obj.id})" id="cart-minus">-</button>
              <button class="cart-btn" id="remove" onclick="removeFromCart(${obj.id})">Remove</button>
             </div>
            </div>
        `;
    return product;
}

function addToCart(i){
        let obj = storeData[i];
        obj["qty"] = 1;
        cart.push(obj);
        // let product =`
        //    <div class="cart-outter">
        //      <div class="cart-container">
        //       <div class="cart-image"><img src=${obj.image} /></div>
        //       <div class="cart-title">${obj.title}</div>
        //      </div>
        //      <div class="qty">Qty: <span id="cart-qty">${obj.qty}</span>
        //       <button class="cart-btn" id="cart-plus">+</button>
        //       <button class="cart-btn" id="cart-minus">-</button>
        //       <button class="cart-btn" id="remove" onclick="removeFromCart(${obj.id})">Remove</button>
        //      </div>
        //     </div>
        // `;
        let product = cartProductContainer(obj);
        // console.log(product);
        cart_list.insertAdjacentHTML("beforeend",product);
}

function  calulateCartValue(){
    let total = 0;
    cart.forEach((obj)=>{
        total+=(obj.price*obj.qty);
    })
    console.log(total.toFixed(2));
    cartValue.innerText = total.toFixed(2);
}

function handleCart(i){
    if(cart.length!=0){
        if(cart.includes(storeData[i])){
         alert("Product is already in cart")
         showCart();
        }else{
            addToCart(i);
            calulateCartValue();
            showCart();
            let timeId = setTimeout(()=>{
            showCart();
            },1000)
        }
    }else{
        addToCart(i);
        calulateCartValue();
        showCart();
        let timeId = setTimeout(()=>{
            showCart();
        },1000)
    }
}
function refreshCart(){
    if(cart.length!=0){
      cart.forEach((obj)=>{
            // let product =`
            // <div class="cart-outter">
            //  <div class="cart-container">
            //   <div class="cart-image"><img src=${obj.image} /></div>
            //   <div class="cart-title">${obj.title}</div>
            //  </div>
            //  <div class="qty">Qty: <span id="cart-qty">${obj.qty}</span>
            //   <button class="cart-btn" id="cart-plus">+</button>
            //   <button class="cart-btn" id="cart-minus">-</button>
            //   <button class="cart-btn" id="remove" onclick="removeFromCart(${obj.id})">Remove</button>
            //  </div>
            // </div>
            // `;
            let product = cartProductContainer(obj);
            cart_list.insertAdjacentHTML("beforeend",product);
            // console.log(obj.qty);
        })
    }else{
        cart_list.innerText=null;
    }
}
function removeFromCart(id){
    cart_list.innerText=null;
    console.log(cart,id);
    cart = cart.filter((obj)=>{
        if(obj.id!==id){
            console.log("inside");
            return obj;
        }
    })
    console.log(cart);
    refreshCart();
    calulateCartValue();
}
function cartQtyIncrement(id){
    // console.log(id);
    cart.forEach((obj)=>{
        if(obj.id===id){
            obj["qty"] = obj.qty+1;   
        }
    })
    console.log(cart);
    cart_list.innerText=null;
    refreshCart();
    calulateCartValue();
}
function cartQtyDecrement(id){
    // console.log(id);
    cart.forEach((obj)=>{
        if(obj.id===id){
            if(obj["qty"]>1){
              obj["qty"] = obj.qty-1;
            }else{
                alert("Quantity must be minimum of one")
            }
        }
    })
    // console.log(cart);
    cart_list.innerText=null;
    refreshCart();
    calulateCartValue();
}


const toggle = document.getElementsByClassName("toggle-button");
const navbar = document.getElementById("nav-class");
// console.log(navbar);
toggle[0].addEventListener("click",()=>{navbar.classList.toggle("hide")});

let loader = document.getElementById("preloader");
setTimeout(()=>{
    loader.style.display="none";
},4000)

// window.addEventListener("load",()=>{loader.style.display="none"});
