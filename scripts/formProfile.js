document.getElementById('upload-button').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImage = document.getElementById('preview-image');
            previewImage.src = e.target.result;
            document.getElementById('preview-container').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});


const phoneInput = document.getElementById('editFormTel');

phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '+7 '; // Добавляем код страны
        if (value.length > 1) {
            formattedValue += ' ' + value.substring(1, 4); // Добавляем первые 3 цифры
        }
        if (value.length > 4) {
            formattedValue += ' ' + value.substring(4, 7); // Добавляем следующие 3 цифры
        }
        if (value.length > 7) {
            formattedValue += ' ' + value.substring(7, 9); // Добавляем следующие 2 цифры
        }
        if (value.length > 9) {
            formattedValue += ' ' + value.substring(9, 11); // Добавляем последние 2 цифры
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

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;

    if (input.type === "password") {
        input.type = "text";
        icon.classList.add('eye-open')
        icon.classList.remove('eye-close')
    } else {
        input.type = "password";
        icon.classList.add('eye-close')
        icon.classList.remove('eye-open')
        
    }
}
// Функция для обновления видимости placeholder-text
function updatePlaceholderVisibility(inputElement) {
    const placeholderText = inputElement.previousElementSibling; // Находим элемент placeholder-text
    if (inputElement.value.trim() !== "") {
        placeholderText.style.display = "block"; // Показываем, если есть значение
    } else {
        placeholderText.style.display = "none"; // Скрываем, если поле пустое
    }
}

// Находим все поля ввода
const inputs = document.querySelectorAll('.edit-profile__inputs input');

// Добавляем обработчики событий для каждого поля
inputs.forEach(input => {
    // Проверяем видимость placeholder-text при загрузке страницы
    updatePlaceholderVisibility(input);

    // Обновляем видимость при вводе текста
    input.addEventListener('input', function () {
        updatePlaceholderVisibility(input);
    });
});

const msg = document.querySelector('.message__save')
function sendMessage() {
    msg.style.display='block'
    setTimeout(() => {
        msg.style.display='none'
    }, 5000);
}
function validatePasswords() {
    const password = document.getElementById('editFormPass').value;
    const confirmPassword = document.getElementById('editFormPassAgain').value;
    const errorElement = document.getElementById('password-error');

    if (password !== confirmPassword) {
        errorElement.style.display = 'block'; // Показываем сообщение об ошибке
        return false; // Пароли не совпадают
    } else {
        errorElement.style.display = 'none'; // Скрываем сообщение об ошибке
        return true; // Пароли совпадают
    }
}

document.getElementById('editFormPassAgain').addEventListener('input', validatePasswords);
const formEdit = document.getElementById('formEditProfile');

formEdit.addEventListener('submit', (e)=> {
    e.preventDefault();
    if (validatePasswords()) {
        sendMessage(); // Вызываем функцию, только если пароли совпадают
    } else {
        alert("Пароли не совпадают. Пожалуйста, проверьте введенные данные.");
    }
})