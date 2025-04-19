// Elementos DOM
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMobile.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            navMobile.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Staggered Animation
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
    
    // Modal de Agendamento
    setupBookingModal();
});

function setupBookingModal() {
    // Criar elementos do modal
    const modalHTML = `
        <div id="bookingModalOverlay" class="modal-overlay">
            <div id="bookingModal" class="modal">
                <div class="modal-header">
                    <h3>Agendar Consulta</h3>
                    <button id="closeBookingModal" class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="iframe-container">
                        <div id="loadingSpinner" class="loading-spinner">
                            <div class="spinner"></div>
                            <p>A carregar sistema de agendamento...</p>
                        </div>
                        <iframe 
                            id="bukIframe" 
                            src="https://tratamentes.buk.pt/" 
                            frameborder="0" 
                            allowfullscreen
                            onload="hideSpinner() ">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Adicionar estilos CSS para o modal
    const modalStyles = `
        <style>
            /* Modal Overlay */
            .modal-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(var(--primary-darker-rgb), 0.8);
                z-index: 1000;
                overflow-y: auto;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            /* Modal Container */
            .modal {
                position: relative;
                background-color: white;
                margin: 2rem auto;
                width: 90%;
                max-width: 900px;
                border-radius: 8px;
                box-shadow: var(--shadow);
                overflow: hidden;
                animation: modalFadeIn 0.3s ease;
            }
            
            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Modal Header */
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                background: var(--primary);
                color: white;
            }
            
            .modal-header h3 {
                margin: 0;
                color: white;
                font-weight: var(--fw-semibold);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: white;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                transform: scale(1.1);
            }
            
            /* Modal Body */
            .modal-body {
                padding: 0;
            }
            
            /* Iframe Container */
            .iframe-container {
                position: relative;
                width: 100%;
                height: 80vh;
                max-height: 700px;
            }
            
            .iframe-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
            }
            
            /* Loading Spinner */
            .loading-spinner {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: white;
                z-index: 1;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid var(--light);
                border-top: 5px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Responsive Adjustments */
            @media (max-width: 768px) {
                .modal {
                    width: 95%;
                    margin: 1rem auto;
                }
                
                .iframe-container {
                    height: 85vh;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Elementos do DOM
    const openModalButtons = document.querySelectorAll('.open-booking-modal');
    const modalOverlay = document.getElementById('bookingModalOverlay');
    const modal = document.getElementById('bookingModal');
    const closeModalButton = document.getElementById('closeBookingModal');
    const bukIframe = document.getElementById('bukIframe');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Abrir o modal
    function openBookingModal() {
        modalOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impedir scroll da página
        
        // Reiniciar o iframe se necessário
        bukIframe.src = bukIframe.src;
    }
    
    // Fechar o modal
    function closeBookingModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll da página
    }
    
    // Esconder o spinner quando o iframe carregar
    window.hideSpinner = function() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    };
    
    // Event Listeners
    if (openModalButtons) {
        openModalButtons.forEach(button => {
            button.addEventListener('click', openBookingModal);
        });
    }
    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeBookingModal);
    }
    
    // Fechar o modal ao clicar fora dele
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeBookingModal();
            }
        });
    }
    
    // Fechar o modal com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.style.display === 'block') {
            closeBookingModal();
        }
    });
}
