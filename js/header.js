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