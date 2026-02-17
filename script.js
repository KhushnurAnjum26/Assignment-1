const productsContainer = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");
const loading = document.getElementById("loading");
const modal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modal-content");
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartCount.innerText = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showLoading(state) {
  loading.classList.toggle("hidden", !state);
}

async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();

  data.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline capitalize";
    btn.innerText = cat;
    btn.onclick = () => loadByCategory(cat, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function loadProducts() {
  showLoading(true);
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  showLoading(false);

  displayProducts(data);
}

async function loadByCategory(category, btn) {
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
          <button onclick="addToCart(${product.id}, ${product.price})"
            class="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

async function showDetails(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  modalContent.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${product.title}</h2>
    <img src="${product.image}" class="h-40 mx-auto object-contain"/>
    <p class="my-3">${product.description}</p>
    <p class="font-bold">$${product.price}</p>
    <p>⭐ ${product.rating.rate}</p>
    <button onclick="addToCart(${product.id}, ${product.price})"
      class="btn btn-primary mt-4">Add to Cart</button>
  `;

  modal.showModal();
}

function addToCart(id, price) {
  cart.push({ id, price });
  updateCart();
}

function openCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItemsContainer.innerHTML += `
      <div class="flex justify-between mb-2">
        <span>Item ${item.id}</span>
        <div>
          $${item.price}
          <button onclick="removeItem(${index})"
            class="text-red-500 ml-2">❌</button>
        </div>
      </div>
    `;
  });

  totalPriceEl.innerText = total.toFixed(2);
  cartModal.showModal();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  openCart();
}

updateCart();
loadCategories();
loadProducts();
