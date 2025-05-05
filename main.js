let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.product} - $${item.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

document.getElementById('cart-toggle').addEventListener('click', () => {
  document.getElementById('cart').classList.toggle('hidden');
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! 📩');
  e.target.reset();
});
