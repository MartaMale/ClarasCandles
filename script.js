
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}


function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.innerText = totalQty;
}


function addToCart(name, size, price) {
  const existing = cart.find(
    item => item.name === name && item.size === size
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCart();
}


function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!itemsEl || !totalEl) return;

  itemsEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="empty-cart">You don’t have any items in your cart yet.</p>`;
    totalEl.innerHTML = "";
    updateCartCount();
    return;
  }

  cart.forEach((item, index) => {
    total += item.qty * item.price;

    itemsEl.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size}</small>
        </div>

        <div class="cart-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <div class="cart-price">
          $${(item.qty * item.price).toFixed(2)}
        </div>
      </div>
    `;
  });

  totalEl.innerHTML = `
    <div class="cart-total-line">
      <strong>Total: $${total.toFixed(2)}</strong>
    </div>
    <a href="checkout.html" class="checkout-btn">
      Proceed to Checkout
    </a>
  `;

  updateCartCount();
}


renderCart();
updateCartCount();

