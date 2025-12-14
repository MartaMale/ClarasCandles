let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
  displayCart();
}

function displayCart() {
  const cartDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} – $${item.price}</p>`;
    total += item.price;
  });

  totalDiv.innerText = "Total: $" + total;
}

displayCart();
