document.addEventListener('DOMContentLoaded', () => {
    const swipeContainers = document.querySelectorAll('.swipe-item__container');

    swipeContainers.forEach(container => {
        const swipeBlock = container.querySelector('.swipe-item');
        const swipeText = container.querySelector('.swipe-item__text');
        let startX;
        let translateX = 0;
        let swiped = false;

        let isDragging = false; // Флаг для отслеживания активного перетаскивания

        const swipeThreshold = 150; // Порог в 150px до конца

        const handleStart = (e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение
            isDragging = true;
            startX = e.clientX - translateX;
            swipeBlock.style.transition = 'none'; // Убираем анимацию во время перетаскивания
            swipeText.style.opacity = '0'; // Скрываем текст
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            const x = e.clientX;
            const walk = (x - startX);
            translateX = walk;
            swipeBlock.style.transform = `translateX(${translateX}px)`;

            // Ограничиваем перетаскивание за границы контейнера
            const minTranslate = 0;
            const maxTranslate = container.offsetWidth - swipeBlock.offsetWidth;

            if (translateX < minTranslate) {
                translateX = minTranslate;
            } else if (translateX > maxTranslate) {
                translateX = maxTranslate;
            }

            swipeBlock.style.transform = `translateX(${translateX}px)`;
        };

        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            startX = null;
            swipeBlock.style.transition = 'transform 0.3s ease-out'; // Восстанавливаем анимацию

            // Проверяем, был ли свайп достаточно далеко
            const maxTranslate = container.offsetWidth - swipeBlock.offsetWidth;
            const thresholdTranslate = maxTranslate - swipeThreshold;

            if (translateX >= thresholdTranslate) {
                translateX = maxTranslate; // Остаемся в конце
                swiped = true;
                setTimeout(() => {
                    resetSwipe()

                }, 1000)
            } else {
                translateX = 0; // Возвращаемся в начало
                swiped = false;
            }

            swipeBlock.style.transform = `translateX(${translateX}px)`;

            // Сбрасываем состояние после завершения анимации
            swipeBlock.addEventListener('transitionend', () => {
                if (swiped) {
                    swipeBlock.style.cursor = 'default'; // Меняем курсор
                    swipeBlock.removeEventListener('mousedown', handleStart);
                    swipeBlock.removeEventListener('mousemove', handleMove);
                    swipeBlock.removeEventListener('mouseup', handleEnd);
                    swipeBlock.removeEventListener('mouseleave', handleEnd);
                    showScreenDate();
                } else {
                    swipeText.style.opacity = '1'; // Восстанавливаем текст
                }
            }, { once: true }); // Запускаем только один раз
        };
        function resetSwipe() {
            translateX = 0; // Возвращаемся в начало
            swiped = false;
            swipeBlock.style.transform = `translateX(${translateX}px)`;
            swipeText.style.opacity = '1'
        }
        swipeBlock.addEventListener('mousedown', handleStart);
        swipeBlock.addEventListener('mousemove', handleMove);
        swipeBlock.addEventListener('mouseup', handleEnd);
        swipeBlock.addEventListener('mouseleave', handleEnd);

        // Обработчики для сенсорных устройств
        swipeBlock.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                handleStart({
                    clientX: e.touches[0].clientX,
                    preventDefault: e.preventDefault.bind(e)
                });
            }
        });

        swipeBlock.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                handleMove({
                    clientX: e.touches[0].clientX
                });
            }
        });

        swipeBlock.addEventListener('touchend', handleEnd);
        swipeBlock.addEventListener('touchcancel', handleEnd);
    });
});