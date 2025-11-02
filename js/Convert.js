// Apenas estrutura visual – sem funções reais
document.querySelectorAll('.btn-outline, .btn-primary, .delete').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Esta é apenas uma visualização. Nenhuma ação será executada.');
  });
});
