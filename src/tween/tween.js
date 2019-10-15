function linear(timeFraction) {
  return timeFraction;
}

export class Tween {
  constructor({ elementNode, currentStyles }) {
    this.elementNode = elementNode;
    this.activeTweenIndex = 1;
    this.tweens = [{ point: currentStyles }];
    this.rafId = null;
  }

  getActiveTweenIndex = () => this.activeTweenIndex;
  getActiveTween = () => this.tweens[this.getActiveTweenIndex()];
  getPrevTween = () => this.tweens[this.getActiveTweenIndex() - 1];
  getActiveTweenPoint = () => this.getActiveTween().parameters;
  getPrevActiveTweenPoint = () => this.getPrevTween().parameters;
  setNextTween = () => (this.activeTweenIndex = this.getActiveTweenIndex() + 1);

  // TODO refactor
  animate = ({ timing = linear, draw, duration, callbackEnd }) => {
    let start = performance.now();

    this.rafId = requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(progress); // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        callbackEnd();
      }
    });
  };

  runTweenAnimation = () => {
    if (this.activeTweenIndex < this.tweens.length) {
      const { duration } = this.getActiveTween();
      this.animate({
        draw: this.updateStyles,
        duration,
        callbackEnd: () => {
          this.setNextTween();
          this.runTweenAnimation();
        },
      });
    }
  };

  to({ point, duration, interpolation }) {
    this.tweens.push({ point, duration, interpolation });
    return this;
  }

  updateStyles = progress => {
    // TODO refactor
    // TODO сделать чтобы считывать могло любые стили и не только x
    const nextSign = this.getActiveTweenPoint().x < this.getPrevActiveTweenPoint().x ? -1 : 1;
    this.elementNode.style.transform = `translateX(${this.getPrevActiveTweenPoint().x +
      nextSign *
        Math.abs(this.getActiveTweenPoint().x - this.getPrevActiveTweenPoint().x) *
        (progress > 0 ? progress : 0)}px)`;
  };

  start = () => {
    requestAnimationFrame(this.runTweenAnimation);
  };

  stop = () => {
    cancelAnimationFrame(this.rafId);
  };
}

const testNode = document.getElementById('tweenTestId');
const styles = { x: 100 };
const tween = new Tween({ elementNode: testNode, currentStyles: styles });
tween
  .to({ point: { x: 500 }, duration: 1000 })
  .to({ point: { x: 200 }, duration: 2000 })
  .to({ point: { x: 0 }, duration: 100 })
  .to({ point: { x: 1000 }, duration: 300 });
setTimeout(() => {
  tween.start();
}, 200);
