let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* OPEN/CLOSE */
function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
  renderCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

/* ADD */
function addToCart(name, size, price) {
  const existing = cart.find(i => i.name === name && i.size === size);
  if (existing) existing.qty += 1;
  else cart.push({ name, size, price, qty: 1 });

  saveCart();
  // open cart after adding
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}

/* CHANGE QTY */
function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

/* SAVE + RENDER */
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

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="cart-row-left">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.size} · $${item.price}</div>
      </div>

      <div class="cart-row-right">
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
        <div class="cart-line-total">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `;
    itemsEl.appendChild(row);
  });

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p style="color:#666; margin-top:10px;">Your cart is empty.</p>`;
  }

  totalEl.textContent = "Total: $" + total.toFixed(2);
  if (countEl) countEl.textContent = count;
}

document.addEventListener("DOMContentLoaded", renderCart);

  totalEl.textContent = "Total: $" + total;
  countEl.textContent = count;
}

renderCart();
