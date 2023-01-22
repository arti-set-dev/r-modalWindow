# modalWindow
---
## Описание плагина

Данный плагин открывает и закрывает модальные окна. При этом есть возможность передвигаться по открытому модальному окну с клавиатуры, т. к. фокус автоматически перемещается к нему по открытию, что делает взаимодействие с сайтом более доступным. Есть возможность открывать модальные окна внутри отрытого модального окна. По мимо этого при открытии / закрытии не происходит сдвигания станицы из-за скрывающейся полосы прокрутки, что делает пользование сайтом визуально более приятным. 

## Загрузка и инициализация

Для загрузки введите команду: `npm i r-modalwindow`.

после загрузки перед инициализацией пропишите необходимые для работы плагина атрибуты. Для кнопки открытия модального окна задайте атрибут `data-modal` с индивидуальным значением. Например,
```html 
 <button type="button" class="btn" data-modal="my-modal">Открыть модальное окно</button>
```
Модальному окну задайте атрибут `data-modal-target` и тоже значение что и кнопке:
```html
<div class="modal-window" data-modal-target="my-modal">Модальное окно</div>
```
Внешней обёртке (overlay) задайте атрибут `data-modal-overlay`

Если внутри модального окна должна присутствовать кнопка, закрывающая его, то задайте такой кнопке атрибут `data-modal-close`.

В итоге html разметка может выглядеть примерно так:
```html
<button type="button" class="btn" data-modal="first-modal" data-modal-speed="400">Модальное окно 1</button>
<button type="button" class="btn" data-modal="middle-modal">Модальное окно 2</button>
<button type="button" class="btn" data-modal="last-modal" data-modal-speed="700">Модальное окно 3</button>

<div class="modal" data-modal-overlay>
  <div class="modal-window" data-modal-target="first-modal">
    <button type="button" class="btn" data-modal-close>Закрыть модальное окно</button>
    </div>
  <div class="modal-window" data-modal-target="middle-modal">Модальное окно 2</div>
  <div class="modal-window" data-modal-target="last-modal">Модальное окно 3</div>
</div>
```
**примечание:** 

Не задавайте модальному окну свойство display со значением block, flex или grid, т. к. это приведёт к поломке вёрстки. Задайте данное свойство только со значениями inline-block, inline-flex или inline-grid.

Для инициализации пропишите следующий код: 
```js
const modal = new ModalWindow('[data-modal]');
```
## Настройки

### speed

**По умолчанию 300.** Для изменения скорости пропишите кнопке открытия модального окна атрибут `data-modal-speed` с нужным значением:
```html
<button type="button" class="btn" data-modal="my-modal" data-modal-speed="400">Модальное окно</button>
```
Если нужно изменить скорость по умолчанию - используйте параметр `defaultSpeed` и задайте нужное значение:
```js
const modal = new ModalWindow('[data-modal]', {
  defaultSpeed: 700,
});
```
## autoFocusToCloseBtn

Если внутри модального окна присутствует кнопка "закрыть меню", то фокус перемеситься на данную кнопку. По умолчанию `false`. Для включения данного параметра пропишите `autoFocusToCloseBtn` со значением `true`:
```js
const modal = new ModalWindow('[data-modal]', {
  autoFocusToCloseBtn: true,
});
```
## Убрать прыжок у фиксированных элементов

Если на странице присутвуют элементы со свойством `position: fixed`, задайте таким элементам атрибут `data-modal-fix`.

## Изменение атрибутов

Для изменения атрибутов - пропишите следующее:
```js
const modal = new ModalWindow('[data-modal]', {
  modalOverlayName: 'data-modal-overlay', // Ваш атрибут
  modalWindowName: 'data-modal-target', // Ваш атрибут
  modalWindowSpeedName: 'data-modal-speed', // Ваш атрибут
  modalCloseBtnName: 'data-modal-close', // Ваш атрибут
  modalOverlayBlockName: 'show', // Ваш атрибут
  disableScrollName: 'dis-scroll', // Ваш атрибут
  modalWindowBlockName: 'block', // Ваш атрибут
  modalWindowShowName: 'window-show', // Ваш атрибут
});
```