document.addEventListener('DOMContentLoaded', function() {
    const duvidasItems = document.querySelectorAll('.duvida-item');
    
    duvidasItems.forEach(item => {
        const pergunta = item.querySelector('.duvida-pergunta');
        const toggle = item.querySelector('.duvida-toggle');
        
        pergunta.addEventListener('click', () => {
            // Verificar se este item já está ativo
            const isActive = item.classList.contains('active');
            
            // Fechar todos os itens ativos
            duvidasItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherToggle = otherItem.querySelector('.duvida-toggle svg');
                if (otherToggle) {
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });
            
            // Se o item clicado não estava ativo, abri-lo
            if (!isActive) {
                item.classList.add('active');
                const toggleIcon = item.querySelector('.duvida-toggle svg');
                if (toggleIcon) {
                    toggleIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
});