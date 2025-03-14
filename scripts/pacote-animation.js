// Script para animar o pacote trimestral quando ele entra na viewport

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o card do pacote trimestral
    const pacoteTrimestral = document.querySelector('.pacote-card.destaque');
    
    // Verifica se o elemento existe
    if (!pacoteTrimestral) return;
    
    // Função para animar o card
    function animateCard(entries, observer) {
        entries.forEach(entry => {
            // Se o elemento está visível na viewport
            if (entry.isIntersecting) {
                // Adiciona a classe para iniciar a animação
                setTimeout(() => {
                    entry.target.classList.add('highlight-yellow');
                }, 500); // Pequeno delay para melhor efeito visual
                
                // Para de observar após a animação ser aplicada
                observer.unobserve(entry.target);
            }
        });
    }
    
    // Cria o Intersection Observer
    const observer = new IntersectionObserver(animateCard, {
        root: null, // viewport
        threshold: 0.3 // Quando pelo menos 30% do elemento estiver visível
    });
    
    // Começa a observar o pacote trimestral
    observer.observe(pacoteTrimestral);
});