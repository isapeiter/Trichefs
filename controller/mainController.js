import { AuthService } from "../service/authService.js";

// Redireciona automaticamente se usuário já estiver logado
AuthService.checkLogin();

// Cadastro
const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("cadUser").value;
    const password = document.getElementById("cadPass").value;
    const confirmPassword = document.getElementById("cadConfirm").value;

    const success = AuthService.register(username, password, confirmPassword);
    if (success) window.location.href = "index.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const success = AuthService.login(username, password);
    if (success) window.location.href = "index.html";
  });
}
