// agendamento.js - Sistema de Modal para Agendamento
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o elemento modalAgendamento existe
    const modal = document.getElementById('modalAgendamento');
    
    // Se o modal não existir na página, não execute o resto do código
    if (!modal) {
        console.log('Modal de agendamento não encontrado na página');
        return;
    }
    
    console.log('Modal de agendamento inicializado');
    
    // Função para abrir o modal
    window.abrirModal = function(url = 'https://buk.pt/tratamentes?embed=true') {
        console.log('Abrindo modal com URL:', url);
        const iframe = document.getElementById('frameAgendamento');
        
        // Define a URL do iframe
        iframe.src = url;
        
        // Abre o modal
        modal.style.display = 'block';
        document.body.classList.add('modal-aberto');
        
        // Adiciona a classe active após um pequeno delay para ativar a transição
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };

    // Função para fechar o modal
    window.fecharModal = function() {
        console.log('Fechando modal');
        // Remove a classe active para iniciar a transição de saída
        modal.classList.remove('active');
        
        // Fecha o modal após a transição terminar
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-aberto');
            document.getElementById('frameAgendamento').src = '';
        }, 300);
    };

    // Fecha o modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            window.fecharModal();
        }
    });

    // Adiciona evento de clique a todos os botões de agendamento
    const botoes = document.querySelectorAll('.btn-agendamento');
    console.log('Encontrados', botoes.length, 'botões de agendamento');
    
    botoes.forEach((botao, index) => {
        console.log('Configurando botão de agendamento #', index + 1);
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão de agendamento clicado');
            // Verifica se o botão tem um atributo data-url
            const url = this.getAttribute('data-url') || 'https://buk.pt/tratamentes?embed=true';
            window.abrirModal(url);
        });
    });

    // Fecha o modal ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            window.fecharModal();
        }
    });
});