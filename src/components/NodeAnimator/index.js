export default class NodeAnimator {
  constructor(props) {
    this.props = props;
    this.props.classNames = props.classNames || [];
    this.props.parentNode = null;
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
    this.props.parentNode.addEventListener('mouseenter', this.mouseEnterListener);
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
    this.props.parentNode.addEventListener('mouseenter', this.mouseEnterListener2);
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
    this.tick();
  };

  runAnimationsViaSetTimeoutLoop() {
    this.props.parentNode.addEventListener('mouseenter', this.animate);
  }

  // example 6

  tick2 = () => {
    this.xPosition += 2;
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
    this.props.parentNode.addEventListener('mouseenter', this.animate2);
  }

  initialize() {
    this.props.parentNode = document.createElement('div');
    this.rectNode = document.createElement('div');
    this.props.classNames.forEach(className => {
      this.rectNode.classList.add(className);
    });
    this.props.parentNode.appendChild(this.rectNode);
  }

  setParentNode(node) {
    this.props.parentNode = node;
  }

  getTemplate = () => {
    return this.props.parentNode;
  };
}

// Примеры далее нужны были для презентации и создания скриншотов с правильным синтаксисом

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
// frames - набор ключевых кадров с параметрами времени и интерполяции
//
// function getTimeLine(frames) {
//   // ...
// }
// const nextFrameByTime = getTimeLine([
//   { x: 0, y: 0, time: 200, interpolation: 'ease' },
//   { x: 100, y: 200, time: 300, interpolation: 'linear' },
//   { x: 400, y: 500, time: 400, interpolation: 'ease-in-out' },
// ]);
//
// // общее время прохождения timeline = 900 ms
//
//
// nextFrameByTime(0); // => {x: 0, y: 0} // начальная точка
// nextFrameByTime(56); // => {x: 33, y: 45} // какая-то промежуточная точка
// nextFrameByTime(1000); // => {x: 400, y: 500} // конечная точка
//
// // => { transform: translate(0, 0) scale(1), opacity: 1}

// const startPosition = '0px';
// const endPosition = '100px';
//
// console.log(startPosition);
// console.log(endPosition);

// const keyframe0 = { x: 0, y: 0 };
// const keyframe1 = { x: 100, y: 200 };
// const timeBetween = 300;
// const interpolation = 'ease-in-out';

// // => { transform: translate(0, 0) scale(1), opacity: 0}
// console.log(keyframe0);
// console.log(keyframe1);
// console.log(timeBetween);
// console.log(interpolation);
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
//
// console.log(myKeyFrames);

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
//
// const elementNode = document.getElementById('nodeToAnimate');
//
// function animateTween(animatedNode, startParameters, endParameters, duration, interpolation, endAnimationCallback) {
//   // реализация
// }
// const actualAnimatedParameters = { x: 0, y: 0 };
// // animateTween - не pure function
// animateTween(elementNode, actualAnimatedParameters, { x: 400, y: 0 }, 100, 'ease', nextPositions1 =>
//   animateTween(elementNode, nextPositions1, { x: 400, y: 400 }, 100, 'easeInOut', nextPositions2 =>
//     animateTween(elementNode, nextPositions2, { x: 0, y: 400 }, 100, 'linear', nextPositions3 =>
//       animateTween(elementNode, nextPositions3, { x: 0, y: 0 }, 100, 'easeIn'),
//     ),
//   ),
// );
//
//
// const circle = document.getElementById("rectangularId");
// let x = 0;
// let y = 0;
// let forwardX = true;
//
// function startAnimationMovingAroundRect() {
//   if (x < 400 && forwardX) {
//     x += 2;
//   } else if (x > 0 && y < 200) {
//     y += 2;
//     forwardX = false;
//   } else if (x > 0 && y > 0) {
//     x -= 2;
//   } else if (x === 0 && y > 0) {
//     y -= 2;
//   } else {
//     forwardX = true;
//     y = 0;
//     x = 0;
//   }
//   requestAnimationFrame(startAnimationMovingAroundRect);
//   circle.style.transform = `translate(${x}px, ${y}px)`;
// }
//

//
// startAnimationMovingAroundRect();

// function controlledTimeLine() {
//  ...реализация
//   return {
//     renderAnimationTickByProgress: () => null
//   }
// }
//
// function calcViewPortHeight() {
//
// }
//
//
// const animatedElement = null;
// const currentStyles = null;
//
// const myTimeline = controlledTimeLine(animatedElement, currentStyles)([
//   { x: 0, y: 0, time: 200, interpolation: 'ease' },
//   { x: 100, y: 200, time: 300, interpolation: 'linear' },
//   { x: 400, y: 500, time: 400, interpolation: 'ease-in-out' },
// ]);
//
// myTimeline.renderAnimationTickByProgress(10);
// myTimeline.renderAnimationTickByProgress(55);
// myTimeline.renderAnimationTickByProgress(100);
//
// console.log(myTimeline);
// //
// //
// const rootScrollContainer = document.getElementById('firstLandingSectionId');
//
// function calcSectionProgress() {
//   const { top, bottom, height } = rootScrollContainer.getBoundingClientRect();
//   const insideSectionProgress = (-1 * top) / height;
//   if (insideSectionProgress > 1) {
//     return 1 + (-1 * bottom) / calcViewPortHeight();
//   }
//   if (insideSectionProgress < 0) {
//     return -1*top / calcViewPortHeight();
//   }
//   return insideSectionProgress;
// }
//
// const currentProgress = calcSectionProgress();
//
// myTimeline.renderAnimationTickByProgress(currentProgress);

//
// const myTimeline = getTimeLine([
//   { x: 0, y: 0, time: 1, interpolation: 'ease' },
//   { x: 100, y: 200, time: 1, interpolation: 'linear' },
//   { x: 400, y: 500, time: 1, interpolation: 'ease-in-out' },
// ]);

// const redSection = document.getElementById('redSection');
//
// const { top: sectionTop, height: containerHeight } = redSection.getBoundingClientRect();
// const progress = (-1 * sectionTop) / containerHeight;
//
// console.log(progress);
//
// function getCurrentSectionProgress() {
//
// }
//
// function setAnimationActive() {
//
// }
//
// const triggerSectionProgress = 50;
//
// const watchTrigger = () => {
//   const sectionProgress = getCurrentSectionProgress();
//   if (sectionProgress >= triggerSectionProgress) {
//     setAnimationActive(true)
//   } else {
//     setAnimationActive(false)
//   }
// };
//
// watchTrigger()
