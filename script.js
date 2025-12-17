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
  const existing = cart.find(i => i.name === name && i.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }
  saveCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
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

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size}</small>
        </div>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
  });

  totalEl.textContent = "Total: $" + total;
  if (countEl) countEl.textContent = count;
}

renderCart();
