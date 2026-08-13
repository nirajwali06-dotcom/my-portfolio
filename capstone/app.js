const app = document.getElementById("app");
const cartCount = document.getElementById("cartCount");

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 79.99,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 39.99,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        price: 24.99,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 59.99,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 29.99,
        image: "https://via.placeholder.com/300"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function showHome() {
    app.innerHTML = `
        <section class="hero">
            <h1>Welcome to Niraj Store</h1>
            <p>Explore our products and add your favorites to the cart.</p>
            <button onclick="location.hash='/products'">
                Shop Now
            </button>
        </section>
    `;
}

function showProducts() {
    app.innerHTML = `
        <h1>Products</h1>

        <div class="products">
            ${products.map(product => `
                <article class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </article>
            `).join("")}
        </div>
    `;
}

function showProduct(id) {
    const product = products.find(item => item.id === id);

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

            <p>
                High-quality product designed for everyday use.
            </p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </section>
    `;
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
                    <button onclick="removeFromCart(${product.id})">
                        Remove
                    </button>
                </article>
            `).join("")}
        </div>
    `;
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (product) {
        cart.push(product);
        saveCart();
        alert("Product added to cart!");
    }
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    saveCart();
    showCart();
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
}

window.addEventListener("hashchange", router);

updateCartCount();
router();
