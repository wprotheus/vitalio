document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carouselExampleCaptions');
    const tituloBeneficio = document.getElementById('titulo-beneficio');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const nav = document.querySelector('nav'); // Menu de navegação principal

    /**
     * Função para mostrar/esconder o botão "Voltar ao Topo"
     */
    const toggleScrollToTopButton = () => {
        if (!scrollToTopButton || !nav) return; // Garante que os elementos existam
        const navIsOutOfView = nav.getBoundingClientRect().bottom < 0; // Verifica se o menu saiu da tela
        scrollToTopButton.style.display = navIsOutOfView ? 'flex' : 'none'; // Alterna visibilidade do botão
    };

    /**
     * Adiciona evento de clique ao botão "Voltar ao Topo"
     */
    scrollToTopButton?.addEventListener('click', (e) => {
        e.preventDefault(); // Evita comportamento padrão do link <a>
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente para o topo
    });

    /**
     * Atualiza o título de benefícios com base no item ativo do Carousel
     */
    const updateCarouselBenefitTitle = () => {
        if (!carousel || !tituloBeneficio) return; // Proteção contra ausência de elementos

        const activeItem = document.querySelector('.carousel-item.active'); // Item ativo do carousel
        if (activeItem) {
            const beneficioId = activeItem.dataset.caption; // Pega o valor do atributo data-caption
            const imageCaption= beneficioId
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            if (imageCaption) {
                // Atualiza o título do benefício
                tituloBeneficio.textContent = imageCaption.toUpperCase();

                // Gerencia a visibilidade das listas de benefícios
                document.querySelectorAll('.beneficio-list').forEach((list) => {
                    // Compara o atributo data-name com o caption atual
                    if (list.dataset.name === imageCaption.toLowerCase()) {
                        list.hidden = false;
                    } else {
                        list.hidden = true;
                    }
                });
            }
        }
    };

    /**
     * Evento para atualizar o título ao mudar o slide no Carousel
     */
    carousel?.addEventListener('slid.bs.carousel', updateCarouselBenefitTitle);

    // Atualiza o título e as listas de benefício imediatamente quando a página for carregada
    updateCarouselBenefitTitle();

    /**
     * Expande ou colapsa FAQs
     */
    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const currentAnswer = question.nextElementSibling;

            // Alterna visibilidade para a resposta atual
            document.querySelectorAll('.faq-answer').forEach((answer) => {
                answer.style.display = answer === currentAnswer && answer.style.display !== 'block' ? 'block' : 'none';
            });
        });
    });

    // Adiciona evento de rolagem para gerenciar a visibilidade do botão "Voltar ao Topo"
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Inicializa a visibilidade corretamente no carregamento
    toggleScrollToTopButton();
});
