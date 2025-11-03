// =================== HEADER DINÂMICO ===================
async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer); // coloca no topo da página

  const response = await fetch("../html/header.html"); // ajuste o caminho se necessário
  const headerHTML = await response.text();

  headerContainer.innerHTML = headerHTML;

  // setup dos botões do header
  const headerButtons = document.querySelectorAll(".header-btn");
  headerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.dataset.page;
      window.location.href = page;
    });
  });
}

// Carrega o header em todas as páginas
loadHeader();

// =================== CADASTRO ===================
const path = window.location.pathname;

if (path.includes("cadastro.html")) {
  const form = document.getElementById("cadastroForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("cadUser").value.trim();
    const pass = document.getElementById("cadPass").value;
    const confirm = document.getElementById("cadConfirm").value;

    if (pass !== confirm) {
      alert("As senhas não coincidem!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ user, pass }));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

// =================== LOGIN ===================
if (path.includes("login.html")) {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Nenhum usuário cadastrado. Faça seu cadastro primeiro!");
      window.location.href = "cadastro.html";
      return;
    }

    if (storedUser.user === user && storedUser.pass === pass) {
      localStorage.setItem("loggedIn", "true");
      alert("Login realizado com sucesso!");
      window.location.href = "home.html";
    } else {
      alert("Usuário ou senha incorretos!");
    }
  });
}

// =================== HOME (PROTEÇÃO) ===================
if (path.includes("home.html")) {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "login.html";
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      alert("Você saiu da conta!");
      window.location.href = "login.html";
    });
  }
}
