// Seleciona elementos
const formSimulador = document.getElementById("form-simulador");
const resultadoEl = document.getElementById("resultado");
const mensalidadeEl = document.getElementById("mensalidade");
const totalEl = document.getElementById("total");

// Função para calcular o crédito
function calcularCredito(valor, juros, prazo) {
  const taxaMensal = juros / 12 / 100;
  const mensalidade = valor * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazo)));
  const total = mensalidade * prazo;
  return { mensalidade, total };
}

// Evento do formulário
formSimulador.addEventListener("submit", (e) => {
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const juros = parseFloat(document.getElementById("juros").value);
  const prazo = parseInt(document.getElementById("prazo").value);

  if (isNaN(valor) || isNaN(juros) || isNaN(prazo)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const resultado = calcularCredito(valor, juros, prazo);

  // Exibe os resultados
  mensalidadeEl.textContent = `Prestação Mensal: MZN ${resultado.mensalidade.toFixed(2)}`;
  totalEl.textContent = `Total a Pagar: MZN ${resultado.total.toFixed(2)}`;

  // Adiciona a classe para mostrar o resultado
  resultadoEl.classList.add("show");
});


document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.2}s`;
      });
    });


    document.getElementById("form-simulador").addEventListener("submit", function(e) {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const juros = parseFloat(document.getElementById("juros").value) / 100 / 12; // juros mensais
    const prazo = parseInt(document.getElementById("prazo").value);

    if (isNaN(valor) || isNaN(juros) || isNaN(prazo) || prazo <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Fórmula da prestação fixa (Price)
    const mensalidade = (valor * juros) / (1 - Math.pow(1 + juros, -prazo));
    const total = mensalidade * prazo;

    // Mostrar resultados formatados
    document.getElementById("mensalidade").textContent = 
      `Mensalidade: ${mensalidade.toFixed(2)} MZN`;
    document.getElementById("total").textContent = 
      `Total a pagar: ${total.toFixed(2)} MZN`;

    // Animação de exibição
    const resultado = document.getElementById("resultado");
    resultado.classList.add("show");
  });

  // Adicionar funcionalidade de acordeão ao FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Alternar item atual
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Abrir primeiro item por padrão
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        firstItem.classList.add('active');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
});

class HeroCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.images = document.querySelectorAll('.carousel-image');
        
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoSlideInterval = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.preloadImages();
        this.setupEventListeners();
        this.startAutoSlide();
        this.setAccessibility();
    }
    
    preloadImages() {
        this.images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                img.addEventListener('error', () => {
                    console.warn('Failed to load image:', img.src);
                    // Fallback para imagem não carregada
                    img.style.backgroundColor = '#f0f0f0';
                });
            }
        });
    }
    
    setupEventListeners() {
        // Botões de navegação
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
        
        // Touch events para mobile
        this.setupTouchEvents();
        
        // Pausar no hover/focus
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => this.pause());
        carousel.addEventListener('mouseleave', () => this.resume());
        carousel.addEventListener('focusin', () => this.pause());
        carousel.addEventListener('focusout', () => this.resume());
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        const carousel = document.querySelector('.hero-carousel');
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        const translateX = -this.currentSlide * 33.333;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateIndicators();
        this.updateButtons();
        this.updateAccessibility();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateButtons() {
        // Em mobile os botões são escondidos, então não precisamos atualizar
        if (window.innerWidth > 768) {
            this.prevBtn.disabled = this.currentSlide === 0;
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }
    
    updateAccessibility() {
        this.indicators.forEach((indicator, index) => {
            indicator.setAttribute('aria-current', index === this.currentSlide ? 'true' : 'false');
        });
    }
    
    setAccessibility() {
        this.indicators.forEach((indicator, index) => {
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
        });
        
        this.prevBtn.setAttribute('aria-label', 'Slide anterior');
        this.nextBtn.setAttribute('aria-label', 'Próximo slide');
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 5000);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});


// Adicionar interações suaves aos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('#hero .btn');
    
    buttons.forEach(button => {
        // Efeito de loading ao clicar
        button.addEventListener('click', function(e) {
            if (!this.href.includes('#')) {
                this.classList.add('loading');
                
                // Simular loading por 2 segundos
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
        
        // Animações de hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});