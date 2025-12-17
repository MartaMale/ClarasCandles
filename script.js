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
  const item = cart.find(i => i.name === name && i.size === size);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, size, price, qty: 1 });
  }
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
  countEl.textContent = count;
}

renderCart();
