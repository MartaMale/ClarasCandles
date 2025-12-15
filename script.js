// Cart setup
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Toggle cart drawer
function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("open");
}

// Add item to cart
function addToCart(name, size, price) {
  cart.push({ name, size, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCart(); // opens drawer when item added
}

// Render cart items
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
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

// Display cart on page load
renderCart();

// 20 placeholder products with random scents and placeholder images
const productsList = [
  { name: "Vanilla Bean", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Vanilla+Bean" },
  { name: "Lavender Calm", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Lavender+Calm" },
  { name: "Cedarwood Spice", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Cedarwood+Spice" },
  { name: "Eucalyptus Mint", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Eucalyptus+Mint" },
  { name: "Rose Garden", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Rose+Garden" },
  { name: "Citrus Sunshine", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Citrus+Sunshine" },
  { name: "Ocean Breeze", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Ocean+Breeze" },
  { name: "Pumpkin Spice", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Pumpkin+Spice" },
  { name: "Cinnamon Stick", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Cinnamon+Stick" },
  { name: "Apple Orchard", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Apple+Orchard" },
  { name: "Honey Lavender", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Honey+Lavender" },
  { name: "Jasmine Bloom", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Jasmine+Bloom" },
  { name: "Sandalwood Vanilla", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Sandalwood+Vanilla" },
  { name: "Fresh Linen", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Fresh+Linen" },
  { name: "Tropical Paradise", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Tropical+Paradise" },
  { name: "Peach Nectar", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Peach+Nectar" },
  { name: "Coconut Breeze", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Coconut+Breeze" },
  { name: "Berry Bliss", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Berry+Bliss" },
  { name: "Mint Mojito", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Mint+Mojito" },
  { name: "Pine Forest", prices: { "8oz": 12, "16oz": 18 }, img: "https://via.placeholder.com/150?text=Pine+Forest" }
];

// Render products dynamically
function displayProducts() {
  const productsDiv = document.getElementById("products");
  if (!productsDiv) return;

  productsDiv.innerHTML = "";

  productsList.forEach(product => {
    const productEl = document.createElement("div");
    productEl.classList.add("product", "fade-in");

    productEl.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="buttons">
        <button onclick="addToCart('${product.name}', '8oz', ${product.prices['8oz']})">Add 8oz – $${product.prices['8oz']}</button>
        <button onclick="addToCart('${product.name}', '16oz', ${product.prices['16oz']})">Add 16oz – $${product.prices['16oz']}</button>
      </div>
    `;

    productsDiv.appendChild(productEl);
  });
}

// Only run if #products exists
displayProducts();

