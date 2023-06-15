/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый (не вызванный) код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
} from './modules';

import BurgerMenu from './modules/BurgerMenu';

// import Tabs from 'modules/Tabs';

// import { MousePRLX } from './libs/parallaxMouse'

// import AOS from 'aos'

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
 ! (i) необходимо для корректного отображения webp из css
 */
isWebp();

/* Добавление класса touch для HTML если браузер мобильный */
// addTouchClass();

/* Добавление loaded для HTML после полной загрузки страницы */
// addLoadedClass();

/* Модуль для работы с меню (Бургер) */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();

/** Параллакс мышей */
// const mousePrlx = new MousePRLX({});

/** Фиксированный header */
// headerFixed();

/**
 *  Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
togglePopupWindows();

// =======================================================================================================
// const tabs = new Tabs('default-tabs', {});

/*Динамический адаптив ===================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
// import { useDynamicAdapt } from './modules/dynamicAdapt.js'
// useDynamicAdapt()
// =======================================================================================================

const url = 'static/send.php'
document.addEventListener('DOMContentLoaded', () => {
  const formPopup = document.getElementById('form-popup')
  
  formPopup.addEventListener('submit', formSend)

  // функция обработки формы
  async function formSend(e) { 
    e.preventDefault()

    let error = formValidate(formPopup)

    let formData = new FormData(formPopup)

      if (error === 0) {
      //   отправка полученных данных с формы в файл php
          fetch(url, {
              method: 'POST',
              body: formData
          })
          .then(response => {
            if (response.ok) {
              // Обработка успешной отправки формы
              console.log('Form was submitted successfully!');
              formPopup.classList.add('open')
              formPopup.reset()
            } else {
              // Обработка ошибок отправки формы
              console.log('An error occurred while submitting the form.');
            }
          })
          .catch(error => {
            console.log('An error occurred while submitting the form:', error);
          });
          
      }
  }
  const inputFormRecord = formPopup.querySelectorAll('.form-popup__input') 
  if (inputFormRecord.length > 0) {
    inputFormRecord.forEach(input => {
      input.addEventListener('input', function() {
        if (input.value.length > 0) {
              formRemoveError(input);
        }
    });
    });
  }
  function formValidate(popup) {
    let error = 0;
    // технический класс который нужно добавиь на те инпуты которые нужно проверять
    let formReq = formPopup.querySelectorAll('._req')
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        //вначале убираем класс error с инпута
        formRemoveError(input)

        //проверка инпуста с email, нужно добавить класс к инпуту

        if (input.classList.contains('_email')) {
            //проверка или email соответствует
            if (emailTest(input)) {
                //если проверка не прохожит до добавляетм класс ошибки
                formAddError(input)
                error++
            }
                //проверяем или является чек боксом
                //проверка что это чекбок       проверка что этот чекбокс не влючен
            } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                //добавляем к нему класс ошибки 
                formAddError(input)
                error++
            } else if(input.getAttribute("type") === "tel") {
              //добавляем к нему класс ошибки 
              if(telTest(input)) {
                formAddError(input)
                error++
              }
            }
             else if (input.value === '' && input.value < 2) {
            //проверка всех остальных инпутов заполнены они или нет
                formAddError(input)
                error++
            }
        }
        return error
    }


//функции добавление и удаление класса ошибки
function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}
function telTest(input) {
  return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input. value);
}
})

const swiperOption = new Swiper('.partners-swiper', {
  speed: 400,
  spaceBetween: 25,
  slidesPerView: 2,
  modules: [Autoplay, Pagination],
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnIteration: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    780: {
      slidesPerView: 3,
      spaceBetween: 25,
      slideToClickedSlide: true,
  },
    1000: {
      slidesPerView: 4,
      spaceBetween: 25,
      slideToClickedSlide: true,
  },
    1400: {
        slidesPerView: 5,
        spaceBetween: 25,
        slideToClickedSlide: true,
    }
  },
});