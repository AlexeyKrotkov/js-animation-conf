import styles from './styles.scss';

export default class RectTransition {
  constructor(props) {
    this.props = props;
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
        }, 1000);
      }, 1000);
    }
  };
  runAnimationViaSetTimeoutDelays = () => {
    this.parentNode.addEventListener('mouseenter', this.mouseEnterListener2);
  };

  // example 5
  tick = () => {
    this.xPosition += 2;
    this.rectNode.style.transform = `translateX(${this.xPosition}px)`;
    if (this.xPosition <= 500 - this.rectNode.getBoundingClientRect().width) {
      this.timerId = setTimeout(this.tick, 0);
    }
  };
  animate = () => {
    clearTimeout(this.timerId);
    this.xPosition = 0;
    this.rectNode.style.transform = `translateX(0)`;
    setTimeout(this.tick, 0);
  };
  runAnimationsViaSetTimeoutLoop() {
    this.parentNode.addEventListener('mouseenter', this.animate);
  }

  // example 6
  tick2 = () => {
    this.xPosition += 4;
    this.rectNode.style.transform = `translateX(${this.xPosition}px)`;
    if (this.xPosition <= 500 - this.rectNode.getBoundingClientRect().width) {
      this.rafId = requestAnimationFrame(this.tick2);
    }
  };
  animate2 = () => {
    cancelAnimationFrame(this.rafId);
    this.xPosition = 0;
    this.rectNode.style.transform = `translateX(0)`;
    requestAnimationFrame(this.tick2);
  };
  runAnimationsViaRafLoop() {
    this.parentNode.addEventListener('mouseenter', this.animate2);
  }

  initialize() {
    this.parentNode = document.createElement('div');
    this.parentNode.classList.add(styles.wrapper);
    this.rectNode = document.createElement('div');
    this.rectNode2 = document.createElement('div');
    this.rectNode.classList.add(styles.rect);
    if (this.props.isDisableTransition) {
      this.rectNode.classList.add(styles.withoutAnimation);
    }
    // **
    this.parentNode.appendChild(this.rectNode);
    this.parentNode.appendChild(this.rectNode2);
  }

  getTemplate = () => {
    return this.parentNode;
  };
}

// function animateFromStartToEnd(start, end) {
//   // ...
// }
//
// function animateFromStartToEnd(start, end, callbackAnimationEnd) {
//   // ...
// }
//
// // полагаем, что знаем начальную позицию
// function animateToPoint(x, endAnimation) {
//   // ...
// }
//
// animateToPoint(10, () =>
//   animateToPoint(230, () => animateToPoint(110, () => animateToPoint(50, () => animateToPoint(20)))),
// );
//
// const xPositions = [10, 230, 110, 50, 20];
//
// const stylesStart = { x: 0, y: 0, scale: 1, opacity: 1 };
// // => { transform: translate(0, 0) scale(1), opacity: 1}
// const stylesEnd = { x: 100, y: 200, scale: 1.2, opacity: 0 };
// // => { transform: translate(0, 0) scale(1), opacity: 0}
//
// // frames - набор ключевых кадров с параметрами времени и интерполяции
// function getTimeLine(frames) {
//   // ...
// }
// const nextFrameByTime = getTimeLine([
//   { x: 0, y: 0, time: 200, interpolation: 'ease' },
//   { x: 100, y: 200, time: 300, interpolation: 'linear' },
//   { x: 400, y: 500, time: 400, interpolation: 'ease-in-out' },
// ]);
// // общее время прохождения timeline = 900 ms
//
//
// nextFrameByTime(0); // => {x: 0, y: 0} // начальная точка
// nextFrameByTime(56); // => {x: 33, y: 45} // какая-то промежуточная точка
// nextFrameByTime(1000); // => {x: 400, y: 500} // конечная точка
//
// // => { transform: translate(0, 0) scale(1), opacity: 1}
// const keyframe0 = { x: 0, y: 0 };
// const keyframe1 = { x: 100, y: 200 };
// const timeBetween = 300;
// // => { transform: translate(0, 0) scale(1), opacity: 0}
// console.log(keyframe0);
// console.log(keyframe1);
// console.log(timeBetween);
//
// console.log(stylesStart);
// console.log(stylesEnd);
//
// console.log(xPositions);
// animateFromStartToEnd();
//
// const startPosition = '0px';
// const endPosition = '100px';
//
// console.log(startPosition);
// console.log(endPosition);

// const xPositions = [0, 100, 300, 500, 200, 100];

// 1 - вариант задания ключевых кадров с
// привязкой к прогрессу

// const myKeyFrames = {
//   '-100': {
//     opacity: 0,
//     x: 0,
//     y: 0,
//   },
//   0: {
//     opacity: 1,
//   },
//   100: {
//     x: 0,
//     y: 0,
//     opacity: 0,
//   },
// };

// 2 - вариант задания ключевых кадров с
// привязкой к прогрессу

// const myKeyFrames2 = [
//   {
//     progress: -100,
//     state: {
//       opacity: 0,
//       x: 0,
//       y: 0,
//     },
//   },
//   {
//     progress: 0,
//     state: {
//       opacity: 1,
//     },
//   },
//   {
//     progress: 100,
//     state: {
//       x: 0,
//       y: 0,
//       opacity: 0,
//     },
//   },
// ];

// 3 - вариант задания ключевых кадров с
// привязкой ко времени
// (просто оперируем общим временем) до 2000ms
// const myKeyFrames3 = [
//   {
//     time: 0,
//     state: {
//       opacity: 0,
//       x: 0,
//       y: 0,
//     },
//   },
//   {
//     time: 500,
//     state: {
//       opacity: 1,
//     },
//   },
//   {
//     time: 2000,
//     state: {
//       x: 0,
//       y: 0,
//       opacity: 0,
//     },
//   },
// ];

// console.log(myKeyFrames);
// console.log(myKeyFrames2);
// console.log(myKeyFrames3);
//
// function getAnimationTimeLine(keyframes) {
//   // ...
// }
