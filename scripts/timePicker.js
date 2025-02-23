document.addEventListener('DOMContentLoaded', () => {
    const hoursColumn = document.querySelector('.hours');
    const minutesColumn = document.querySelector('.minutes');
    const hoursOptions = hoursColumn.querySelector('.time-options');
    const minutesOptions = minutesColumn.querySelector('.time-options');
    const btnTimer = document.querySelector('.btn_timer');

    // Заполняем колонки часами и минутами
    function populateTimeOptions(column, start, end) {
        for (let i = start; i <= end; i++) {
            const timeOption = document.createElement('div');
            timeOption.classList.add('time-option');
            timeOption.textContent = i < 10 ? '0' + i : i;
            column.appendChild(timeOption);
        }
    }

    // Выбираем элемент, который находится в середине видимой области
    function selectMiddleOption(column) {
        const options = column.querySelectorAll('.time-option');
        const columnRect = column.getBoundingClientRect();
        const middleY = columnRect.top + columnRect.height / 2;

        let selectedOption = null;

        options.forEach(option => {
            const optionRect = option.getBoundingClientRect();
            if (optionRect.top <= middleY && optionRect.bottom >= middleY) {
                selectedOption = option;
            }
        });

        if (selectedOption) {
            options.forEach(opt => opt.classList.remove('selected'));
            selectedOption.classList.add('selected');
        }
    }


    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Обработчик прокрутки с debounce
    const handleScroll = debounce(() => {
        selectMiddleOption(hoursColumn);
        selectMiddleOption(minutesColumn);
    }, 100); // Задержка 100 мс

    // Добавляем обработчики прокрутки
    hoursColumn.addEventListener('scroll', handleScroll);
    minutesColumn.addEventListener('scroll', handleScroll);

    // Заполняем колонки
    populateTimeOptions(hoursOptions, 0, 23);
    populateTimeOptions(minutesOptions, 0, 59);
    populateTimeOptions(hoursOptions, 0, 23);
    populateTimeOptions(minutesOptions, 0, 59);
    populateTimeOptions(hoursOptions, 0, 23);
    populateTimeOptions(minutesOptions, 0, 59);

    // Инициализируем выбор среднего элемента при загрузке
    selectMiddleOption(hoursColumn);
    selectMiddleOption(minutesColumn);

    // Обработчик для кнопки
    btnTimer.addEventListener('click', () => {
        const selectedHour = hoursOptions.querySelector('.selected')?.textContent || '00';
        const selectedMinute = minutesOptions.querySelector('.selected')?.textContent || '00';
        console.log(`Выбранное время: ${selectedHour}:${selectedMinute}`);
    });

});

// открытие закрытие time
const screenDate = document.querySelector('.screen-date');

function showScreenDate() {
    screenDate.classList.remove('hidden')
};
function hideScreenDate() {
    screenDate.classList.add('hidden')
}