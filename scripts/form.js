document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o formulário
    const form = document.getElementById('contact-form');
    
    // Adicionar evento de envio ao formulário
    form.addEventListener('submit', function(event) {
        // Impedir o envio padrão do formulário
        event.preventDefault();
        
        // Validar os campos do formulário
        if (validateForm()) {
            // Se válido, enviar o formulário
            submitForm();
        }
    });
    
    // Função para validar o formulário
    function validateForm() {
        let isValid = true;
        
        // Validar nome
        const nome = form.querySelector('input[name="nome"]');
        if (nome.value.trim() === '') {
            showError(nome, 'Por favor, informe seu nome');
            isValid = false;
        } else {
            removeError(nome);
        }
        
        // Validar email
        const email = form.querySelector('input[name="email"]');
        if (email.value.trim() === '') {
            showError(email, 'Por favor, informe seu email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, informe um email válido');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Validar WhatsApp
        const whatsapp = form.querySelector('input[name="whatsapp"]');
        if (whatsapp.value.trim() === '') {
            showError(whatsapp, 'Por favor, informe seu WhatsApp');
            isValid = false;
        } else if (!isValidPhone(whatsapp.value)) {
            showError(whatsapp, 'Por favor, informe um número válido');
            isValid = false;
        } else {
            removeError(whatsapp);
        }
        
        // Validar objetivo
        const objetivo = form.querySelector('select[name="objetivo"]');
        if (objetivo.value === '') {
            showError(objetivo, 'Por favor, selecione seu objetivo');
            isValid = false;
        } else {
            removeError(objetivo);
        }
        
        return isValid;
    }
    
    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        
        // Remover mensagem de erro anterior, se existir
        removeError(input);
        
        // Adicionar classe de erro
        formGroup.classList.add('error');
        
        // Criar e adicionar mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
    }
    
    // Função para remover erro
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Função para validar telefone
    function isValidPhone(phone) {
        // Remover caracteres não numéricos
        const phoneNumbers = phone.replace(/\D/g, '');
        // Verificar se tem pelo menos 10 dígitos (DDD + número)
        return phoneNumbers.length >= 10;
    }
    
    // Função para enviar o formulário
    function submitForm() {
        // Mostrar indicador de carregamento
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Enviar dados para o Formspree
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Sucesso
                form.reset();
                showSuccessMessage();
            } else {
                // Erro
                response.json().then(data => {
                    showErrorMessage(data.error || 'Ocorreu um erro ao enviar o formulário. Tente novamente.');
                });
            }
        })
        .catch(error => {
            showErrorMessage('Ocorreu um erro ao enviar o formulário. Tente novamente.');
        })
        .finally(() => {
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        // Esconder formulário
        form.style.display = 'none';
        
        // Criar e mostrar mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Obrigado pelo seu interesse! Entraremos em contato em breve.</p>
            <button class="btn-primary" id="new-message-btn">Enviar nova mensagem</button>
        `;
        
        form.parentNode.appendChild(successMessage);
        
        // Adicionar evento para enviar nova mensagem
        document.getElementById('new-message-btn').addEventListener('click', () => {
            successMessage.remove();
            form.style.display = 'block';
        });
    }
    
    // Função para mostrar mensagem de erro
    function showErrorMessage(message) {
        alert(message);
    }
});