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
  if (existing) existing.qty++;
  else cart.push({ name, size, price, qty: 1 });
  saveCart();
  toggleCart();
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
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

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.size}</small><br>
          <button onclick="updateQty(${i},-1)">−</button>
          ${item.qty}
          <button onclick="updateQty(${i},1)">+</button>
          <span onclick="removeItem(${i})">❌</span>
        </div>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
  });

  totalEl.innerText = "Total: $" + total;
  if (countEl) countEl.innerText = count;
}

const scents = [
  "Vanilla Bean","Lavender Calm","Cedarwood Spice","Eucalyptus Mint",
  "Rose Garden","Citrus Sunshine","Ocean Breeze","Pumpkin Spice",
  "Cinnamon Stick","Apple Orchard","Honey Lavender","Jasmine Bloom",
  "Fresh Linen","Sandalwood Vanilla","Tropical Paradise","Peach Nectar",
  "Coconut Breeze","Berry Bliss","Mint Mojito","Pine Forest"
];

function displayProducts() {
  const div = document.getElementById("products");
  if (!div) return;

  scents.forEach(name => {
    div.innerHTML += `
      <div class="product">
        <img src="https://via.placeholder.com/300x300?text=${encodeURIComponent(name)}">
        <h3>${name}</h3>
        <button onclick="addToCart('${name}','8oz',12)">Add 8oz – $12</button>
        <button onclick="addToCart('${name}','16oz',18)">Add 16oz – $18</button>
      </div>
    `;
  });
}

renderCart();
displayProducts();
