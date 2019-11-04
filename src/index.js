import { NodeAnimator, Separator, withWrapper, withTitleWrapperView } from './components';
import 'typeface-open-sans/index.css';
// import 'tween/tween';
import './styles/global.scss';
import styles from './styles.scss';

const containerId = 'root';

const initApp = () => {
  const rootContainer = document.getElementById(containerId);

  // example 1 - via css transition
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.first, styles.animatedTransition]
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 1: цель - переместить элемент при наведении на блок слева направо',
      subtitle: 'CSS transition',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 2 - via css animation
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.second, styles.animatedKeyframes],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 2: цель - изменять различные параметры стилей элемента по ключевым кадрам',
      subtitle: 'CSS keyframes',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 3 - via transitionend callback
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.third, styles.animatedTransition],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 3: цель - переместить элемент слева направо и обратно с использованием JS и transitionend',
      subtitle:
        'transitionend events',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
    rect.runAnimationsViaTransitionEndCallback();
  })();

  // example 4 - via setTimeout delays
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.fourth, styles.animatedTransition],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title:
        'Пример 4: цель - переместить элемент слева направо и обратно, но с использованием двух таймеров c задержкой',
      subtitle:
        'setTimeout sequence (callbacks)',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
    rect.runAnimationViaSetTimeoutDelays();
  })();

  // example 5 - via setTimeout loop
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.fifth],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 5: цель - переместить элемент слева направо используя цикл перерисовок через setTimeout',
      subtitle:
        'loop via setTimeouts',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
    rect.runAnimationsViaSetTimeoutLoop();
  })();
  // example 6 - via raf
  (() => {
    const rect = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.sixth],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode = rect.getTemplate();
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(rectNode);
    rect.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 6: цель - переместить элемент слева направо используя цикл вызовов через requestAnimationFrame',
      subtitle:
        'loop via requestAnimationFrame',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
    rect.runAnimationsViaRafLoop();
  })();
  // example 7 - comparing raf and setTimeout
  (() => {
    const rect1 = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.fifth],
      classNamesWrapper: [styles.wrapper],
    });
    const rect2 = new NodeAnimator({
      containerId,
      classNames: [styles.rect, styles.sixth],
      classNamesWrapper: [styles.wrapper],
    });
    const rectNode1 = rect1.getTemplate();
    const rectNode2 = rect2.getTemplate();
    const finalNode = document.createElement('div');
    finalNode.appendChild(rectNode1);
    finalNode.appendChild(rectNode2);
    const borderedWrapper = withWrapper({ classNames: [styles.wrapper] })(finalNode);
    rect1.setParentNode(borderedWrapper);
    rect2.setParentNode(borderedWrapper);
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Сравнение работы setTimeout и requestAnimationFrame',
      subtitle:
        'Top - loop via setTimeout\nBottom - loop via requestAnimationFrame\n',
    })(borderedWrapper);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
    rect1.runAnimationsViaSetTimeoutLoop();
    rect2.runAnimationsViaRafLoop();
  })();
};

initApp();
