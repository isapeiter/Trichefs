// JavaScript para funcionalidade de accordion nas perguntas frequentes

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os itens de FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    // Seleciona o botão de pergunta dentro de cada item
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        // Verifica se o item já está ativo
        const isActive = item.classList.contains('active');
        
        // Fecha todos os itens
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Se não estava ativo, abre o item clicado
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
  
  // Adiciona funcionalidade de teclado para acessibilidade
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      // Torna focável pelo teclado
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.setAttribute('aria-expanded', 'false');
      
      question.addEventListener('keydown', function(e) {
        // Enter ou Espaço para expandir/contrair
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
          
          // Atualiza o atributo aria-expanded
          const isExpanded = item.classList.contains('active');
          question.setAttribute('aria-expanded', isExpanded);
        }
      });
    }
  });
});