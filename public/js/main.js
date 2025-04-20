// main.js - Refatorado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa todas as funcionalidades
    initNavigation();
    initHeaderScroll();
    initStaggeredAnimation();
    initMobileSubmenu();
    initAccordion();
    initContactForm();
    // Não precisamos chamar setupBookingModal() pois usaremos o agendar.js
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