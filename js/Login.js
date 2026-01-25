// Login.js - Funcionalidades de autenticação

console.log("Página de login carregada com sucesso!");

// Função de login
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  
  // Validações
  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  
  // Simula processo de login
  const btn = document.querySelector('.btn-primary');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Entrando...';
  
  // Simula delay de autenticação
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    
    // Aqui você implementaria a lógica real de autenticação
    console.log('Login:', { email, password, remember });
    
    // Simula login bem-sucedido
    alert('Login realizado com sucesso!');
    
    // Redireciona para o dashboard
    window.location.href = './Home.html';
    
  }, 1500);
}

// Login com Google
function loginWithGoogle() {
  console.log('Login com Google iniciado');
  alert('Funcionalidade de login com Google será implementada em breve!');
  
  // Aqui você implementaria a integração com Google OAuth
  // window.location.href = 'URL_DO_GOOGLE_OAUTH';
}

// Login com GitHub
function loginWithGithub() {
  console.log('Login com GitHub iniciado');
  alert('Funcionalidade de login com GitHub será implementada em breve!');
  
  // Aqui você implementaria a integração com GitHub OAuth
  // window.location.href = 'URL_DO_GITHUB_OAUTH';
}

// Validação de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Adiciona feedback visual aos campos
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input');
  
  inputs.forEach(input => {
    // Adiciona classe quando o campo está preenchido
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.classList.add('filled');
      } else {
        this.classList.remove('filled');
      }
    });
    
    // Validação em tempo real para e-mail
    if (input.type === 'email') {
      input.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
          this.style.borderColor = '#c41e3a';
        } else {
          this.style.borderColor = '#cedbe8';
        }
      });
    }
  });
  
  // Enter para submeter o formulário
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin(e);
      }
    });
  }
});