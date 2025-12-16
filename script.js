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
  renderCart();
  toggleCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!items) return;

  items.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size} × ${item.qty}</small>
        </div>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
    total += item.price * item.qty;
  });

  totalEl.innerText = `Total: $${total}`;
}

renderCart();
