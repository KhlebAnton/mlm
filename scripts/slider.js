document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.screen-users__content');
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');
    const dragHandles = document.querySelectorAll('.drag-handle');
    let scrollPosition = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    // Функция для получения ширины слайда с учетом margin
    const getSlideWidth = () => {
        const slide = document.querySelector('.swiper-slide');
        const style = window.getComputedStyle(slide);
        const marginRight = parseFloat(style.marginRight);
        return slide.offsetWidth + marginRight;
    };

    // Функция для обновления состояния кнопок
    const updateButtons = () => {
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Прозрачность для кнопки "Назад"
        if (scrollPosition <= 0) {
            prevButton.setAttribute('disabled', true);
        } else {
            prevButton.removeAttribute('disabled');
        }

        // Прозрачность для кнопки "Вперед"
        if (scrollPosition >= maxScroll) {
            nextButton.setAttribute('disabled', true);
        } else {
            nextButton.removeAttribute('disabled');
        }
    };

    // Навигация назад
    prevButton.addEventListener('click', () => {
        const slideWidth = getSlideWidth();
        scrollPosition -= slideWidth;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        container.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtons();
    });

    // Навигация вперед
    nextButton.addEventListener('click', () => {
        const slideWidth = getSlideWidth();
        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPosition += slideWidth;
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }
        container.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtons();
    });

    // Инициализация состояния кнопок
    updateButtons();

    // Функция для обработки начала перетаскивания
    const startDrag = (clientX, handle) => {
        isDragging = true;
        startX = clientX;
        animationID = requestAnimationFrame(animation);
        handle.style.cursor = 'grabbing'; // Меняем курсор только на текущем .drag-handle
    };

    // Функция для обработки перетаскивания
    const drag = (clientX) => {
        if (isDragging) {
            const currentX = clientX - startX;
            currentTranslate = prevTranslate + currentX;
        }
    };

    // Функция для завершения перетаскивания
    const endDrag = (handle) => {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        handle.style.cursor = 'grab'; // Возвращаем курсор "рука" после перетаскивания

        // Вычисляем новую позицию прокрутки
        const slideWidth = getSlideWidth();
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
            // Перелистывание вперед
            scrollPosition += slideWidth;
        } else if (movedBy > 100) {
            // Перелистывание назад
            scrollPosition -= slideWidth;
        }

        // Ограничиваем прокрутку
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        } else if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
        }

        // Применяем новую позицию
        container.style.transform = `translateX(-${scrollPosition}px)`;
        prevTranslate = -scrollPosition;
        currentTranslate = prevTranslate;
        updateButtons();
    };

    // Анимация перетаскивания
    const animation = () => {
        container.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    };

    // Добавляем обработчики событий для каждого .drag-handle
    dragHandles.forEach((handle) => {
        // События для мыши
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, handle);
        });

        handle.addEventListener('mousemove', (e) => {
            if (isDragging) {
                drag(e.clientX);
            }
        });

        handle.addEventListener('mouseup', () => endDrag(handle));
        handle.addEventListener('mouseleave', () => endDrag(handle));

        // События для касания
        handle.addEventListener('touchstart', (e) => {
            startDrag(e.touches[0].clientX, handle);
        });

        handle.addEventListener('touchmove', (e) => {
            if (isDragging) {
                drag(e.touches[0].clientX);
            }
        });

        handle.addEventListener('touchend', () => endDrag(handle));
        handle.addEventListener('touchcancel', () => endDrag(handle));
    });
});