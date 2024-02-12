# Modal

---

## Описание плагина

Простая библиотека модальных окон. Есть возможность передвигаться по открытому модальному окну с клавиатуры, фокус автоматически перемещается к нему по открытию, что делает взаимодействие с сайтом более доступным.

Есть возможность открывать модальные окна внутри отрытого модального окна. По мимо этого при открытии / закрытии не происходит "сдвига" страницы из-за скрывающейся полосы прокрутки, что делает пользовательский опыт более приятным.

Демо: https://codepen.io/arti-set-dev/pen/YzgJomo

## Загрузка и инициализация

Для загрузки введите команду: `npm i r-modalwindow`.

после загрузки перед инициализацией пропишите необходимые для работы плагина атрибуты. Для кнопки открытия модального окна задайте атрибут `data-modal-btn` с индивидуальным значением. Например,

```html
<button type="button" data-modal-btn="my-modal">Открыть модальное окно</button>
```

Модальному окну задайте атрибут `data-modal-window` и тоже значение что и кнопке:

```html
<div class="modal__window" data-modal-window="my-modal">Модальное окно</div>
```

Внешней обёртке (modal) задайте атрибут `data-modal-overlay`

Если внутри модального окна должна присутствовать кнопка, закрывающая его, то задайте такой кнопке атрибут `data-modal-close`.

В итоге html разметка может выглядеть примерно так:

```html
<button type="button" data-modal-btn="first-modal" data-modal-speed="300">
  Модальное окно 1
</button>
<button type="button" data-modal-btn="second-modal">Модальное окно 2</button>
<button type="button" data-modal-btn="last-modal" data-modal-speed="600">
  Модальное окно 3
</button>

<div class="modal" data-modal-overlay>
  <div class="modal__window" data-modal-window="first-modal">
    Модальное окно 1
    <button type="button" data-modal-btn="last-modal">Модальное окно 3</button>
    <button type="button" data-modal-close>Закрыть окно</button>
    <input type="text" />
  </div>
  <div class="modal__window" data-modal-window="second-modal">
    Модальное окно 2
    <button type="button" data-modal-close>Закрыть окно</button>
    <button type="button" data-modal-btn="first-modal">Модальное окно 1</button>
  </div>
  <div class="modal__window" data-modal-window="last-modal">
    Модальное окно 3
    <button type="button">button</button>
    <button type="button">button</button>
    <button type="button" data-modal-btn="second-modal">
      Модальное окно 2
    </button>
  </div>
  <div class="modal__window" data-modal-window="promo-modal">
    promo
    <button type="button" data-modal-btn="first-modal">Модальное окно 1</button>
  </div>
</div>
```

Для инициализации пропишите следующий код:

```js
const modal = new ModalWindow("[data-modal-btn]");
```

## Настройки

### speed

**По умолчанию 300.** Для изменения скорости пропишите кнопке открытия модального окна атрибут `data-modal-speed` с нужным значением:

```html
<button type="button" class="btn" data-modal="my-modal" data-modal-speed="400">
  Модальное окно
</button>
```

Если нужно изменить скорость по умолчанию - используйте параметр `defaultSpeed` и задайте нужное значение:

```js
const modal = new ModalWindow("[data-modal]", {
  speed: 700,
});
```

## Убрать "прыжок" у фиксированных элементов

Если на странице присутвуют элементы со свойством `position: fixed`, задайте таким элементам атрибут `data-modal-fix`.

## Изменение атрибутов и классов

Для изменения атрибутов и классов - пропишите следующее:

```js
const modal = new ModalWindow("[data-modal-btn]", {
  classNames: {
    modal: "modal",
    window: "modal__window",
    show: "show",
    active: "active",
  },

  dataAttributes: {
    overlay: "data-modal-overlay",
    modal: "data-modal-btn",
    window: "data-modal-window",
    btnClose: "data-modal-close",
    fixBlock: "data-modal-fix",
  },
});
```