// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Toggle mobile menu
document.getElementById("mobile-menu-button").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

// Open cart
document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

function openCart() {
  document.getElementById("cart-sidebar").classList.remove("translate-x-full");
  document.getElementById("cart-overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-sidebar").classList.add("translate-x-full");
  document.getElementById("cart-overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  renderCart();
  showNotification("Producto añadido al carrito");
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center";
  notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i><span>${message}</span>`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300"
    );
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");

  cartCount.textContent = count;
  cartCount.classList.toggle("hidden", count === 0);
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-gray-500 text-center py-10">Tu carrito está vacío</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
            <div class="flex items-center py-4 border-b">
                <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                    <img src="${item.image}" alt="${
          item.name
        }" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800">${item.name}</h4>
                    <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center">
                    <button onclick="updateQuantity(${index}, -1)" class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded flex items-center justify-center"><i class="fas fa-minus text-xs"></i></button>
                    <span class="mx-2">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded flex items-center justify-center"><i class="fas fa-plus text-xs"></i></button>
                    <button onclick="removeItem(${index})" class="ml-4 text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
      )
      .join("");
  }

  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById("cart-total").textContent = `$${(
    subtotal + 15
  ).toFixed(2)}`;
}

function updateQuantity(index, change) {
  const newQuantity = cart[index].quantity + change;

  if (newQuantity < 1) {
    removeItem(index);
  } else {
    cart[index].quantity = newQuantity;
    saveCart();
    updateCartCount();
    renderCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  alert("Redirigiendo al proceso de pago...");
}

// Guardar y cargar el carrito en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  renderCart();
}

// Ejecutar la carga del carrito al inicio
document.addEventListener("DOMContentLoaded", loadCart);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
      document.getElementById("mobile-menu").classList.add("hidden");
    }
  });
});

// Código para el menú de idioma
document
  .getElementById("language-menu-button")
  .addEventListener("click", () => {
    document.getElementById("language-menu").classList.toggle("hidden");
  });

document.addEventListener("click", (event) => {
  const menu = document.getElementById("language-menu");
  const button = document.getElementById("language-menu-button");
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.add("hidden");
  }
});
