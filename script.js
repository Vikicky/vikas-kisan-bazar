// 🌙 Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// 🧑‍🌾 Farmer Login
function loginFarmer() {
  const u = document.getElementById("farmerUsername").value;
  const p = document.getElementById("farmerPassword").value;
  if (u && p) {
    localStorage.setItem("farmer", u);
    alert("Farmer logged in ✅");
  } else {
    alert("Please enter valid farmer credentials");
  }
}

// 🛍️ Retailer Login
function loginRetailer() {
  const u = document.getElementById("retailerUsername").value;
  const p = document.getElementById("retailerPassword").value;
  if (u && p) {
    localStorage.setItem("retailer", u);
    alert("Retailer logged in ✅");
  } else {
    alert("Please enter valid retailer credentials");
  }
}

// 📤 Upload Product (Farmer)
function uploadProduct() {
  const name = document.getElementById("uploadName").value;
  const price = document.getElementById("uploadPrice").value;
  if (name && price) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push({ name, price });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    alert("Product uploaded ✅");
  } else {
    alert("Please enter product name and price");
  }
}

// 🛒 Display Products
function displayProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// 🛒 Add to Cart
function addToCart(index) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// 🛒 Show Cart Items
function showCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
}

// 🧾 Place Order
function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  orders.push(...cart);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify([]));
  alert("Order placed ✅");
  showCart();
  showOrderHistory();
}

// 📜 Show Order History
function showOrderHistory() {
  const historyList = document.getElementById("orderHistoryList");
  historyList.innerHTML = "";
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    historyList.appendChild(li);
  });
}

// 🧼 Admin Clear All
function clearAll() {
  if (confirm("Are you sure to clear ALL data?")) {
    localStorage.clear();
    displayProducts();
    showCart();
    showOrderHistory();
    showReviews();
    alert("All data cleared 🔥");
  }
}

// 🔍 Text Search Filter
function searchProduct() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  products
    .filter((p) => p.name.toLowerCase().includes(input))
    .forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      `;
      container.appendChild(card);
    });
}

// 🎤 Voice Search
function startVoiceSearch() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice search not supported in this browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    document.getElementById("voiceResult").innerText = "You said: " + result;
    document.getElementById("searchInput").value = result;
    searchProduct();
  };
}

// 🔄 Category Filter
function filterByCategory(category) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  const filtered = category === "all" ? products : products.filter(p => p.name.toLowerCase().includes(category));
  filtered.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// ⭐ Review System
function submitReview() {
  const rating = document.getElementById("rating").value;
  const text = document.getElementById("reviewText").value;
  if (!rating || !text) {
    alert("Please fill rating and feedback");
    return;
  }
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviews.push({ rating, text });
  localStorage.setItem("reviews", JSON.stringify(reviews));
  alert("Thanks for your feedback!");
  showReviews();
}

// 🧾 Show Reviews
function showReviews() {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviews.forEach((r) => {
    const li = document.createElement("li");
    li.innerHTML = `⭐ ${r.rating}/5 - ${r.text}`;
    reviewList.appendChild(li);
  });
}

// 📡 Offline Detection
window.addEventListener("offline", () => {
  document.getElementById("offlineBanner").style.display = "block";
});
window.addEventListener("online", () => {
  document.getElementById("offlineBanner").style.display = "none";
});

// 🌍 Language Switcher (Basic Static)
function changeLanguage(lang) {
  alert("Language switched to: " + lang + " (demo only)");
}

// 🔄 Loader Hide After Load
window.onload = () => {
  document.getElementById("loader").style.display = "none";
  displayProducts();
  showCart();
  showOrderHistory();
  showReviews();
};
