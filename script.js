let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
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
    total += item.price;
    count += 1;

    items.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price}</span>
      </div>
    `;
  });

  totalEl.textContent = "Total: $" + total;
  countEl.textContent = count;
}

document.addEventListener("DOMContentLoaded", renderCart);
