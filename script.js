
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

function addToCart(name, size, price) {
  cart.push({ name, size, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCart();
}


function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <span>${item.size}</span>
        </div>
        <span>$${item.price}</span>
      </div>
    `;
    total += item.price;
  });

  cartTotal.innerText = "Total: $" + total;
}


const productsList = [
  "Vanilla Bean","Lavender Calm","Cedarwood Spice","Eucalyptus Mint",
  "Rose Garden","Citrus Sunshine","Ocean Breeze","Pumpkin Spice",
  "Cinnamon Stick","Apple Orchard","Honey Lavender","Jasmine Bloom",
  "Fresh Linen","Sandalwood Vanilla","Tropical Paradise","Peach Nectar",
  "Coconut Breeze","Berry Bliss","Mint Mojito","Pine Forest"
];

function displayProducts() {
  const productsDiv = document.getElementById("products");
  if (!productsDiv) return;

  productsDiv.innerHTML = "";

  productsList.forEach(name => {
    const productEl = document.createElement("div");
    productEl.className = "product";

    productEl.innerHTML = `
      <img src="https://via.placeholder.com/300x300?text=${encodeURIComponent(name)}">
      <h3>${name}</h3>
      <button onclick="addToCart('${name}','8oz',12)">Add 8oz – $12</button>
      <button onclick="addToCart('${name}','16oz',18)">Add 16oz – $18</button>
    `;

    productsDiv.appendChild(productEl);
  });
}

// ================= INIT =================
renderCart();
displayProducts();
