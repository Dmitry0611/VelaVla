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
});