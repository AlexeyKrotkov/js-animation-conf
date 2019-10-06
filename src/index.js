import { RectTransition } from './components';
import './styles/global.scss';

const containerId = 'root';

const initApp = () => {
  const rectTransitionInst = new RectTransition({
    containerId
  });

  // example 1 - via css transition
  // цель перемещать квадрат при наведении на блок слева направо
  // rectTransitionInst.runAnimationsViaCSSTransition();
  // setTimeout(rectTransitionInst.stopAnimationViaCSSTransition, 3000);

  // example 2 - via css animation
  // цель перемещать квадрат при наведении на блок слева направо и обратно
  rectTransitionInst.runAnimationsViaCSSAnimationKeyframes();
  // setTimeout(rectTransitionInst.stopAnimationsViaCSSAnimationKeyframes, 3000);

  // example 3 - via transitionend callback
  // цель перемещать квадрат при наведении на блок слева направо и обратно используя css, но не css animation keyframes
  rectTransitionInst.runAnimationsViaTransitionEndCallback();
  // setTimeout(rectTransitionInst.stopAnimationsViaTransitionEndCallback, 3000);
};

initApp();
