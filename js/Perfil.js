console.log("Página de perfil carregada com sucesso!");

document.addEventListener("DOMContentLoaded", () => {
  const AvatarImg = document.querySelector(".avatar");

  if (AvatarImg) {
    AvatarImg.addEventListener("click", () => {
      window.location.href = "./../html/Perfil.html";
    });
  }
});