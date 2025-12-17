let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  renderCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  drawer.classList.contains("open") ? closeCart() : openCart();
}

function addToCart(name, size, price) {
  const item = cart.find(i => i.name === name && i.size === size);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }

  saveCart();
  openCart();
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  if (!itemsEl || !totalEl) return;

  itemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    itemsEl.innerHTML =
      "<p class='empty-cart'>You don’t have any items in your cart yet.</p>";
    totalEl.textContent = "";
    if (countEl) countEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    itemsEl.innerHTML += `
      <div class="cart-row">
        <div class="cart-info">
          <strong>${item.name}</strong>
          <small>${item.size} · $${item.price}</small>
        </div>

        <div class="qty-controls">
          <button onclick="updateQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  totalEl.textContent = "Total: $" + total.toFixed(2);
  if (countEl) countEl.textContent = count;
}

document.addEventListener("DOMContentLoaded", renderCart);
