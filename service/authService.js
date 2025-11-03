import { User } from "../model/userModel.js";

export const AuthService = {
  register(username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
      alert("Preencha todos os campos!");
      return false;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return false;
    }

    const user = new User(username, password);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("usuarioLogado", username);
    alert("Cadastro realizado com sucesso!");
    return true;
  },

  login(username, password) {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (!savedUser) {
      alert("Nenhum usuário cadastrado!");
      return false;
    }

    if (username === savedUser.username && password === savedUser.password) {
      localStorage.setItem("usuarioLogado", username);
      return true;
    } else {
      alert("Usuário ou senha incorretos!");
      return false;
    }
  },

  logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../view/login.html";
  },

  checkLogin() {
    const user = localStorage.getItem("usuarioLogado");
    if (user) window.location.href = "index.html";
  }
};
