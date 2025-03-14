document.addEventListener('DOMContentLoaded', function() {
    // Configuração do carrossel
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Verificar se já existem slides no HTML
    let slides = document.querySelectorAll('.carousel-slide');
    
    // Criar indicadores de slide
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Adicionar indicadores ao container do carrossel
    carouselTrack.parentElement.appendChild(indicatorsContainer);
    
    // Variáveis para controle do carrossel
    let currentIndex = 0;
    let isTransitioning = false;
    let indicators = document.querySelectorAll('.indicator');
    
    // Função para atualizar os indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;
        
        currentIndex = index;
        moveCarousel();
        updateIndicators();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Função para mover o carrossel
    function moveCarousel(withAnimation = true) {
        if (withAnimation) {
            carouselTrack.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carouselTrack.style.transition = 'none';
        }
        
        // Calcular o deslocamento com base no índice atual
        const offsetPercentage = currentIndex * 100;
        carouselTrack.style.transform = `translateX(-${offsetPercentage}%)`;
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        moveCarousel();
        updateIndicators();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        
        moveCarousel();
        updateIndicators();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Adicionar eventos aos botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Iniciar carrossel automático
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pausar carrossel automático quando o mouse estiver sobre ele
    const carouselContainer = document.querySelector('.carousel-container');
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Adicionar navegação por toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlide);
    }, {passive: true});
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        autoSlide = setInterval(nextSlide, 5000);
    }, {passive: true});
    
    function handleSwipe() {
        const swipeDistance = Math.abs(touchEndX - touchStartX);
        
        // Verificar se o swipe foi suficientemente longo
        if (swipeDistance > 50) {
            if (touchEndX < touchStartX) {
                // Swipe para a esquerda - próximo slide
                nextSlide();
            } else {
                // Swipe para a direita - slide anterior
                prevSlide();
            }
        }
    }
    
    // Inicializar o carrossel
    moveCarousel(false);
    updateIndicators();
});