// mainController.js

// Detecta qual página está aberta
const path = window.location.pathname;

// =================== CADASTRO ===================
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

    // salva os dados no localStorage
    localStorage.setItem("user", JSON.stringify({ user, pass }));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // redireciona pro login
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
      // cria uma sessão simulada
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

  // Logout (caso tenha botão)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      alert("Você saiu da conta!");
      window.location.href = "login.html";
    });
  }
}
