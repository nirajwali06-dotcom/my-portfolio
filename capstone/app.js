const app = document.getElementById("app");
const cartCount = document.getElementById("cartCount");

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (product) {
    cart.push(product);
    saveCart();
    alert("Product added to cart!");
  }
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  showCart();
}

function showHome() {
  app.innerHTML = `
    <section class="hero">
      <h1>Welcome to Niraj Store</h1>
      <p>Explore our products and add your favorites to the cart.</p>
      <button id="shopBtn">Shop Now</button>
    </section>
  `;

  document.getElementById("shopBtn").onclick = () => {
    location.hash = "/products";
  };
}

function showProducts() {
  app.innerHTML = `
    <h1>Products</h1>
    <div class="products">
      ${products.map(product => `
        <article class="product">
          <a href="#/product/${product.id}">
            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">
          </a>

          <h2>
            <a href="#/product/${product.id}">
              ${product.name}
            </a>
          </h2>

          <p>$${product.price.toFixed(2)}</p>

          <button data-id="${product.id}" class="add-btn">
            Add to Cart
          </button>
        </article>
      `).join("")}
    </div>
  `;

  app.addEventListener("click", handleProductClick);
}

function handleProductClick(event) {
  const button = event.target.closest(".add-btn");

  if (button) {
    addToCart(Number(button.dataset.id));
  }
}

function showProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) {
    app.innerHTML = "<h1>Product not found</h1>";
    return;
  }

  app.innerHTML = `
    <section class="hero">
      <img src="${product.image}"
           alt="${product.name}"
           width="300">

      <h1>${product.name}</h1>
      <h2>$${product.price.toFixed(2)}</h2>

      <p>High-quality product designed for everyday use.</p>

      <button data-id="${product.id}" id="detailAdd">
        Add to Cart
      </button>
    </section>
  `;

  document.getElementById("detailAdd").onclick = () => {
    addToCart(product.id);
  };
}

function showCart() {
  if (cart.length === 0) {
    app.innerHTML = `
      <section class="hero">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <h1>Your Cart</h1>

    <div class="products">
      ${cart.map(product => `
        <article class="product">
          <h2>${product.name}</h2>
          <p>$${product.price.toFixed(2)}</p>
          <button data-id="${product.id}" class="remove-btn">
            Remove
          </button>
        </article>
      `).join("")}
    </div>
  `;

  app.addEventListener("click", handleCartClick);
}

function handleCartClick(event) {
  const button = event.target.closest(".remove-btn");

  if (button) {
    removeFromCart(Number(button.dataset.id));
  }
}

function router() {
  const route = location.hash || "#/";

  if (route === "#/") {
    showHome();
  } else if (route === "#/products") {
    showProducts();
  } else if (route === "#/cart") {
    showCart();
  } else if (route.startsWith("#/product/")) {
    const id = Number(route.split("/")[2]);
    showProduct(id);
  } else {
    showHome();
  }

  updateCartCount();
}

window.addEventListener("hashchange", router);

updateCartCount();
router();
