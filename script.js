let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, size, price) {
  cart.push({ name, size, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <span>${item.size}</span>
        </div>
        <span>$${item.price}</span>
      </div>
    `;
    total += item.price;
  });

  cartTotal.innerText = "Total: $" + total;
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
}

function addToCart(name, size, price) {
  cart.push({ name, size, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  toggleCart(); // opens drawer when item added
}

function displayCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!items) return;

  items.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    items.innerHTML += `<p>${item.name} (${item.size}) – $${item.price}</p>`;
    total += item.price;
  });

  totalEl.innerText = `Total: $${total}`;
}

displayCart();

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
}

renderCart();
