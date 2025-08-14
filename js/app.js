document.addEventListener("DOMContentLoaded", () => {

    // Accordion in courses block
    const toggleButton = document.querySelector('.button_courses');
    const innerSection = document.querySelector('.inner_sections');

    toggleButton.addEventListener('click', () => {
        const isOpen = innerSection.classList.contains('open');

        if (isOpen) {
            innerSection.style.height = innerSection.scrollHeight + 'px';

            requestAnimationFrame(() => {
                innerSection.style.height = "0px";
            })

            innerSection.classList.remove('open');
            toggleButton.classList.remove('open');
        } else {
            innerSection.style.height = innerSection.scrollHeight + 'px';

            innerSection.classList.add('open');
            toggleButton.classList.add('open');

            innerSection.addEventListener('transitionend', function handler() {
                innerSection.style.height = "auto";
                innerSection.removeEventListener('transitionend', handler);
            },
                { once: true }
            );
        }
    });


    // Sliders

    const cardWidth = 387;
const cardGap = 20;
const totalCardWidth = cardWidth + cardGap;
const visibleCards = 3;

document.querySelectorAll('.slider').forEach(slider => {
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const container = slider.querySelector('.cards_container');
  const originalCards = Array.from(container.children);
  const totalOriginal = originalCards.length;

  let currentIndex = visibleCards;
  let isAnimating = false;

  // Клонируем карточки
  originalCards.forEach(card => {
    const cloneStart = card.cloneNode(true);
    const cloneEnd = card.cloneNode(true);

    container.insertBefore(cloneStart, container.firstChild);
    container.appendChild(cloneEnd);
  });

  const allCards = Array.from(container.children);

  // Устанавливаем ширину контейнера
  container.style.width = `${allCards.length * totalCardWidth - cardGap}px`;

  // Стартовая позиция
  container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;

  const moveTo = (direction) => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += direction;
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
  };

  const handleTransitionEnd = () => {
    container.style.transition = 'none';

    if (currentIndex >= totalOriginal + visibleCards) {
      currentIndex = visibleCards;
      container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
    }

    if (currentIndex < visibleCards) {
      currentIndex = totalOriginal + visibleCards - 1;
      container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
    }

    isAnimating = false;
  };

  next.addEventListener('click', () => moveTo(1));
  prev.addEventListener('click', () => moveTo(-1));
  container.addEventListener('transitionend', handleTransitionEnd);
});

});