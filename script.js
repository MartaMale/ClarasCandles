let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

function addToCart(name, size, price) {
  const item = cart.find(i => i.name === name && i.size === size);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }
  saveCart();
  toggleCart();
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  if (!items) return;

  items.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, i) => {
    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size}</small>
          <div class="qty-controls">
            <button onclick="updateQty(${i}, -1)">−</button>
            ${item.qty}
            <button onclick="updateQty(${i}, 1)">+</button>
          </div>
        </div>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
    total += item.price * item.qty;
    count += item.qty;
  });

  totalEl.innerText = "Total: $" + total;
  countEl.innerText = count;
}

renderCart();
