console.log("Página de perfil carregada com sucesso!");

document.addEventListener("DOMContentLoaded", () => {
  const configBtn = document.querySelector(".config-button");
  const menu = document.querySelector(".config-menu");

  const btnFoto = document.getElementById("alterar-foto");
  const btnConfig = document.getElementById("abrir-config");

  // Abre/fecha o menu
  configBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Opção: alterar foto
  btnFoto.addEventListener("click", () => {
    alert("Abrir modal de alterar foto");
  });

  // Opção: abrir configurações completas
  btnConfig.addEventListener("click", () => {
    window.location.href = "./configuracoes.html";
  });

  // Fecha o menu clicando fora
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-text")) {
      menu.classList.add("hidden");
    }
  });
});
