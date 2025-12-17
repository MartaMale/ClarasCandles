let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  { name:"Vanilla Buttercream", collection:"bestsellers" },
  { name:"Cinnamon Stick", collection:"fall" },
  { name:"Pumpkin Spice", collection:"fall" },
  { name:"Mistletoe", collection:"holiday" },
  { name:"Peppermint", collection:"holiday" },
  { name:"Coconut Lime Verbena", collection:"summer" },
  { name:"Lavender", collection:"all" },
];

function toggleCart(){
  document.getElementById("cart-drawer").classList.toggle("open");
}

function closeCart(){
  document.getElementById("cart-drawer").classList.remove("open");
}

function addToCart(name){
  cart.push({name, qty:1, price:18});
  saveCart();
}

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  if(!items) return;

  items.innerHTML = "";
  let sum = 0;

  cart.forEach((item,i)=>{
    items.innerHTML += `
      <p>${item.name} (${item.qty})</p>
    `;
    sum += item.price * item.qty;
  });

  total.innerText = "Total: $" + sum;
  document.querySelectorAll("#cart-count").forEach(el=>el.innerText = cart.length);
}

function loadProducts(){
  const grid = document.getElementById("products");
  if(!grid) return;

  const params = new URLSearchParams(window.location.search);
  const filter = params.get("collection");

  products
    .filter(p=> !filter || filter==="all" || p.collection===filter)
    .forEach(p=>{
      grid.innerHTML += `
        <div class="product">
          <img src="https://via.placeholder.com/250">
          <h3>${p.name}</h3>
          <button onclick="addToCart('${p.name}')">Add to Cart</button>
        </div>
      `;
    });
}

renderCart();
loadProducts();
