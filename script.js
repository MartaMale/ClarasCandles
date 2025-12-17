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

function addToCart(name) {
  const item = cart.find(c => c.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, qty: 1 });
  }
  saveCart();
}

function updateQty(name, change) {
  const item = cart.find(c => c.name === name);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.name !== name);
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  container.innerHTML = "";

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button onclick="updateQty('${item.name}', -1)">−</button>
        ${item.qty}
        <button onclick="updateQty('${item.name}', 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  count.textContent = totalItems;
}

renderCart();
