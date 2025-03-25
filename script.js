document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carouselExampleCaptions');
    const tituloBeneficio = document.getElementById('titulo-beneficio');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const nav = document.querySelector('nav'); // Seleciona o menu de navegação

    // Função para rolar a página até o topo com animação suave
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Função para mostrar ou esconder o botão de voltar ao topo
    function toggleScrollToTopButton() {
        const navRect = nav.getBoundingClientRect(); // Obtém a posição da navbar
        const navIsOutOfView = navRect.bottom < 0; // Verifica se a navbar está fora da visualização

        if (navIsOutOfView) {
            scrollToTopButton.style.display = 'block'; // Mostra o botão
        } else {
            scrollToTopButton.style.display = 'none'; // Esconde o botão
        }
    }

    // Adiciona o evento de rolagem para monitorar o movimento da página
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Inicializa a visibilidade do botão com base na posição inicial
    toggleScrollToTopButton();

    // Carousel: Atualiza o título e exibe os benefícios corretos ao mudar de slide
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', function () {
            const activeItem = document.querySelector('.carousel-item.active');

            if (activeItem) {
                const imageCaption = activeItem.querySelector('.image-caption').textContent.trim();
                const beneficioId = imageCaption
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();

                if (tituloBeneficio) {
                    tituloBeneficio.textContent = imageCaption.toUpperCase();
                }

                document.querySelectorAll('.beneficio-list').forEach(ul => {
                    ul.hidden = true;
                });

                const beneficio = document.querySelector(`.beneficio-list[data-name="${beneficioId}"]`);
                if (beneficio) {
                    beneficio.hidden = false;
                }
            }
        });
    }

    // FAQ: Mostra ou esconde a resposta ao clicar na pergunta
    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const currentAnswer = question.nextElementSibling;
            const allAnswers = document.querySelectorAll('.faq-answer');

            allAnswers.forEach((answer) => {
                if (answer !== currentAnswer) {
                    answer.style.display = 'none';
                }
            });

            currentAnswer.style.display = currentAnswer.style.display === 'block' ? 'none' : 'block';
        });
    });
});