// Variáveis globais
let selectedFile = null;
let selectedFormat = 'JSON';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  setupFileUpload();
  setupDragAndDrop();
});

// Configurar upload de arquivo
function setupFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    });
  }
  
  if (uploadArea) {
    uploadArea.addEventListener('click', function() {
      fileInput.click();
    });
  }
}

// Configurar Drag and Drop
function setupDragAndDrop() {
  const uploadArea = document.getElementById('uploadArea');
  
  if (!uploadArea) return;
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
      uploadArea.classList.add('dragover');
    }, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
      uploadArea.classList.remove('dragover');
    }, false);
  });
  
  uploadArea.addEventListener('drop', function(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, false);
}

// Processar arquivo
function handleFile(file) {
  selectedFile = file;
  
  // Atualiza a interface
  const uploadArea = document.getElementById('uploadArea');
  const filePreview = document.getElementById('filePreview');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  
  if (uploadArea) uploadArea.style.display = 'none';
  if (filePreview) filePreview.style.display = 'block';
  if (fileName) fileName.textContent = file.name;
  if (fileSize) fileSize.textContent = formatFileSize(file.size);
  
  console.log('Arquivo selecionado:', file.name, formatFileSize(file.size));
}

// Formatar tamanho do arquivo
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Remover arquivo
function removeFile() {
  selectedFile = null;
  
  const uploadArea = document.getElementById('uploadArea');
  const filePreview = document.getElementById('filePreview');
  const fileInput = document.getElementById('fileInput');
  
  if (uploadArea) uploadArea.style.display = 'block';
  if (filePreview) filePreview.style.display = 'none';
  if (fileInput) fileInput.value = '';
  
  console.log('Arquivo removido');
}

// Selecionar formato de saída
function selectOutput(format) {
  selectedFormat = format;
  
  // Remove active de todos os botões
  const buttons = document.querySelectorAll('.output-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Adiciona active ao botão clicado
  const activeButton = Array.from(buttons).find(btn => 
    btn.textContent.trim().includes(format)
  );
  
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  console.log('Formato selecionado:', format);
}

// Resetar formulário
function resetForm() {
  // Confirma ação
  if (confirm('Tem certeza que deseja cancelar? Todas as configurações serão perdidas.')) {
    // Remove arquivo
    removeFile();
    
    // Reseta campos
    document.getElementById('linguagem').value = 'pt-br';
    document.getElementById('precisao').value = 'media';
    document.getElementById('formato-data').value = 'dd/mm/yyyy';
    document.getElementById('qualidade').value = 'media';
    
    // Reseta checkboxes
    document.getElementById('etiquetas').checked = true;
    document.getElementById('carimbos-palavra').checked = false;
    document.getElementById('remover-pausas').checked = false;
    
    // Reseta formato
    selectOutput('JSON');
    
    console.log('Formulário resetado');
  }
}

// Exportar/Converter arquivo
function exportar() {
  // Validações
  if (!selectedFile) {
    alert('Por favor, selecione um arquivo antes de converter.');
    return;
  }
  
  // Coleta configurações
  const config = {
    arquivo: selectedFile.name,
    formato: selectedFormat,
    linguagem: document.getElementById('linguagem').value,
    precisao: document.getElementById('precisao').value,
    formatoData: document.getElementById('formato-data').value,
    qualidade: document.getElementById('qualidade').value,
    etiquetas: document.getElementById('etiquetas').checked,
    carimbos: document.getElementById('carimbos-palavra').checked,
    removerPausas: document.getElementById('remover-pausas').checked
  };
  
  console.log('Configurações de conversão:', config);
  
  // Simula processo de conversão
  const btn = document.querySelector('.btn-primary');
  const originalText = btn.innerHTML;
  
  btn.disabled = true;
  btn.innerHTML = '<span>Convertendo...</span>';
  
  // Simula delay de processamento
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;
    
   
    // Aqui você implementaria a lógica real de conversão
    // Por exemplo, enviando para um backend:
    // uploadAndConvert(selectedFile, config);
    
  }, 2000);
}

// Função auxiliar para upload e conversão (implementar quando tiver backend)
async function uploadAndConvert(file, config) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('config', JSON.stringify(config));
  
  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Conversão bem-sucedida:', result);
      // Baixar arquivo convertido
      // downloadFile(result.url);
    } else {
      throw new Error('Erro na conversão');
    }
  } catch (error) {
    console.error('Erro ao converter arquivo:', error);
    alert('Erro ao converter arquivo. Tente novamente.');
  }
}

console.log('Convert.js carregado com sucesso!');