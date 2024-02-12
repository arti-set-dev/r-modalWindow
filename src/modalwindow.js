export default class Modal {
  constructor(selector, options) {
    let defaultOptions = {
      isOpen: () => { },
      isClose: () => { },

      speed: 300,

      classNames: {
        modal: 'modal',
        window: 'modal__window',
        show: 'show',
        active: 'active'
      },

      dataAttributes: {
        overlay: 'data-modal-overlay',
        modal: 'data-modal-btn',
        window: 'data-modal-window',
        btnClose: 'data-modal-close',
        fixBlock: 'data-modal-fix'
      }
    };

    this.options = Object.assign(defaultOptions, options);
    this.modalBtns = document?.querySelectorAll(selector);
    this.modal = document?.querySelector(`[${this.options.dataAttributes.overlay}]`);
    this.windows = this.modal?.querySelectorAll(`.${this.options.classNames.window}`);
    this.html = document.documentElement;
    this.body = document.body;
    this.modalCloseBtns = this.modal?.querySelectorAll(`[${this.options.dataAttributes.btnClose}]`);
    this.previusActiveBtn = null;
    this.modalFocusableElements = null;
    this.documentFocusableElements = null;

    this.focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];

    this.events();
  }

  events() {
    document.addEventListener('DOMContentLoaded', () => {
      this.modalInit();

      this.modalBtns?.forEach(modalBtn => {
        modalBtn?.addEventListener('click', () => {
          const { currSpeed } = this.getParamsModal();
          if (new Date().getTime() - this.lastClick < currSpeed + 15) return;
          this.lastClick = new Date().getTime();

          if (!this.modal?.classList.contains(this.options.classNames.show)) {
            this.openModal(modalBtn);
          } else {
            this.reOpenModal(modalBtn, currSpeed);
          }
        })
      })

      this.modal?.addEventListener('click', (e) => {
        if (e.target == e.currentTarget) {
          const { currSpeed } = this.getParamsModal();
          if (new Date().getTime() - this.lastClick < currSpeed + 15) return;
          this.lastClick = new Date().getTime();
          this.closeModal();
        }
      })

      this.modalCloseBtns?.forEach(modalCloseBtn => {
        modalCloseBtn?.addEventListener('click', () => {
          const { currSpeed } = this.getParamsModal();
          if (new Date().getTime() - this.lastClick < currSpeed + 15) return;
          this.lastClick = new Date().getTime();
          this.closeModal();
        })
      })

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          const { currSpeed } = this.getParamsModal();
          if (new Date().getTime() - this.lastClick < currSpeed + 15) return;
          this.lastClick = new Date().getTime();
          this.closeModal();
        }

        if (this.modal?.classList.contains(this.options.classNames.show)) {
          this.focusMoving(e);
        }
      })
    })
  }

  modalInit() {
    this.windows?.forEach(window => {
      window.setAttribute('role', 'dialog');
      window.setAttribute('aria-modal', 'true');
      window.setAttribute('aria-hidden', 'true');
    })
  }

  openModal(modalData) {
    const currSpeed = modalData.dataset.modalSpeed || this.options.speed;

    this.modal.style.setProperty('--modal-time', `${currSpeed / 1000}s`);
    this.modal?.classList.add(this.options.classNames.show);

    const currWindow = this.modal?.querySelector(`[${this.options.dataAttributes.window}="${modalData.dataset.modalBtn || modalData.dataset.modalWindow}"]`);

    const currActiveWindow = this.modal?.querySelector(`.${this.options.classNames.window}.${this.options.classNames.active}`);
    if (currActiveWindow) {
      this.reOpenModal(modalData, currSpeed);
    } else {
      currWindow.classList.add(this.options.classNames.show);
      setTimeout(() => {
        currWindow.classList.add(this.options.classNames.active);
      });

      this.disableScroll();

      this.tabindexOff();

      this.focusToModal(currWindow, currSpeed);

      this.openModalA11y(currWindow);

      this.options.isOpen(this);
    }
  }

  closeModal(modalBtn) {
    const { currSpeed } = this.getParamsModal();

    if (!modalBtn) {
      this.modal?.classList.remove(this.options.classNames.show);
    }

    const currWindow = this.modal?.querySelector(`.${this.options.classNames.window}.${this.options.classNames.active}`);
    currWindow?.classList.remove(this.options.classNames.active);
    setTimeout(() => {
      currWindow?.classList.remove(this.options.classNames.show);
      this.enableScroll();
    }, currSpeed);

    this.focusToBtn();

    this.closeModalA11y(currWindow);

    this.options.isClose(this);
  }

  reOpenModal(modalBtn, currSpeed) {
    this.closeModal(modalBtn);
    this.tabindexOff();

    setTimeout(() => {
      this.openModal(modalBtn);
    }, currSpeed);
  }

  openModalA11y(currWindow) {
    currWindow?.setAttribute('aria-hidden', 'false');
  }

  closeModalA11y(currWindow) {
    currWindow?.setAttribute('aria-hidden', 'true');
  }

  disableScroll() {
    const fixBlocks = document?.querySelectorAll(`[${this.options.dataAttributes.fixBlock}]`);
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - this.body.offsetWidth)}px`;

    this.html.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    this.body.style.paddingRight = paddingOffset;
    this.body.classList.add('dis-scroll');
    this.body.dataset.position = pagePosition;
    this.body.style.top = `-${pagePosition}px`;
  }

  enableScroll() {
    const fixBlocks = document?.querySelectorAll(`[${this.options.dataAttributes.fixBlock}]`);
    const pagePosition = parseInt(this.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
    this.body.style.paddingRight = '0px';

    this.body.style.top = 'auto';
    this.body.classList.remove('dis-scroll');
    window.scroll({
      top: pagePosition,
      left: 0
    });
    this.body.removeAttribute('data-position');
  }

  getParamsModal() {
    const currSpeed = parseFloat(getComputedStyle(this.modal).getPropertyValue('--modal-time')) * 1000;

    return { currSpeed };
  }

  focusToModal(currWindow, currSpeed) {
    this.modalFocusableElements = Array.from(currWindow.querySelectorAll(this.focusElements));
    this.documentFocusableElements = Array.from(document.querySelectorAll(this.focusElements));
    this.previusActiveBtn = document.activeElement;

    this.tabindexOff();

    setTimeout(() => {
      this.modalFocusableElements[0]?.focus();
    }, currSpeed);
  }

  focusMoving(e) {
    const focusIndex = this.modalFocusableElements.indexOf(document.activeElement);

    const keysToExclude = ['Escape', 'Tab'];
    if (!e.shiftKey && e.key !== 'Enter' && e.key !== ' ' && keysToExclude.includes(e.key) && focusIndex === this.modalFocusableElements.length - 1 && this.modalFocusableElements.length > 0) {
      this.modalFocusableElements[0].focus();
      e.preventDefault();
    }

    if (e.shiftKey && e.key === 'Tab' && focusIndex === 0) {
      this.modalFocusableElements[this.modalFocusableElements.length - 1].focus();
      e.preventDefault();
    }
  }

  focusToBtn() {
    this.previusActiveBtn.focus();

    this.tabindexOn();
  }

  tabindexOn() {
    this.documentFocusableElements?.map(focusElem => focusElem?.removeAttribute('tabindex'));
  }

  tabindexOff() {
    this.documentFocusableElements?.map(focusElem => focusElem?.setAttribute('tabindex', '-1'));
    this.modalFocusableElements?.map(focusElem => focusElem?.removeAttribute('tabindex'));
  }
}