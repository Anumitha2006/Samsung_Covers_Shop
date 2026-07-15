const samsungBackCoverImage = (label) => `assets/${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.svg`;

const models = {
  'Galaxy S24': {
    image: 'https://m.media-amazon.com/images/I/71jOyQ1HLqL._AC_UY218_.jpg',
    description: 'Flagship slim design with vibrant display and excellent camera quality.',
    covers: [
      { name: 'MagFit Matte Black', price: 1499, color: 'Black', image: 'https://m.media-amazon.com/images/I/71ZnAjtfmFL._AC_UL320_.jpg' },
      { name: 'Clear View+', price: 1299, color: 'Clear', image: 'https://m.media-amazon.com/images/I/71oiJ3vnqCL._AC_UL320_.jpg' },
      { name: 'Leather Luxe', price: 1799, color: 'Brown', image: 'https://m.media-amazon.com/images/I/71DyHc4z2DL._AC_UL320_QL65_.jpg' }
    ]
  },
  'Galaxy S24 Ultra': {
    image: 'https://m.media-amazon.com/images/I/717Q2swzhBL._AC_UY218_.jpg',
    description: 'Premium powerhouse with advanced camera and premium build.',
    covers: [
      { name: 'Armor Grip', price: 1699, color: 'Midnight', image: 'https://m.media-amazon.com/images/I/81TVULP9P6L._AC_UL320_.jpg' },
      { name: 'Crystal Shell', price: 1599, color: 'Transparent', image: 'https://m.media-amazon.com/images/I/61DuU0u8YPL._AC_UL320_.jpg' },
      { name: 'Soft Touch', price: 1899, color: 'Pink', image: 'https://m.media-amazon.com/images/I/61OkPI1T9cL._AC_UY218_.jpg' }
    ]
  },
  'Galaxy Z Flip6': {
    image: 'https://m.media-amazon.com/images/I/71r6Jb6eXvL._AC_UY218_.jpg',
    description: 'Compact foldable design made for style and portability.',
    covers: [
      { name: 'Flip Armor', price: 1399, color: 'Black', image: 'https://m.media-amazon.com/images/I/61qfAGa26pL._AC_UL320_.jpg' },
      { name: 'Smooth Twist', price: 1599, color: 'White', image: 'https://m.media-amazon.com/images/I/61i3AI12CWL._AC_UL320_.jpg' },
      { name: 'MagFit Clear', price: 1799, color: 'Clear', image: 'https://m.media-amazon.com/images/I/61eFYXDCFzL._AC_UL320_.jpg' }
    ]
  },
  'Galaxy Z Fold6': {
    image: 'https://m.media-amazon.com/images/I/61AX088rKpL._AC_UY218_.jpg',
    description: 'Large foldable screen built for multitasking and premium style.',
    covers: [
      { name: 'Fold Guard', price: 1999, color: 'Graphite', image: 'https://m.media-amazon.com/images/I/6139wOaoBpL._AC_UL320_.jpg' },
      { name: 'Textured Shell', price: 2199, color: 'Blue', image: 'https://m.media-amazon.com/images/I/61o9ZhMyRML._AC_UL320_.jpg' },
      { name: 'Luxury Matte', price: 2399, color: 'Black', image: 'https://m.media-amazon.com/images/I/71GVahgJRgL._AC_UL320_.jpg' }
    ]
  },
  'Galaxy A55': {
    image: 'https://m.media-amazon.com/images/I/71eUNTW+nJL._AC_UY218_.jpg',
    description: 'Balanced everyday phone with a sleek premium feel.',
    covers: [
      { name: 'Soft Shield', price: 1099, color: 'Lavender', image: 'https://m.media-amazon.com/images/I/61qfAGa26pL._AC_UL320_.jpg' },
      { name: 'Crystal Case', price: 1199, color: 'Transparent', image: 'https://m.media-amazon.com/images/I/61eFYXDCFzL._AC_UL320_.jpg' },
      { name: 'Urban Shell', price: 1299, color: 'Gray', image: 'https://m.media-amazon.com/images/I/61DuU0u8YPL._AC_UL320_.jpg' }
    ]
  },
  'Galaxy A35': {
    image: 'https://m.media-amazon.com/images/I/71asXBK4i7L._AC_UY218_.jpg',
    description: 'Affordable model with stylish finish and solid protection.',
    covers: [
      { name: 'Cloud Cover', price: 999, color: 'White', image: 'https://m.media-amazon.com/images/I/71ZnAjtfmFL._AC_UL320_.jpg' },
      { name: 'Grip Lite', price: 1099, color: 'Green', image: 'https://m.media-amazon.com/images/I/61i3AI12CWL._AC_UL320_.jpg' },
      { name: 'Royal Shield', price: 1299, color: 'Purple', image: 'https://m.media-amazon.com/images/I/61OkPI1T9cL._AC_UY218_.jpg' }
    ]
  }
};

const CART_STORAGE_KEY = 'samsung-covers-cart-v2';
const PROFILE_STORAGE_KEY = 'samsung-covers-profile-v2';

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function loadCart() {
  try {
    const storage = getStorage();
    if (!storage) return [];
    const saved = storage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {}
}

function loadProfile() {
  try {
    const storage = getStorage();
    if (!storage) return null;
    const saved = storage.getItem(PROFILE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

const cart = loadCart();
let selectedModel = 'Galaxy S24';
let selectedModelData = models[selectedModel];

const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutMessage = document.getElementById('checkoutMessage');
const profileForm = document.getElementById('profileForm');
const profileMessage = document.getElementById('profileMessage');
const modelGrid = document.getElementById('modelGrid');
const coverGrid = document.getElementById('coverGrid');
let cartToastTimer = null;

function renderModels() {
  if (!modelGrid) return;
  modelGrid.innerHTML = '';
  Object.entries(models).forEach(([name, data]) => {
    const card = document.createElement('article');
    card.className = 'model-card';
    card.innerHTML = `
      <img src="${data.image}" alt="${name}" />
      <h3>${name}</h3>
      <p>${data.description}</p>
      <a class="btn primary" href="covers.html?model=${encodeURIComponent(name)}">View Covers</a>
    `;
    modelGrid.appendChild(card);
  });
}

function renderCovers() {
  if (!coverGrid) return;
  coverGrid.innerHTML = '';
  const data = selectedModelData;
  const heading = document.getElementById('coverHeading');
  if (heading) {
    heading.textContent = `${selectedModel} back covers`;
  }
  data.covers.forEach((cover) => {
    const card = document.createElement('article');
    card.className = 'cover-card';
    card.innerHTML = `
      <div class="cover-visual">
        <img src="${cover.image}" alt="${selectedModel} ${cover.name}" />
      </div>
      <h3>${cover.name}</h3>
      <p>${cover.color} finish</p>
      <p class="price">₹${cover.price}</p>
      <button class="btn primary" data-name="${cover.name}" data-price="${cover.price}">Add to Cart</button>
    `;
    coverGrid.appendChild(card);
  });
}

function renderCart() {
  if (cartItems) {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty. Choose a cover to get started.</p>';
    } else {
      cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div>
            <strong>${item.model}</strong>
            <div>${item.name} · ${item.color}</div>
          </div>
          <div style="text-align:right">
            <div>₹${item.price}</div>
            <button data-index="${index}">Remove</button>
          </div>
        `;
        cartItems.appendChild(row);
      });
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cartTotal) {
    cartTotal.textContent = `Total: ₹${total}`;
  }
  if (cartBadge) {
    cartBadge.textContent = cart.length;
  }
  saveCart();
}

function showCartToast(message) {
  const existing = document.getElementById('cartToast');
  if (existing) {
    existing.remove();
  }
  if (cartToastTimer) {
    clearTimeout(cartToastTimer);
  }

  const toast = document.createElement('div');
  toast.id = 'cartToast';
  toast.className = 'cart-toast';
  toast.textContent = message;

  const target = document.querySelector('.page-card, .cart-summary');
  if (target) {
    target.appendChild(toast);
  }

  cartToastTimer = setTimeout(() => {
    toast.remove();
  }, 1800);
}

function addToCart(name, price, color, model) {
  cart.push({ name, price, color, model });
  renderCart();
  showCartToast(`${name} added to cart`);
}

function getSelectedModelFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const model = params.get('model');
  if (model && models[model]) {
    selectedModel = model;
    selectedModelData = models[model];
  }
}

function initShopPage() {
  getSelectedModelFromUrl();
  renderCovers();
}

if (coverGrid) {
  coverGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-name]');
    if (!button) return;
    addToCart(button.dataset.name, Number(button.dataset.price), '', selectedModel);
  });
}

if (cartItems) {
  cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-index]');
    if (!button) return;
    const index = Number(button.dataset.index);
    cart.splice(index, 1);
    renderCart();
  });
}

if (profileForm) {
  const savedProfile = loadProfile();
  if (savedProfile) {
    document.getElementById('customerName').value = savedProfile.name || '';
    document.getElementById('customerEmail').value = savedProfile.email || '';
    document.getElementById('customerPhone').value = savedProfile.phone || '';
    document.getElementById('customerAddress').value = savedProfile.address || '';
  }

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !email || !phone || !address) {
      profileMessage.textContent = 'Please fill in all profile fields.';
      return;
    }

    saveProfile({ name, email, phone, address });
    profileMessage.textContent = `Thanks ${name}! Your profile has been updated.`;
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', async () => {
    const savedProfile = loadProfile();
    const name = savedProfile?.name || document.getElementById('customerName')?.value.trim() || '';
    const email = savedProfile?.email || document.getElementById('customerEmail')?.value.trim() || '';
    const phone = savedProfile?.phone || document.getElementById('customerPhone')?.value.trim() || '';
    const address = savedProfile?.address || document.getElementById('customerAddress')?.value.trim() || '';

    if (!name || !email || !phone || !address) {
      checkoutMessage.textContent = 'Please save your profile before checkout.';
      return;
    }

    if (cart.length === 0) {
      checkoutMessage.textContent = 'Your cart is empty. Add at least one cover.';
      return;
    }

    checkoutMessage.textContent = `Order confirmed locally. Order ID: ORD-${Date.now()}`;
    cart.length = 0;
    saveCart();
    renderCart();
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

renderModels();
initShopPage();
renderCart();
