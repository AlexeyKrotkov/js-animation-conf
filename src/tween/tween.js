// это начальные параметры
// объект хранит на протяжении всей анимации данные о текущем положении анимируемого элемента
// это было бы нужно в реальной ситуации, если бы мы хотели прервать анимацию и поменять её направление или всю анимацию
// с последнего анимируемого местоположения (то есть завязываясь на данные а не на текущие getComputedStyle()
// const actualAnimatedParameters = {x: 0, y: 0};
// animateTween - не pure function
// animateTween(elementNode, actualAnimatedParameters , {x: 400, y: 0}, 100
// (nextPositions) => animateTween(elementNode, nextPositions, {x: 400, y: 400}, 100, (nextPositions) =>
//   (nextPositions) => animateTween(elementNode, nextPositions, {x: 0, y: 400}, 100, (nextPositions) =>
//     (nextPositions) => animateTween(elementNode, nextPositions, {x: 0, y: 0}, 100, (nextPositions))
//   )
// )


class Tween {
  constructor({ elementNode }) {
    this.elementNode = elementNode;
  }

  setTween(start, end) {

  }
}
