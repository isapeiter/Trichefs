document.addEventListener("DOMContentLoaded", () => {
  const uploadButton = document.querySelector(".upload-btn");

  if (uploadButton) {
    uploadButton.addEventListener("click", () => {
      window.location.href = "./../html/Convet.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const AvatarImg = document.querySelector(".hero-image");

  if (AvatarImg) {
    AvatarImg.addEventListener("click", () => {
      window.location.href = "./../html/Perfil.html";
    });
  }
});
