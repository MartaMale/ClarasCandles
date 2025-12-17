/* ----------------------------
   CART LOGIC (unchanged)
---------------------------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
  renderCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

function addToCart(name, size, price) {
  const existing = cart.find(i => i.name === name && i.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  if (!items) return;

  items.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <p>${item.name} (${item.size}) × ${item.qty}</p>
    `;
  });

  totalEl.textContent = "Total: $" + total;
  if (countEl) countEl.textContent = count;
}

/* ----------------------------
   SHOP PRODUCTS + COLLECTIONS
---------------------------- */

const products = [
  { name: "Vanilla Buttercream", collection: "bestsellers" },
  { name: "Cinnamon Stick", collection: "fall" },
  { name: "Lavender", collection: "all" },
  { name: "Pumpkin Spice", collection: "fall" },
  { name: "Hansel and Gretel", collection: "holiday" },
  { name: "Honeysuckle Jasmine", collection: "summer" },
  { name: "Jamaican Me Crazy", collection: "summer" },
  { name: "Love Spell", collection: "bestsellers" },
  { name: "Coconut Lime Verbena", collection: "summer" },
  { name: "Plumeria", collection: "summer" },
  { name: "Caramel Popcorn", collection: "fall" },
  { name: "Spice Mulberry", collection: "fall" },
  { name: "Mistletoe", collection: "holiday" },
  { name: "Honeydew Melon", collection: "summer" },
  { name: "Peppermint", collection: "holiday" },
  { name: "Apple Harvest", collection: "fall" },
  { name: "Day At The Spa", collection: "bestsellers" }
];

function loadShop() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const filter = params.get("collection") || "all";

  const titleMap = {
    all: "All Candles",
    fall: "Fall Collection",
    holiday: "Holiday Collection",
    summer: "Summer Collection",
    bestsellers: "Best Sellers"
  };

  document.getElementById("collection-title").textContent =
    titleMap[filter] || "All Candles";

  grid.innerHTML = "";

  products
    .filter(p => filter === "all" || p.collection === filter)
    .forEach(p => {
      grid.innerHTML += `
        <div class="product-card">
          <img src="https://via.placeholder.com/400x400?text=${encodeURIComponent(p.name)}">
          <h3>${p.name}</h3>
          <button onclick="addToCart('${p.name}','8oz',12)">8oz – $12</button>
          <button onclick="addToCart('${p.name}','16oz',18)">16oz – $18</button>
        </div>
      `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  loadShop();
});
