// =================== HEADER DINÂMICO ===================
async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer); // coloca o header no topo da página

  try {
    // Ajuste o caminho conforme sua estrutura de pastas
    const response = await fetch("./../html/header.html");
    if (!response.ok) throw new Error("Erro ao carregar o header");

    const headerHTML = await response.text();
    headerContainer.innerHTML = headerHTML;

    // Aguarda o header ser carregado antes de buscar os botões
    const headerButtons = headerContainer.querySelectorAll(".header-btn");

    headerButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Pega o caminho da página a partir do data-page
        const page = btn.dataset.page;

        // Se for um caminho relativo, ajusta o diretório base
        window.location.href = `./${page}`;
      });
    });

    // =================== NAVEGAÇÃO PARA PERFIL ===================
    const userIconButton = headerContainer.querySelector(".user-icon button");
    
    if (userIconButton) {
      userIconButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Redireciona para a página de perfil
        window.location.href = "./Perfil.html";
      });

      // Adiciona cursor pointer para indicar que é clicável
      userIconButton.style.cursor = "pointer";
    }

  } catch (error) {
    console.error("Erro ao carregar o header:", error);
  }
}

// Carrega o header em todas as páginas
loadHeader();