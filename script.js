// ================= CART STATE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= CART TOGGLE =================
function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

// ================= ADD TO CART =================
function addToCart(name, size, price) {
  const existing = cart.find(item => item.name === name && item.size === size);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }

  saveCart();
  toggleCart();
}

// ================= UPDATE QTY =================
function updateQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

// ================= SAVE + RENDER =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  if (!items || !totalEl) return;

  items.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size}</small>
          <div class="cart-controls">
            <button onclick="updateQty(${index}, -1)">−</button>
            ${item.qty}
            <button onclick="updateQty(${index}, 1)">+</button>
            <span class="remove-item" onclick="removeItem(${index})">❌</span>
          </div>
        </div>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
  });

  totalEl.innerText = "Total: $" + total;
  if (countEl) countEl.innerText = count;
}

// ================= PRODUCTS =================
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
    const product = document.createElement("div");
    product.className = "product";

    product.innerHTML = `
      <img src="https://via.placeholder.com/300x300?text=${encodeURIComponent(name)}">
      <h3>${name}</h3>
      <button onclick="addToCart('${name}','8oz',12)">Add 8oz – $12</button>
      <button onclick="addToCart('${name}','16oz',18)">Add 16oz – $18</button>
    `;

    productsDiv.appendChild(product);
  });
}

// ================= INIT =================
renderCart();
displayProducts();

