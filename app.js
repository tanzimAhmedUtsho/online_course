const courses = [
  {
    id: 1,
    title: "Complete HTML, CSS & JavaScript Mastery",
    category: "web",
    level: "Beginner",
    price: 3200,
    discount: 40,
    rating: 4.9,
    lessons: 84,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Tailwind CSS Premium UI Design",
    category: "design",
    level: "Intermediate",
    price: 2500,
    discount: 35,
    rating: 4.8,
    lessons: 48,
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Freelancing Marketplace Success",
    category: "business",
    level: "All levels",
    price: 1800,
    discount: 0,
    rating: 4.7,
    lessons: 36,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "AI Tools for Students & Creators",
    category: "ai",
    level: "Beginner",
    price: 0,
    discount: 100,
    rating: 4.9,
    lessons: 22,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Digital Marketing Ads Blueprint",
    category: "marketing",
    level: "Intermediate",
    price: 2200,
    discount: 25,
    rating: 4.6,
    lessons: 42,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Figma to Website Workflow",
    category: "design",
    level: "Advanced",
    price: 3000,
    discount: 45,
    rating: 4.8,
    lessons: 52,
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "JavaScript Projects Bootcamp",
    category: "web",
    level: "Intermediate",
    price: 0,
    discount: 100,
    rating: 4.8,
    lessons: 30,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Small Business Growth System",
    category: "business",
    level: "All levels",
    price: 2600,
    discount: 30,
    rating: 4.7,
    lessons: 40,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    title: "Facebook & Google Ads Practical",
    category: "marketing",
    level: "Beginner",
    price: 0,
    discount: 100,
    rating: 4.5,
    lessons: 18,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
];

const ads = [
  {
    title: "Domain + Hosting Bundle",
    tag: "Sponsor",
    icon: "server",
    text: "Course student der jonno starter hosting package e special rate.",
  },
  {
    title: "Laptop Upgrade Deal",
    tag: "Tech Ad",
    icon: "laptop",
    text: "Coding, design and video editing er jonno selected laptop offer.",
  },
  {
    title: "Certificate Printing",
    tag: "Student Ad",
    icon: "award",
    text: "Premium hard-copy certificate print and delivery service.",
  },
  {
    title: "Skill Test Challenge",
    tag: "Promo",
    icon: "target",
    text: "Weekly quiz e top 10 student pachhe free premium class.",
  },
  {
    title: "Portfolio Review",
    tag: "Mentor Ad",
    icon: "briefcase",
    text: "Expert mentor diye CV, portfolio and gig profile review.",
  },
  {
    title: "Internet Pack Offer",
    tag: "Partner",
    icon: "wifi",
    text: "Online class streaming er jonno student-friendly data pack.",
  },
];

let selectedCategory = "all";
let searchTerm = "";
let authMode = "register";
let currentUser = null;
const enrolled = new Set(
  JSON.parse(localStorage.getItem("utsho_enrolled") || "[]"),
);

const money = (value) =>
  value === 0 ? "Free" : `BDT ${value.toLocaleString("en-US")}`;
const finalPrice = (course) =>
  Math.round(course.price - course.price * (course.discount / 100));
const courseProgress = (id) => (enrolled.has(id) ? 18 + ((id * 11) % 62) : 0);
const getUsers = () => JSON.parse(localStorage.getItem("utsho_users") || "[]");
const saveUsers = (users) =>
  localStorage.setItem("utsho_users", JSON.stringify(users));
const getReviews = () =>
  JSON.parse(localStorage.getItem("utsho_reviews") || "[]");
const saveReviews = (reviews) =>
  localStorage.setItem("utsho_reviews", JSON.stringify(reviews));
const getChatMessages = () =>
  JSON.parse(localStorage.getItem("utsho_chat") || "[]");
const saveChatMessages = (messages) =>
  localStorage.setItem("utsho_chat", JSON.stringify(messages));
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );

function init() {
  const loggedIn = localStorage.getItem("utsho_logged_in") === "true";
  const savedEmail = localStorage.getItem("utsho_email");
  const savedUser = getUsers().find((user) => user.email === savedEmail);
  if (loggedIn && savedUser) unlockApp(savedUser);
  if (loggedIn && !savedUser) localStorage.removeItem("utsho_logged_in");
  if (getUsers().length > 0) setAuthMode("login");

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);
  document
    .getElementById("registerTab")
    .addEventListener("click", () => setAuthMode("register"));
  document
    .getElementById("loginTab")
    .addEventListener("click", () => setAuthMode("login"));
  document
    .getElementById("forgotPasswordBtn")
    .addEventListener("click", () => setAuthMode("forgot"));
  document
    .getElementById("backToLoginBtn")
    .addEventListener("click", () => setAuthMode("login"));
  document
    .getElementById("studentName")
    .addEventListener("click", openProfileModal);
  document
    .getElementById("profileClose")
    .addEventListener("click", closeProfileModal);
  document.getElementById("profileModal").addEventListener("click", (event) => {
    if (event.target.id === "profileModal") closeProfileModal();
  });
  document
    .getElementById("reviewForm")
    .addEventListener("submit", handleReviewSubmit);
  document.getElementById("chatToggle").addEventListener("click", toggleChat);
  document.getElementById("chatClose").addEventListener("click", toggleChat);
  document
    .getElementById("chatForm")
    .addEventListener("submit", handleChatSubmit);
  document.getElementById("searchInput").addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase();
    renderCourses();
  });
  document.getElementById("shuffleAds").addEventListener("click", renderAds);

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      selectedCategory = button.dataset.filter;
      renderCourses();
    });
  });

  renderCourses();
  renderDeals();
  renderFreeCourses();
  renderAds();
  renderReviewOptions();
  renderReviews();
  renderChat();
  refreshIcons();
}

function handleLogin(event) {
  event.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  const error = document.getElementById("loginError");

  if (
    !email.includes("@") ||
    password.length < 4 ||
    (authMode === "register" && name.length < 2)
  ) {
    const message =
      authMode === "register"
        ? "Name, valid email and 4 character password diye register korun."
        : "Valid email and minimum 4 character password din.";
    showAuthError(message);
    return;
  }

  const users = getUsers();
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (authMode === "register") {
    if (existingUser) {
      showAuthError(
        "Ei email already registered. Login tab theke login korun.",
      );
      setAuthMode("login");
      return;
    }

    const user = { name, email, password, joined: new Date().getFullYear() };
    users.push(user);
    saveUsers(users);
    setAuthMode("login");
    document.getElementById("emailInput").value = email;
    document.getElementById("passwordInput").value = "";
    showToast("Registration complete. Ebar login korun");
    return;
  }

  if (authMode === "forgot") {
    if (!existingUser) {
      showAuthError("Ei email registered na. Age registration korun.");
      setAuthMode("register");
      return;
    }

    existingUser.password = password;
    saveUsers(users);
    setAuthMode("login");
    document.getElementById("emailInput").value = existingUser.email;
    document.getElementById("passwordInput").value = "";
    showToast("Password reset complete. Ebar login korun");
    return;
  }

  if (!existingUser) {
    showAuthError("Ei email registered na. Age registration korun.");
    setAuthMode("register");
    return;
  }

  if (existingUser.password !== password) {
    showAuthError("Password match koreni. Registered password diye try korun.");
    return;
  }

  error.classList.add("hidden");
  completeAuth(existingUser, "Login successful");
}

function completeAuth(user, message) {
  localStorage.setItem("utsho_logged_in", "true");
  localStorage.setItem("utsho_email", user.email);
  unlockApp(user);
  showToast(message);
}

function handleLogout() {
  localStorage.removeItem("utsho_logged_in");
  currentUser = null;
  document.getElementById("loginGate").classList.remove("hidden");
  document.getElementById("app").classList.add("opacity-0");
  document.getElementById("studentName").classList.add("hidden");
  document.getElementById("studentName").classList.remove("inline-flex");
  closeProfileModal();
  document.getElementById("chatWidget").classList.add("hidden");
  document.getElementById("chatPanel").classList.add("hidden");
  showToast("Logged out");
}

function unlockApp(user) {
  currentUser = user;
  document.getElementById("loginGate").classList.add("hidden");
  document.getElementById("app").classList.remove("opacity-0");
  document.getElementById("chatWidget").classList.remove("hidden");
  document.getElementById("studentName").classList.remove("hidden");
  document.getElementById("studentName").classList.add("inline-flex");
  document.getElementById("studentName").textContent =
    user.name || user.email.split("@")[0];
  renderProfile();
  renderProgressChart();
  renderChat();
}

function openProfileModal() {
  if (!currentUser) return;
  renderProfile();
  renderProgressChart();
  document.getElementById("profileModal").classList.remove("hidden");
  refreshIcons();
}

function closeProfileModal() {
  document.getElementById("profileModal").classList.add("hidden");
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";
  document.getElementById("registerTab").classList.toggle("active", isRegister);
  document
    .getElementById("loginTab")
    .classList.toggle("active", mode === "login");
  document.getElementById("nameField").classList.toggle("hidden", !isRegister);
  document.getElementById("nameInput").required = isRegister;
  document
    .getElementById("forgotRow")
    .classList.toggle("hidden", mode !== "login");
  document
    .getElementById("backToLoginBtn")
    .classList.toggle("hidden", !isForgot);
  document.getElementById("authTitle").textContent = isRegister
    ? "Register first"
    : isForgot
      ? "Reset password"
      : "Login required";
  document.getElementById("passwordLabel").textContent = isForgot
    ? "New password"
    : "Password";
  document.getElementById("passwordInput").placeholder = isForgot
    ? "Set a new password"
    : "Minimum 4 characters";
  document.getElementById("authButtonText").textContent = isRegister
    ? "Create Account"
    : isForgot
      ? "Reset Password"
      : "Login & Unlock";
  document
    .getElementById("authButtonIcon")
    .setAttribute(
      "data-lucide",
      isRegister ? "user-plus" : isForgot ? "key-round" : "log-in",
    );
  document.getElementById("loginError").classList.add("hidden");
  refreshIcons();
}

function showAuthError(message) {
  const error = document.getElementById("loginError");
  error.textContent = message;
  error.classList.remove("hidden");
}

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  const list = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm) ||
      course.level.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML =
    list.map(courseCard).join("") || emptyState("No course found.");
  bindEnrollButtons();
  renderProfile();
  renderProgressChart();
  refreshIcons();
}

function renderDeals() {
  const deals = courses
    .filter((course) => course.discount > 0 && course.price > 0)
    .slice(0, 3);
  document.getElementById("dealGrid").innerHTML = deals
    .map(
      (course) => `
        <article class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div class="mb-4 flex items-center justify-between">
            <span class="badge bg-gold text-ink">${course.discount}% OFF</span>
            <i data-lucide="flame" class="h-6 w-6 text-fire"></i>
          </div>
          <h3 class="text-xl font-black">${course.title}</h3>
          <p class="mt-3 text-sm leading-6 text-white/60">${course.lessons} lessons | ${course.level} | Lifetime access</p>
          <div class="mt-5 flex items-end justify-between">
            <div>
              <p class="text-sm font-bold text-white/45 line-through">${money(course.price)}</p>
              <p class="text-3xl font-black text-gold">${money(finalPrice(course))}</p>
            </div>
            <button class="enroll-btn rounded-lg bg-white px-4 py-3 font-black text-ink" data-id="${course.id}">Claim</button>
          </div>
        </article>
      `,
    )
    .join("");
  bindEnrollButtons();
  refreshIcons();
}

function renderFreeCourses() {
  const freeCourses = courses
    .filter((course) => course.price === 0)
    .slice(0, 4);
  document.getElementById("freeGrid").innerHTML = freeCourses
    .map(courseCard)
    .join("");
  bindEnrollButtons();
  refreshIcons();
}

function renderProfile() {
  if (!currentUser) return;
  const enrolledCourses = courses.filter((course) => enrolled.has(course.id));
  const joined = currentUser.joined || "2026";
  document.getElementById("profileAvatar").textContent = (
    currentUser.name ||
    currentUser.email ||
    "U"
  )
    .charAt(0)
    .toUpperCase();
  document.getElementById("profileName").textContent =
    currentUser.name || currentUser.email.split("@")[0];
  document.getElementById("profileEmail").textContent = currentUser.email;
  document.getElementById("profileJoined").textContent =
    `Member since ${joined}`;
  document.getElementById("profileCourses").textContent =
    `${enrolledCourses.length} enrolled courses`;
}

function renderProgressChart() {
  const chart = document.getElementById("progressChart");
  const enrolledCourses = courses.filter((course) => enrolled.has(course.id));

  if (!enrolledCourses.length) {
    document.getElementById("overallProgress").textContent = "0%";
    chart.innerHTML = `
      <div class="rounded-lg border border-white/10 bg-white/10 p-6 text-center">
        <i data-lucide="bar-chart-3" class="mx-auto h-10 w-10 text-gold"></i>
        <p class="mt-3 font-black">No enrolled course yet</p>
        <p class="mt-1 text-sm font-semibold text-white/50">Enroll korlei ekhane progress chart dekhabe.</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  const total = enrolledCourses.reduce(
    (sum, course) => sum + courseProgress(course.id),
    0,
  );
  const average = Math.round(total / enrolledCourses.length);
  document.getElementById("overallProgress").textContent = `${average}%`;
  chart.innerHTML = enrolledCourses
    .map((course) => {
      const progress = courseProgress(course.id);
      return `
        <div class="chart-row">
          <div class="flex items-center justify-between gap-3 text-sm font-black">
            <span>${course.title}</span>
            <span class="text-gold">${progress}%</span>
          </div>
          <div class="chart-track"><span style="width: ${progress}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderReviewOptions() {
  document.getElementById("reviewCourse").innerHTML = courses
    .map((course) => `<option value="${course.title}">${course.title}</option>`)
    .join("");
}

function renderReviews() {
  const reviews = getReviews();
  const defaultReviews = [
    {
      name: "Nusrat Jahan",
      course: "Tailwind CSS Premium UI Design",
      rating: 5,
      text: "Design section onek clear. Project kore kore practice kora jay.",
      date: "2026-04-12",
    },
    {
      name: "Rakib Hasan",
      course: "Complete HTML, CSS & JavaScript Mastery",
      rating: 5,
      text: "Beginner theke portfolio level porjonto path ta helpful.",
      date: "2026-04-18",
    },
  ];
  const list = [...reviews, ...defaultReviews];
  document.getElementById("reviewCount").textContent = list.length;
  document.getElementById("reviewList").innerHTML = list
    .map(
      (review) => `
        <article class="review-card">
          <div class="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-black">${escapeHtml(review.name)}</h3>
              <p class="text-sm font-bold text-black/42">${escapeHtml(review.course)}</p>
            </div>
            <span class="badge bg-[#fff6e5] text-ink">${Number(review.rating)}/5</span>
          </div>
          <p class="leading-7 text-black/62">${escapeHtml(review.text)}</p>
          <p class="mt-3 text-xs font-black uppercase tracking-[0.16em] text-black/32">${escapeHtml(review.date)}</p>
        </article>
      `,
    )
    .join("");
}

function handleReviewSubmit(event) {
  event.preventDefault();
  if (!currentUser) return;
  const reviews = getReviews();
  reviews.unshift({
    name: currentUser.name || currentUser.email.split("@")[0],
    course: document.getElementById("reviewCourse").value,
    rating: document.getElementById("reviewRating").value,
    text: document.getElementById("reviewText").value.trim(),
    date: new Date().toISOString().slice(0, 10),
  });
  saveReviews(reviews);
  document.getElementById("reviewForm").reset();
  renderReviews();
  showToast("Review submitted. Thank you");
}

function renderAds() {
  const shuffled = [...ads].sort(() => Math.random() - 0.5).slice(0, 4);
  document.getElementById("adGrid").innerHTML = shuffled
    .map(
      (ad) => `
        <article class="ad-card">
          <div class="mb-5 flex items-center justify-between">
            <span class="badge bg-white text-ink">${ad.tag}</span>
            <span class="grid h-11 w-11 place-items-center rounded-lg bg-ink text-gold">
              <i data-lucide="${ad.icon}" class="h-5 w-5"></i>
            </span>
          </div>
          <h3 class="text-xl font-black">${ad.title}</h3>
          <p class="mt-3 text-sm leading-6 text-black/58">${ad.text}</p>
          <button class="mt-5 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-gold hover:text-ink">
            <i data-lucide="external-link" class="h-4 w-4"></i>
            View Ad
          </button>
        </article>
      `,
    )
    .join("");
  refreshIcons();
}

function courseCard(course) {
  const isFree = course.price === 0;
  const isEnrolled = enrolled.has(course.id);
  const price = isFree ? "Free" : money(finalPrice(course));
  const progress = courseProgress(course.id);

  return `
    <article class="course-card" data-category="${course.category}">
      <div class="relative">
        <img src="${course.image}" alt="${course.title}" />
        <div class="absolute left-3 top-3 flex gap-2">
          <span class="badge ${isFree ? "bg-mint text-ink" : "bg-gold text-ink"}">${isFree ? "Free" : `${course.discount}% Off`}</span>
        </div>
      </div>
      <div class="p-5">
        <div class="mb-3 flex items-center justify-between text-sm font-bold text-black/45">
          <span>${course.level}</span>
          <span class="flex items-center gap-1 text-ink"><i data-lucide="star" class="h-4 w-4 fill-[#d8a84f] text-gold"></i>${course.rating}</span>
        </div>
        <h3 class="min-h-[58px] text-xl font-black leading-tight">${course.title}</h3>
        <div class="mt-4 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-black/35">${course.lessons} lessons</p>
            <p class="text-2xl font-black">${price}</p>
          </div>
          <button class="enroll-btn rounded-lg ${isEnrolled ? "bg-mint text-ink" : "bg-ink text-white"} px-4 py-3 font-black transition hover:bg-gold hover:text-ink" data-id="${course.id}">
            ${isEnrolled ? "Continue" : isFree ? "Enroll Free" : "Enroll"}
          </button>
        </div>
        <div class="mt-5 ${isEnrolled ? "" : "hidden"}">
          <div class="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.16em] text-black/38">
            <span>Progress</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-line"><span style="width: ${progress}%"></span></div>
        </div>
      </div>
    </article>
  `;
}

function bindEnrollButtons() {
  document.querySelectorAll(".enroll-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      enrolled.add(id);
      localStorage.setItem("utsho_enrolled", JSON.stringify([...enrolled]));
      const course = courses.find((item) => item.id === id);
      showToast(`${course.title} unlocked`);
      renderCourses();
      renderDeals();
      renderFreeCourses();
      renderProfile();
      renderProgressChart();
    });
  });
}

function toggleChat() {
  document.getElementById("chatPanel").classList.toggle("hidden");
  renderChat();
}

function renderChat() {
  const box = document.getElementById("chatMessages");
  const messages = getChatMessages();
  const starter = {
    from: "support",
    text: "Assalamu alaikum. Course, payment ba certificate niye help lagle message din.",
  };
  const visibleMessages = messages.length ? messages : [starter];
  box.innerHTML = visibleMessages
    .map(
      (message) =>
        `<div class="chat-bubble ${message.from === "user" ? "user" : "support"}">${escapeHtml(message.text)}</div>`,
    )
    .join("");
  box.scrollTop = box.scrollHeight;
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  const messages = getChatMessages();
  messages.push({ from: "user", text });
  messages.push({
    from: "support",
    text: "Thanks. Amader support team khub taratari reply korbe. Urgent hole +880 1756-467670 e call korun.",
  });
  saveChatMessages(messages);
  input.value = "";
  renderChat();
}

function emptyState(message) {
  return `
    <div class="col-span-full rounded-lg border border-black/10 bg-white p-10 text-center shadow-panel">
      <i data-lucide="search-x" class="mx-auto h-10 w-10 text-black/35"></i>
      <p class="mt-4 text-lg font-black">${message}</p>
    </div>
  `;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(
    () => toast.classList.add("hidden"),
    2200,
  );
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

init();
