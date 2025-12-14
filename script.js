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

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
}

renderCart();
