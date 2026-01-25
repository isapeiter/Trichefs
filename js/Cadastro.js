// Cadastro.js - Funcionalidades de registro

console.log("Página de cadastro carregada com sucesso!");

// Função de cadastro
function handleCadastro(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  
  // Validações
  if (!nome || !email || !password || !confirmPassword) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  
  if (password.length < 8) {
    alert('A senha deve ter pelo menos 8 caracteres.');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('As senhas não coincidem. Por favor, verifique.');
    return;
  }
  
  if (!terms) {
    alert('Você precisa aceitar os Termos de Serviço e Política de Privacidade.');
    return;
  }
  
  // Valida força da senha
  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength === 'weak') {
    const confirm = window.confirm(
      'Sua senha é considerada fraca. Recomendamos usar letras maiúsculas, minúsculas, números e caracteres especiais.\n\nDeseja continuar mesmo assim?'
    );
    if (!confirm) return;
  }
  
  // Simula processo de cadastro
  const btn = document.querySelector('.btn-primary');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Criando conta...';
  
  // Simula delay de registro
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    
    // Aqui você implementaria a lógica real de cadastro
    console.log('Cadastro:', { nome, email, password });
    
    // Simula cadastro bem-sucedido
    alert('Conta criada com sucesso! Bem-vindo(a) ao Conversor de Arquivos.');
    
    // Redireciona para o dashboard
    window.location.href = './Home.html';
    
  }, 1500);
}

// Cadastro com Google
function signupWithGoogle() {
  console.log('Cadastro com Google iniciado');
  alert('Funcionalidade de cadastro com Google será implementada em breve!');
  
  // Aqui você implementaria a integração com Google OAuth
  // window.location.href = 'URL_DO_GOOGLE_OAUTH';
}

// Cadastro com GitHub
function signupWithGithub() {
  console.log('Cadastro com GitHub iniciado');
  alert('Funcionalidade de cadastro com GitHub será implementada em breve!');
  
  // Aqui você implementaria a integração com GitHub OAuth
  // window.location.href = 'URL_DO_GITHUB_OAUTH';
}

// Validação de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Verifica força da senha
function checkPasswordStrength(password) {
  let strength = 0;
  
  // Critérios de força
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
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
  
  // Validação de confirmação de senha em tempo real
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (password && confirmPassword) {
    confirmPassword.addEventListener('input', function() {
      if (this.value && this.value !== password.value) {
        this.style.borderColor = '#c41e3a';
      } else {
        this.style.borderColor = '#cedbe8';
      }
    });
  }
  
  // Indicador visual de força da senha
  if (password) {
    password.addEventListener('input', function() {
      const strength = checkPasswordStrength(this.value);
      
      // Você pode adicionar um indicador visual aqui
      console.log('Força da senha:', strength);
    });
  }
  
  // Enter para submeter o formulário
  const form = document.getElementById('cadastroForm');
  if (form) {
    form.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && e.target.type !== 'checkbox') {
        e.preventDefault();
        handleCadastro(e);
      }
    });
  }
});