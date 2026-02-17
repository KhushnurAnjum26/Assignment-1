const productsContainer = document.getElementById("products");
const categoryContainer = document.getElementById("categories");
const cartCount = document.getElementById("cart-count");
const loading = document.getElementById("loading");
const modal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modal-content");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= Load Categories =================
async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();

  data.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline capitalize";
    btn.innerText = cat;
    btn.onclick = () => loadProductsByCategory(cat, btn);
    categoryContainer.appendChild(btn);
  });
}

// ================= Load Products =================
async function loadProducts() {
  showLoading(true);
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  showLoading(false);
  displayProducts(data);
}

async function loadProductsByCategory(category, btn) {
  showLoading(true);

  document.querySelectorAll("#categories button")
    .forEach(b => b.classList.remove("btn-primary"));
  btn.classList.add("btn-primary");

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await res.json();
  showLoading(false);
  displayProducts(data);
}

// ================= Display Products =================
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow";

    card.innerHTML = `
      <figure class="p-4 h-48">
        <img src="${product.image}" class="h-full object-contain"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title text-sm">
          ${product.title.slice(0, 40)}...
        </h2>
        <p class="text-primary font-bold">$${product.price}</p>
        <p class="badge badge-secondary">${product.category}</p>
        <p>⭐ ${product.rating.rate}</p>
        <div class="card-actions justify-between mt-2">
          <button onclick="showDetails(${product.id})"
            class="btn btn-sm btn-outline">Details</button>
          <button onclick="addToCart(${product.id})"
            class="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// ================= Modal =================
async function showDetails(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  modalContent.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${product.title}</h2>
    <img src="${product.image}" class="h-40 mx-auto object-contain"/>
    <p class="my-3">${product.description}</p>
    <p class="font-bold">$${product.price}</p>
    <p>⭐ ${product.rating.rate}</p>
    <button onclick="addToCart(${product.id})"
      class="btn btn-primary mt-4">Add to Cart</button>
  `;

  modal.showModal();
}

// ================= Cart =================
function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.innerText = cart.length;
}

// ================= Loading =================
function showLoading(state) {
  loading.classList.toggle("hidden", !state);
}

// ================= Init =================
updateCartCount();
loadCategories();
loadProducts();
