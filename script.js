const destinations = [
  {
    title: 'Ladakh Explorer',
    destination: 'Ladakh',
    price: 24999,
    duration: 7,
    level: 'Standard',
    description: 'High-altitude lakes, desert landscapes, and cultural monasteries.',
    itinerary: [
      'Arrival in Leh and acclimatization with a scenic sunset walk.',
      'Pangong Lake day trip with mountain views and boating.',
      'Visit Nubra Valley, sand dunes, and local villages.',
      'Explore monasteries, local markets, and Leh Palace.',
      'Drive through the dramatic Chang La pass to Tso Moriri.',
      'Adventure day: biking, hiking, or village discovery.',
      'Relaxed return and farewell dinner at a local guesthouse.'
    ],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Kashmir Panorama',
    destination: 'Kashmir',
    price: 22999,
    duration: 6,
    level: 'Standard',
    description: 'Shikara rides, meadow hikes, and enchanting local bazaars.',
    itinerary: [
      'Arrival in Srinagar and houseboat welcome evening.',
      'Guided shikara tour on Dal Lake and Mughal gardens journey.',
      'Day trip to Gulmarg with gondola ride and alpine walks.',
      'Explore Pahalgam and Aru Valley trekking trail.',
      'Visit local villages and scenic lakesides.',
      'Relax with Kashmiri cuisine and sunset lakeside stroll.'
    ],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Sikkim Serenity',
    destination: 'Sikkim',
    price: 27999,
    duration: 8,
    level: 'Premium',
    description: 'Tea gardens, monasteries, and emerald lakes await your adventure.',
    itinerary: [
      'Arrival in Gangtok and rooftop sunset views.',
      'Visit Rumtek Monastery and local markets.',
      'Day trip to Tsomgo Lake and Baba Mandir.',
      'Relax in Pelling with hiking and mountain vistas.',
      'Explore Yumthang Valley and flower-filled trails.',
      'Cultural immersion in local villages and cuisine.',
      'Leisure day with optional trekking and spa.'
    ],
    image: 'https://www.northeast-india.in/wp-content/uploads/IMG_20250325_121127949.800-1.jpg'
  },
  {
    title: 'Kerala Backwater Escape',
    destination: 'Kerala',
    price: 21999,
    duration: 5,
    level: 'Budget',
    description: 'Houseboats, spice plantations, and tranquil coastal charm.',
    itinerary: [
      'Arrival in Kochi with heritage walk and sunset views.',
      'Houseboat cruise through lush backwaters.',
      'Cultural show and visit to a spice plantation.',
      'Relaxed beach day in Varkala or Kovalam.',
      'Farewell brunch with fresh seafood and tea.'
    ],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'
  }
];

const reviews = [
  {
    name: 'Ayesha',
    rating: 5,
    message: 'The Kashmir tour was magical. The itinerary felt effortless and every stay was exceptional.'
  },
  {
    name: 'Rohan',
    rating: 4,
    message: 'Ladakh exceeded expectations. The immersive visuals and local experiences made it an unforgettable trip.'
  },
  {
    name: 'Priya',
    rating: 5,
    message: 'Sikkim felt so curated and calm. The travel team supported every detail from start to finish.'
  }
];

const blogPosts = [
  {
    title: 'Packing list for mountain travel',
    summary: 'Essential gear, smart layering, and what to bring for Himalayan adventures.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'When to visit Kerala',
    summary: 'The best season for backwaters, festivals, and monsoon-inspired wellness travel.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'How to choose a trek',
    summary: 'Match the route, duration, and elevation to your travel style and comfort level.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'
  }
];

const faqs = [
  {
    question: 'Do I need a permit to visit Ladakh?',
    answer: 'Yes. Indian nationals need an Inner Line Permit (ILP) while foreign nationals need an Protected Area Permit (PAP). We provide documentation guidance in each itinerary.'
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Travel insurance is not included by default, but we offer recommended plans for altitude and medical coverage in every package.'
  },
  {
    question: 'Can I book a package for a custom duration?',
    answer: 'Yes. You can use the contact form or sign in to request a custom itinerary, and we will personalize the schedule.'
  }
];

const promoCodes = [
  { code: 'TRAVEL10', discount: 10 },
  { code: 'CORAL15', discount: 15 }
];

const cardTypes = [
  {
    id: 'visa',
    label: 'VISA',
    requirement: '16-digit card number, 3-digit CVC, and OTP verification.'
  },
  {
    id: 'amex',
    label: 'AMEX',
    requirement: '15-digit card number, 4-digit CID/CVC, and 3D Secure confirmation.'
  },
  {
    id: 'credit',
    label: 'CREDIT',
    requirement: 'Bank-issued credit card with online payments and international usage enabled when needed.'
  }
];

const paymentBanks = [
  {
    id: 'hnb',
    label: 'HNB',
    requirement: 'Hatton National Bank cards require SMS OTP and enabled e-commerce transactions.'
  },
  {
    id: 'boc',
    label: 'BOC',
    requirement: 'Bank of Ceylon cards require 3D Secure enrollment and an active mobile number.'
  },
  {
    id: 'sampath',
    label: 'SAMPATH',
    requirement: 'Sampath cards require Sampath Vishwa/OTP verification for online payments.'
  },
  {
    id: 'peoples',
    label: "PEOPLE'S",
    requirement: "People's Bank cards require SMS OTP and sufficient daily online transaction limit."
  },
  {
    id: 'amana',
    label: 'AMANA BANK',
    requirement: 'Amana Bank cards require OTP verification and online card usage activation.'
  }
];

const adminCredentials = { email: 'admin@ladaktravel.com', password: 'admin123' };

const html = {
  packageGrid: document.getElementById('packageGrid'),
  destinationFilter: document.getElementById('destinationFilter'),
  priceFilter: document.getElementById('priceFilter'),
  durationFilter: document.getElementById('durationFilter'),
  itineraryContent: document.getElementById('itineraryContent'),
  reviewGrid: document.getElementById('reviewGrid'),
  blogGrid: document.getElementById('blogGrid'),
  faqList: document.getElementById('faqList'),
  themeToggle: document.getElementById('themeToggle'),
  openLogin: document.getElementById('openLogin'),
  openLoginAlt: document.getElementById('openLoginAlt'),
  authModal: document.getElementById('authModal'),
  closeAuth: document.getElementById('closeAuth'),
  loginForm: document.getElementById('loginForm'),
  signupForm: document.getElementById('signupForm'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  signupName: document.getElementById('signupName'),
  signupEmail: document.getElementById('signupEmail'),
  signupPassword: document.getElementById('signupPassword'),
  authStatus: document.getElementById('authStatus'),
  adminDashboard: document.getElementById('adminDashboard'),
  adminBookings: document.getElementById('adminBookings'),
  promoList: document.getElementById('promoList'),
  promoForm: document.getElementById('promoForm'),
  promoCode: document.getElementById('promoCode'),
  promoDiscount: document.getElementById('promoDiscount'),
  paymentForm: document.getElementById('paymentForm'),
  payerName: document.getElementById('payerName'),
  payerEmail: document.getElementById('payerEmail'),
  promoInput: document.getElementById('promoInput'),
  cardType: document.getElementById('cardType'),
  bankName: document.getElementById('bankName'),
  cardNumber: document.getElementById('cardNumber'),
  cardExpiry: document.getElementById('cardExpiry'),
  cardCvc: document.getElementById('cardCvc'),
  cardBrandPreview: document.getElementById('cardBrandPreview'),
  bankPreview: document.getElementById('bankPreview'),
  paymentRequirements: document.getElementById('paymentRequirements'),
  paymentAmount: document.getElementById('paymentAmount'),
  receiptCard: document.getElementById('receiptCard'),
  adminLogout: document.getElementById('adminLogout')
};

function formatPrice(amount) {
  return amount.toLocaleString('en-IN');
}

function renderPackages() {
  const destinationOptions = new Set(['all']);
  destinations.forEach(item => destinationOptions.add(item.destination));
  html.destinationFilter.innerHTML = [...destinationOptions].map(value => `
    <option value="${value}">${value}</option>
  `).join('');

  const priceValue = html.priceFilter.value;
  const durationValue = html.durationFilter.value;
  const destinationValue = html.destinationFilter.value;

  const filtered = destinations.filter(pkg => {
    const priceMatch = priceValue === 'all' ||
      (priceValue === 'budget' && pkg.price < 24000) ||
      (priceValue === 'standard' && pkg.price >= 24000 && pkg.price <= 27000) ||
      (priceValue === 'premium' && pkg.price > 27000);
    const durationMatch = durationValue === 'all' ||
      (durationValue === '3-5' && pkg.duration <= 5) ||
      (durationValue === '6-8' && pkg.duration >= 6 && pkg.duration <= 8) ||
      (durationValue === '9+' && pkg.duration >= 9);
    const destinationMatch = destinationValue === 'all' || pkg.destination === destinationValue;
    return priceMatch && durationMatch && destinationMatch;
  });

  html.packageGrid.innerHTML = filtered.map(pkg => `
    <article class="package-card">
      <img src="${pkg.image}" alt="${pkg.title}" />
      <div class="package-meta">${pkg.destination} • ${pkg.duration} days • ${pkg.level}</div>
      <h3>${pkg.title}</h3>
      <p>${pkg.description}</p>
      <div class="package-meta">LKR ${formatPrice(pkg.price)} per person</div>
      <button class="button primary" data-package="${pkg.title}">View itinerary</button>
    </article>
  `).join('');

  document.querySelectorAll('[data-package]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const packageName = event.currentTarget.dataset.package;
      const pkg = destinations.find(item => item.title === packageName);
      if (pkg) {
        renderItinerary(pkg);
        document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function renderItinerary(pkg) {
  html.itineraryContent.innerHTML = `
    <article class="package-card">
      <h3>${pkg.title}</h3>
      <div class="package-meta">${pkg.destination} • ${pkg.duration} Days • LKR ${formatPrice(pkg.price)}</div>
      <p>${pkg.description}</p>
    </article>
  ` + pkg.itinerary.map((day, index) => `
    <article class="itinerary-day">
      <h4>Day ${index + 1}</h4>
      <p>${day}</p>
    </article>
  `).join('');
}

function renderReviews() {
  html.reviewGrid.innerHTML = reviews.map(review => `
    <article class="review-card">
      <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <h3>${review.name}</h3>
      <p>“${review.message}”</p>
    </article>
  `).join('');
}

function renderBlog() {
  html.blogGrid.innerHTML = blogPosts.map(post => `
    <article class="blog-card">
      <img src="${post.image}" alt="${post.title}" />
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
    </article>
  `).join('');
}

function renderFaq() {
  html.faqList.innerHTML = faqs.map((faq, index) => `
    <article class="faq-card" data-faq="${index}">
      <h3>${faq.question}</h3>
      <div class="faq-answer"><p>${faq.answer}</p></div>
    </article>
  `).join('');
  document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
}

function getSelectedCardType() {
  return cardTypes.find(card => card.id === html.cardType.value) || cardTypes[0];
}

function getSelectedBank() {
  return paymentBanks.find(bank => bank.id === html.bankName.value) || paymentBanks[0];
}

function renderPaymentOptions() {
  html.cardType.innerHTML = cardTypes.map(card => `
    <option value="${card.id}">${card.label}</option>
  `).join('');
  html.bankName.innerHTML = paymentBanks.map(bank => `
    <option value="${bank.id}">${bank.label}</option>
  `).join('');
  updatePaymentRequirements();
}

function updatePaymentRequirements() {
  const card = getSelectedCardType();
  const bank = getSelectedBank();
  html.cardBrandPreview.textContent = card.label;
  html.bankPreview.textContent = bank.label;
  html.paymentRequirements.innerHTML = `
    <li>${card.requirement}</li>
    <li>${bank.requirement}</li>
    <li>Cardholder name must match a valid traveler or booking contact.</li>
  `;
  html.cardNumber.maxLength = card.id === 'amex' ? 17 : 19;
  html.cardCvc.maxLength = card.id === 'amex' ? 4 : 3;
  html.cardCvc.placeholder = card.id === 'amex' ? '1234' : '123';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    html.themeToggle.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    html.themeToggle.textContent = 'Dark Mode';
  }
  localStorage.setItem('ladakTheme', theme);
}

function loadTheme() {
  const stored = localStorage.getItem('ladakTheme') || 'light';
  setTheme(stored);
}

function openAuth() {
  html.authModal.classList.remove('hidden');
}

function closeAuth() {
  html.authModal.classList.add('hidden');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.toggle('active', form.id === `${tab}Form`);
  });
  html.authStatus.classList.add('hidden');
}

function getUsers() {
  return JSON.parse(localStorage.getItem('ladakUsers') || '[]');
}

function setUsers(users) {
  localStorage.setItem('ladakUsers', JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('ladakCurrentUser') || 'null');
}

function setCurrentUser(user) {
  localStorage.setItem('ladakCurrentUser', JSON.stringify(user));
}

function showAuthStatus(message, successful = true) {
  html.authStatus.textContent = message;
  html.authStatus.classList.remove('hidden');
  html.authStatus.style.color = successful ? '#d8d8ff' : '#ff9a9a';
}

function handleLogin(event) {
  event.preventDefault();
  const email = html.loginEmail.value.trim();
  const password = html.loginPassword.value.trim();
  const users = getUsers();
  const account = users.find(user => user.email === email && user.password === password);
  if (account || (email === adminCredentials.email && password === adminCredentials.password)) {
    const user = account || { name: 'Admin', email };
    setCurrentUser({ ...user, role: email === adminCredentials.email ? 'admin' : 'traveler' });
    showAuthStatus('Login successful. Redirecting...', true);
    updateUserInterface();
    setTimeout(closeAuth, 900);
  } else {
    showAuthStatus('Invalid login credentials. Please try again.', false);
  }
}

function handleSignup(event) {
  event.preventDefault();
  const name = html.signupName.value.trim();
  const email = html.signupEmail.value.trim();
  const password = html.signupPassword.value.trim();
  const users = getUsers();
  if (users.some(user => user.email === email) || email === adminCredentials.email) {
    showAuthStatus('An account with this email already exists.', false);
    return;
  }
  users.push({ name, email, password, role: 'traveler' });
  setUsers(users);
  setCurrentUser({ name, email, role: 'traveler' });
  showAuthStatus('Account created successfully! You are logged in.', true);
  updateUserInterface();
  setTimeout(closeAuth, 900);
}

function updateUserInterface() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    html.openLogin.textContent = currentUser.name ? `Welcome, ${currentUser.name}` : 'My Account';
    html.openLogin.disabled = true;
    if (currentUser.role === 'admin') {
      html.adminDashboard.classList.remove('hidden');
      renderAdminData();
    }
  } else {
    html.openLogin.textContent = 'Login / Sign Up';
    html.openLogin.disabled = false;
    html.adminDashboard.classList.add('hidden');
  }
}

function renderAdminData() {
  const bookings = JSON.parse(localStorage.getItem('ladakBookings') || '[]');
  html.adminBookings.innerHTML = bookings.length
    ? bookings.map(booking => `
        <div class="admin-item">
          <strong>${booking.name}</strong>
          <p>${booking.package}</p>
          <small>${booking.email}</small>
          ${booking.paymentMethod ? `<small>${booking.paymentMethod} • ${booking.bank}</small>` : ''}
        </div>
      `).join('')
    : '<p>No bookings yet.</p>';
  html.promoList.innerHTML = promoCodes.map(code => `
    <div class="admin-item">
      <strong>${code.code}</strong>
      <p>${code.discount}% discount</p>
    </div>
  `).join('');
}

function handlePromoCreate(event) {
  event.preventDefault();
  const code = html.promoCode.value.trim().toUpperCase();
  const discount = Number(html.promoDiscount.value);
  if (!code || !discount || promoCodes.some(item => item.code === code)) {
    return;
  }
  promoCodes.push({ code, discount });
  html.promoCode.value = '';
  html.promoDiscount.value = '';
  renderAdminData();
}

function findPromo(code) {
  return promoCodes.find(promo => promo.code === code.trim().toUpperCase());
}

function cleanDigits(value) {
  return value.replace(/\D/g, '');
}

function formatCardNumberInput(event) {
  const card = getSelectedCardType();
  const digits = cleanDigits(event.target.value).slice(0, card.id === 'amex' ? 15 : 16);
  const groups = card.id === 'amex'
    ? [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)]
    : digits.match(/.{1,4}/g) || [];
  event.target.value = groups.filter(Boolean).join(' ');
}

function formatExpiryInput(event) {
  const digits = cleanDigits(event.target.value).slice(0, 4);
  event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function formatCvcInput(event) {
  const card = getSelectedCardType();
  event.target.value = cleanDigits(event.target.value).slice(0, card.id === 'amex' ? 4 : 3);
}

function isValidPaymentDetails(card, cardNumber, cvc, expiry) {
  const cardLength = card.id === 'amex' ? 15 : 16;
  const cvcLength = card.id === 'amex' ? 4 : 3;
  const expiryMatch = expiry.match(/^(0[1-9]|1[0-2])\/?(\d{2})$/);
  return cardNumber.length === cardLength && cvc.length === cvcLength && Boolean(expiryMatch);
}

function handlePayment(event) {
  event.preventDefault();
  const name = html.payerName.value.trim();
  const email = html.payerEmail.value.trim();
  const card = getSelectedCardType();
  const bank = getSelectedBank();
  const cardNumber = cleanDigits(html.cardNumber.value);
  const cvc = cleanDigits(html.cardCvc.value);
  const expiry = html.cardExpiry.value.trim();
  if (!name || !email) {
    return;
  }
  if (!isValidPaymentDetails(card, cardNumber, cvc, expiry)) {
    html.receiptCard.classList.remove('hidden');
    html.receiptCard.innerHTML = `
      <h3>Payment details need attention</h3>
      <p>Please check the ${card.label} card number, expiry date, and CVC requirements before paying.</p>
    `;
    return;
  }
  const promo = findPromo(html.promoInput.value);
  let amount = 24999;
  let discountText = 'No discount applied.';
  if (promo) {
    const discount = Math.round(amount * promo.discount / 100);
    amount -= discount;
    discountText = `${promo.discount}% promo applied. You saved LKR${formatPrice(discount)}.`;
  }
  html.paymentAmount.textContent = formatPrice(amount);
  const booking = {
    id: `BK${Date.now()}`,
    name,
    email,
    package: destinations[0].title,
    amount,
    promo: promo ? promo.code : 'None',
    paymentMethod: card.label,
    bank: bank.label,
    cardLast4: cardNumber.slice(-4),
    requirements: [card.requirement, bank.requirement],
    date: new Date().toLocaleDateString()
  };
  const bookings = JSON.parse(localStorage.getItem('ladakBookings') || '[]');
  bookings.unshift(booking);
  localStorage.setItem('ladakBookings', JSON.stringify(bookings));
  showReceipt(booking, discountText);
  if (getCurrentUser()?.role === 'admin') {
    renderAdminData();
  }
}

function showReceipt(booking, discountText) {
  html.receiptCard.classList.remove('hidden');
  html.receiptCard.innerHTML = `
    <h3>Booking Receipt</h3>
    <p><strong>Booking ID:</strong> ${booking.id}</p>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Package:</strong> ${booking.package}</p>
    <p><strong>Payment method:</strong> ${booking.paymentMethod} ending ${booking.cardLast4}</p>
    <p><strong>Issuing bank:</strong> ${booking.bank}</p>
    <p><strong>Total paid:</strong> LKR ${formatPrice(booking.amount)}</p>
    <p><strong>Promo:</strong> ${booking.promo}</p>
    <ul class="requirement-list">
      ${booking.requirements.map(requirement => `<li>${requirement}</li>`).join('')}
    </ul>
    <p>${discountText}</p>
    <p>Thank you for booking with Ladak Adventures. A confirmation email has been queued for delivery.</p>
  `;
}

function handleAdminLogout() {
  localStorage.removeItem('ladakCurrentUser');
  updateUserInterface();
}

html.priceFilter.addEventListener('change', renderPackages);
html.durationFilter.addEventListener('change', renderPackages);
html.destinationFilter.addEventListener('change', renderPackages);
html.themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  setTheme(nextTheme);
});
html.openLogin.addEventListener('click', openAuth);
html.openLoginAlt.addEventListener('click', openAuth);
html.closeAuth.addEventListener('click', closeAuth);
html.loginForm.addEventListener('submit', handleLogin);
html.signupForm.addEventListener('submit', handleSignup);
html.promoForm.addEventListener('submit', handlePromoCreate);
html.paymentForm.addEventListener('submit', handlePayment);
html.adminLogout.addEventListener('click', handleAdminLogout);
html.cardType.addEventListener('change', () => {
  html.cardNumber.value = '';
  html.cardCvc.value = '';
  updatePaymentRequirements();
});
html.bankName.addEventListener('change', updatePaymentRequirements);
html.cardNumber.addEventListener('input', formatCardNumberInput);
html.cardExpiry.addEventListener('input', formatExpiryInput);
html.cardCvc.addEventListener('input', formatCvcInput);

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => switchAuthTab(button.dataset.tab));
});

window.addEventListener('click', (event) => {
  if (event.target === html.authModal) {
    closeAuth();
  }
});

window.addEventListener('load', () => {
  loadTheme();
  renderPaymentOptions();
  renderPackages();
  renderReviews();
  renderBlog();
  renderFaq();
  updateUserInterface();
  renderItinerary(destinations[0]);
});
