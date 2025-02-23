document.addEventListener('DOMContentLoaded', () => {
    const swipeContainers = document.querySelectorAll('.swipe-item__container');

    swipeContainers.forEach(container => {
        const swipeBlock = container.querySelector('.swipe-item');
        const swipeText = container.querySelector('.swipe-item__text');
        let startX;
        let translateX = 0;
        let swiped = false;
        let isDragging = false;

        const swipeThreshold = 150; // Порог в 150px до конца

        const handleStart = (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX;
            swipeBlock.style.transition = 'none';
            swipeText.style.opacity = '0';
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
            swipeBlock.style.transition = 'transform 0.3s ease-out';

            // Проверяем, был ли свайп достаточно далеко
            const maxTranslate = container.offsetWidth - swipeBlock.offsetWidth;
            const thresholdTranslate = maxTranslate - swipeThreshold;

            if (translateX >= thresholdTranslate) {
                translateX = maxTranslate;
                swiped = true;
                setTimeout(() => {
                    resetSwipe();
                }, 1000);
            } else {
                translateX = 0;
                swiped = false;
            }

            swipeBlock.style.transform = `translateX(${translateX}px)`;

            // Сбрасываем состояние после завершения анимации
            swipeBlock.addEventListener('transitionend', () => {
                if (swiped) {
                    
                    showScreenDate();
                } else {
                    swipeText.style.opacity = '1';
                }
            }, { once: true });
        };

        function resetSwipe() {
            translateX = 0;
            swiped = false;
            swipeBlock.style.transform = `translateX(${translateX}px)`;
            swipeText.style.opacity = '1';
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