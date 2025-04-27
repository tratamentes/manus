// main.js - Refatorado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa todas as funcionalidades
    initNavigation();
    initHeaderScroll();
    initStaggeredAnimation();
    initMobileSubmenu();
    initAccordion();
    initContactForm();
});

/**
* Inicializa o menu mobile
*/
function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.site-nav .nav-link');
    const siteNav = document.querySelector('.site-nav');
    
    if (mobileMenuToggle && siteNav) {
      mobileMenuToggle.addEventListener('click', function() {
        console.log('Menu toggle clicado');
        siteNav.classList.toggle('menu-open');
        document.body.style.overflow = siteNav.classList.contains('menu-open') ? 'hidden' : '';
      });
    }
    
    // Fechar menu ao clicar nos links (mobile)
    if (navLinks.length) {
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (siteNav && siteNav.classList.contains('menu-open')) {
            siteNav.classList.remove('menu-open');
            document.body.style.overflow = '';
          }
        });
      });
    }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
}

/**
 * Staggered Animation
 */
function initStaggeredAnimation() {
    const staggerItems = document.querySelectorAll('.stagger-item');

    if (staggerItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        staggerItems.forEach(item => {
            observer.observe(item);
        });
    }
}

/**
 * Mobile Submenu Toggle
 */
function initMobileSubmenu() {
    const mobileItems = document.querySelectorAll('.nav-mobile-item');

    mobileItems.forEach(item => {
        const link = item.querySelector('.nav-mobile-link');
        const submenu = item.querySelector('.nav-mobile-submenu');

        if (submenu && link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
}

/**
 * Accordion Functionality
 */
function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = document.querySelector(this.getAttribute('data-bs-target'));

            if (!target) return;

            // Toggle classes
            target.classList.toggle('show');
            this.classList.toggle('collapsed');

            // Set aria-expanded attribute
            const expanded = this.classList.contains('collapsed') ? 'false' : 'true';
            this.setAttribute('aria-expanded', expanded);

            // Se há um parent, fechar outros itens
            const parent = this.getAttribute('data-bs-parent');
            if (parent) {
                const parentElement = document.querySelector(parent);
                if (parentElement) {
                    // Encontra todos os outros itens abertos e fecha-os
                    const openItems = parentElement.querySelectorAll('.accordion-collapse.show');
                    openItems.forEach(item => {
                        if (item !== target) {
                            item.classList.remove('show');

                            const itemId = item.getAttribute('id');
                            const itemButton = document.querySelector(`[data-bs-target="#${itemId}"]`);
                            if (itemButton) {
                                itemButton.classList.add('collapsed');
                                itemButton.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                }
            }
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mostra estado de carregamento
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'A enviar...';
        submitButton.disabled = true;

        // Obtém dados do formulário
        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());

        // Aqui você deve implementar o envio real do formulário
        // Usando fetch API (descomente e adapte conforme necessário)

        fetch('seu-endpoint-de-formulario', {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro no envio do formulário');
                }
                return response.json();
            })
            .then(data => {
                // Sucesso
                formStatus.innerHTML = `
                <div class="alert-success">
                    <p><strong>Mensagem enviada com sucesso!</strong></p>
                    <p>Obrigado pelo seu contacto. Responderemos o mais brevemente possível.</p>
                </div>
            `;
                contactForm.reset();
            })
            .catch(error => {
                // Erro
                formStatus.innerHTML = `
                <div class="alert-error">
                    <p><strong>Erro ao enviar mensagem.</strong></p>
                    <p>Por favor, tente novamente mais tarde ou contacte-nos por telefone.</p>
                </div>
            `;
                console.error('Erro:', error);
            })
            .finally(() => {
                // Restaura o botão
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;

                // Mostra a mensagem de status
                formStatus.style.display = 'block';
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Oculta a mensagem após 5 segundos
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });

        /* Remova este bloco se implementar o fetch acima
        setTimeout(function() {
            // Simulação de envio bem-sucedido
            formStatus.innerHTML = `
                <div class="alert-success">
                    <p><strong>Mensagem enviada com sucesso!</strong></p>
                    <p>Obrigado pelo seu contacto. Responderemos o mais brevemente possível.</p>
                </div>
            `;
            formStatus.style.display = 'block';
            
            // Reset do formulário
            contactForm.reset();
            
            // Reset do botão
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Scroll para a mensagem
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Oculta a mensagem após 5 segundos
            setTimeout(function() {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
        */
    });
}

/**
 * JavaScript personalizado para melhorar a interatividade da página de localizações
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para elementos ao entrarem na viewport
    const animateElements = document.querySelectorAll('.location-info-item, .location-features, .location-card, .accordion-item');
    
    function checkVisibility() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Verificar elementos visíveis no carregamento inicial
    checkVisibility();
    
    // Verificar ao rolar a página
    window.addEventListener('scroll', checkVisibility);
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Ajuste para o header fixo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Modal de agendamento
    const bookingButtons = document.querySelectorAll('.open-booking-modal');
    const modal = document.getElementById('modalAgendamento');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter a localização do botão, se disponível
            const location = this.dataset.location || '';
            
            // Configurar o iframe com parâmetro de localização
            const iframe = document.getElementById('frameAgendamento');
            iframe.src = '/sistema-agendamento/?location=' + encodeURIComponent(location);
            
            // Abrir o modal
            openModal();
        });
    });
    
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.classList.add('modal-aberto');
            
            // Adicionar classe active após um pequeno delay para ativar a transição
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }
    
    // Função para fechar o modal (utilizada pelo botão de fechar)
    window.fecharModal = function() {
        if (modal) {
            modal.classList.remove('active');
            
            // Esperar a transição terminar antes de esconder o modal
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('modal-aberto');
                
                // Limpar o src do iframe quando o modal for fechado
                const iframe = document.getElementById('frameAgendamento');
                iframe.src = '';
            }, 300);
        }
    };
    
    // Fechar o modal ao clicar fora do conteúdo
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                window.fecharModal();
            }
        });
    }
    
    // Lidar com a tecla ESC para fechar o modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            window.fecharModal();
        }
    });
    
    // Adicionar hover effects nos cartões de localização
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Adicionar funcionalidade de "Copiar endereço" nos ícones de localização
    const addressItems = document.querySelectorAll('.location-info-item');
    
    addressItems.forEach(item => {
        const icon = item.querySelector('.location-icon');
        const addressText = item.querySelector('p');
        
        if (icon && addressText && addressText.textContent.includes('Rua')) {
            icon.style.cursor = 'pointer';
            icon.setAttribute('title', 'Clique para copiar o endereço');
            
            icon.addEventListener('click', function() {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = addressText.textContent.trim();
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                
                // Feedback visual
                showToast('Endereço copiado para a área de transferência!');
            });
        }
    });
    
    // Função para mostrar mensagem toast
    function showToast(message) {
        // Verificar se já existe um toast
        let toast = document.querySelector('.toast-message');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-message';
            document.body.appendChild(toast);
            
            // Estilo do toast
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '4px';
            toast.style.zIndex = '9999';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
        }
        
        toast.textContent = message;
        
        // Mostrar o toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // Esconder após 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }
    
    // Adicionar contador de localizações disponíveis
    const locationCount = document.querySelectorAll('.location-card').length;
    const introSection = document.querySelector('.locations-intro p');
    
    if (introSection && locationCount > 0) {
        const countText = document.createElement('div');
        countText.className = 'location-count mt-4';
        countText.innerHTML = `
            <span class="badge" style="background-color: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.9rem; font-weight: 500;">
                ${locationCount} ${locationCount === 1 ? 'localização disponível' : 'localizações disponíveis'}
            </span>
        `;
        introSection.parentNode.appendChild(countText);
    }
});