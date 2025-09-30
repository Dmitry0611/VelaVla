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
    document.querySelectorAll('.slider').forEach(slider => {
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const container = slider.querySelector('.cards_container');
    const originalCards = Array.from(container.children);

    let visibleCards;
    let cardWidth;
    let totalCardWidth;
    let currentIndex;
    let isAnimating = false;

    const createClones = () => {
        container.innerHTML = '';
        const clonesBefore = originalCards.slice(-visibleCards).map(c => c.cloneNode(true));
        const clonesAfter = originalCards.slice(0, visibleCards).map(c => c.cloneNode(true));
        [...clonesBefore, ...originalCards, ...clonesAfter].forEach(c => container.appendChild(c));
    };

    const updateSettings = () => {
        const width = window.innerWidth;

        if (width <= 768) {
            visibleCards = 1;
        } else if (width <= 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }

        createClones();

        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.gap || style.columnGap || 0);

        cardWidth = container.querySelector('.card').offsetWidth;
        totalCardWidth = cardWidth + gap;

        currentIndex = visibleCards;
        container.style.transition = 'none';
        container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
    };

    const moveTo = (direction) => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex += direction;
        container.style.transition = 'transform 0.5s ease';
        container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
    };

    const handleTransitionEnd = () => {
        const totalOriginal = originalCards.length;
        container.style.transition = 'none';

        if (currentIndex >= totalOriginal + visibleCards) {
            currentIndex = visibleCards;
        } else if (currentIndex < visibleCards) {
            currentIndex = totalOriginal + visibleCards - 1;
        }

        container.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
        isAnimating = false;
    };

    next.addEventListener('click', () => moveTo(1));
    prev.addEventListener('click', () => moveTo(-1));
    container.addEventListener('transitionend', handleTransitionEnd);

    window.addEventListener('resize', updateSettings);
    window.addEventListener('load', updateSettings);
});



    //Modal window

    const buttons = document.querySelectorAll('.modal-open');
    const modal = document.querySelector('.modal');
    const modalDialog = document.querySelector('.modal_dialog');
    const modalClose = document.querySelector('.modal_close');

    function openModal() {
      setTimeout(() => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        modalDialog.classList.add('fade-in');
        document.body.classList.add('modal_open');
        document.documentElement.classList.add('modal_open');
      }, 500);
    };

    function closeModal() {
      modal.classList.remove('show');
      modal.classList.add('hide');
      modalDialog.classList.remove('fade-in');
      document.body.classList.remove('modal_open');
      document.documentElement.classList.remove('modal_open');
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', openModal);
      btn.addEventListener('touchstart', openModal);
    });

    modalClose.addEventListener('click', closeModal);
    modalClose.addEventListener('touchstart', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });



    // Animation scroll

    const blocks = document.querySelectorAll('.scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 1}s`;
          entry.target.classList.add('block_show');
          observer.unobserve(entry.target);
        }
      });
    },
  {
    threshold: 0
  });

  blocks.forEach(block => observer.observe(block));
});