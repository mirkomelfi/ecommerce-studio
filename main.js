import { products } from "./products.js";

let cart = [];

// Mostrar carrito
function toggleCart() {
  document.getElementById("cart").classList.toggle("visible");
}

document.getElementById("cart-link").addEventListener("click", (e) => {
  e.preventDefault();
  toggleCart();
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("visible");
});

document.addEventListener("click", (e) => {
  const cartEl = document.getElementById("cart");
  const link = document.getElementById("cart-link");
  if (
    !cartEl.contains(e.target) &&
    e.target !== link &&
    cartEl.classList.contains("visible")
  ) {
    cartEl.classList.remove("visible");
  }
});

// 👉 FUNCIONES PARA CARRITO

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartLink = document.getElementById('cart-link');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartLink.textContent = `Cart (${cart.length})`;
}

// 👉 RENDER PRODUCTOS

function renderProducts() {
  const grid = document.querySelector(".product-grid");
  grid.innerHTML = "";

  products.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.category = prod.category;

    card.innerHTML = `
      <img class="product-image" src="${prod.image}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>$${prod.price}</p>
      <button data-id="${prod.id}">Add to Cart</button>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".product-card button").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      addToCart(product);
    });
  });
}

// 👉 FILTRO POR CATEGORÍA

function setupCategoryFilter() {
  const filterButtons = document.querySelectorAll(".category-filter button");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-filter .active")?.classList.remove("active");
      btn.classList.add("active");

      const category = btn.dataset.category;
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 👉 INICIALIZAR
setupCategoryFilter();
renderProducts();
