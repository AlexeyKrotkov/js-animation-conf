import styles from './styles.scss';

export default class RectTransition {
  constructor() {
    this.parentNode = null;
    this.rectNode = null;
    // for example 3
    this.transitionActions = 0;
    // for example 4
    this.isAnimationActive = false;
    // for example 5
    this.xPosition = 0;
    this.isLoopAnimationActive = false;
    this.direction = 'right';
    this.initialize();
  }

  // example 1
  runAnimationsViaCSSTransition = () => {
    this.rectNode.classList.add(styles.animatedTransition);
  };

  // example 2
  runAnimationsViaCSSAnimationKeyframes = () => {
    this.rectNode.classList.add(styles.animatedKeyframes);
  };

  // example 3
  transitionEndListener = () => {
    this.rectNode.style.transform = 'translateX(0)';
    this.transitionActions += 1;
    if (this.transitionActions === 3) {
      this.transitionActions = 0;
      this.rectNode.removeEventListener('transitionend', this.transitionEndListener);
    }
  };
  mouseEnterListener = e => {
    if (!this.transitionActions) {
      this.rectNode.style.transform = 'translateX(500px) translateX(-100%)';
      this.transitionActions += 1;
      this.rectNode.addEventListener('transitionend', this.transitionEndListener);
    }
  };

  runAnimationsViaTransitionEndCallback() {
    this.parentNode.addEventListener('mouseenter', this.mouseEnterListener);
  }

  // example 4
  mouseEnterListener2 = e => {
    if (!this.isAnimationActive) {
      this.rectNode.style.transform = 'translateX(500px) translateX(-100%)';
      this.isAnimationActive = true;
      setTimeout(() => {
        this.rectNode.style.transform = 'translateX(0)';
        setTimeout(() => {
          this.isAnimationActive = false;
        });
      }, 1000);
    }
  };
  runAnimationViaSetTimeoutDelays = () => {
    this.parentNode.addEventListener('mouseenter', this.mouseEnterListener2);
  };

  // example 5
  tickLeft = () => {
    if (this.xPosition > 0) {
      this.xPosition -= 1;
      setTimeout(this.tickLeft, 0);
      this.rectNode.style.transform = `translateX(${this.xPosition}px)`;
    } else {
      this.isLoopAnimationActive = false;
    }
  };
  tickRight = () => {
    if (this.xPosition < 500 - this.rectNode.getBoundingClientRect().width) {
      this.xPosition += 1;
      this.rectNode.style.transform = `translateX(${this.xPosition}px)`;
      setTimeout(this.tickRight, 0);
    } else {
      this.tickLeft();
    }
  };
  mouseEnterListener3 = e => {
    if (!this.isLoopAnimationActive) {
      this.isLoopAnimationActive = true;
      this.tickRight();
    }
  };
  runAnimationsViaSetTimeoutLoop() {
    this.rectNode.style.transition = "none";
    this.parentNode.addEventListener('mouseenter', this.mouseEnterListener3);
  }

  runAnimationsViaRafLoop() {

  }

  runAnimationsViaTweenMaxLibrary() {

  }

  initialize() {
    this.parentNode = document.createElement('div');
    this.parentNode.classList.add(styles.wrapper);
    this.rectNode = document.createElement('div');
    this.rectNode.classList.add(styles.rect);
    // **
    this.parentNode.appendChild(this.rectNode);
  }

  getTemplate = () => {
    return this.parentNode;
  }

}
