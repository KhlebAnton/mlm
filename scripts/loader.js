document.addEventListener('DOMContentLoaded', ()=> {
    const logo = document.querySelector('.logo');
    const bgCircle = document.querySelector('.bg_circle');
    
    bgCircle.classList.remove("hidden");
    logo.classList.remove("hidden");
    setTimeout(() => { logo.classList.add("anim"); }, 1100);
    
    setTimeout(() => {
        hideScreen(screenPreloader);
        showScreen(screenWelcome);
        startAnimWelcome();
    
    }, 3000);
});
// screen
const screenPreloader = document.querySelector('.screen-preloader');
const screenWelcome = document.querySelector('.screen-welcome');
const screenAuth = document.querySelector('.screen-authorization');
const screenReg = document.querySelector('.screen-registration')

function hideScreen(screen) {
    screen.classList.add('hidden')
};
function showScreen(screen) {
    screen.classList.remove('hidden')
};
// preloader






const welcomeAnim = document.querySelector('.welcome-animated');

function startAnimWelcome() {
    welcomeAnim.classList.add('anim');

}


// form
const formAuth = document.getElementById('authForm');
formAuth.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '../users/'
})

// маска тел
const phoneInput = document.getElementById('regFormPhone');

phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '+7 '; // Добавляем код страны
        if (value.length > 1) {
            formattedValue += '(' + value.substring(1, 4); // Добавляем первые 3 цифры
        }
        if (value.length > 4) {
            formattedValue += ') ' + value.substring(4, 7); // Добавляем следующие 3 цифры
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 9); // Добавляем следующие 2 цифры
        }
        if (value.length > 9) {
            formattedValue += '-' + value.substring(9, 11); // Добавляем последние 2 цифры
        }
    }

    e.target.value = formattedValue; // Устанавливаем отформатированное значение
});

// Ограничиваем длину ввода
phoneInput.addEventListener('keydown', function (e) {
    if (e.target.value.replace(/\D/g, '').length >= 11 && e.key !== 'Backspace') {
        e.preventDefault(); // Блокируем ввод, если длина превышает 11 цифр
    }
});


const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"], input[type="tel"]');
// Функция для отображения/скрытия кнопки очистки
function toggleRemoveBtn(input) {
    const removeBtn = input.nextElementSibling;
    if (input.value.trim() !== "") {
        removeBtn.style.display = 'block';
    } else {
        removeBtn.style.display = 'none';
    }
}

function clearInput(input) {
    input.value = '';
    toggleRemoveBtn(input);
}

inputs.forEach(input => {
    const removeBtn = input.nextElementSibling;

    input.addEventListener('input', () => {
        toggleRemoveBtn(input);
    });

    removeBtn.addEventListener('click', () => {
        clearInput(input);
    });
});