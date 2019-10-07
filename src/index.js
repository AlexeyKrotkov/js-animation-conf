import { RectTransition, Separator, withTitleWrapperView } from './components';
import 'typeface-open-sans/index.css';
import './styles/global.scss';

const containerId = 'root';

const initApp = () => {
  const rootContainer = document.getElementById(containerId);

  // example 1 - via css transition
  (() => {
    const rect = new RectTransition({
      containerId,
    });
    rect.runAnimationsViaCSSTransition();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 1: цель - переместить квадрат при наведении на блок слева направо',
      subtitle: 'используемый подход: transition transform property'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 2 - via css animation
  (() => {
    const rect = new RectTransition({
      containerId,
    });
    rect.runAnimationsViaCSSAnimationKeyframes();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 2: цель - переместить квадрат при наведении на блок слева направо и обратно',
      subtitle: 'используемый подход: css animation property, задаём анимацию transform property в keyframes'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 3 - via transitionend callback
  (() => {
    const rect = new RectTransition({
      containerId,
    });
    rect.runAnimationsViaTransitionEndCallback();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 3: цель - такая же, как в примере 2, с использованием JS и transitionend',
      subtitle: 'используемый подход: навешиваем слушатель на событие transitionend и проверяя количество срабатываний этого callback изменяем направление движения. Мы не завязываемся на setTimeout'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 4 - via setTimeout delays
  (() => {
    const rect = new RectTransition({
      containerId,
    });
    rect.runAnimationViaSetTimeoutDelays();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 4: цель - такая же, как в примере 2, но с использованием двух таймеров c задержкой',
      subtitle: 'используемый подход: используем два setTimeout browser callbacks, чтобы изменить направления движения и установить окончание анимации, стараемся точно синхронизировать скорость CSS анимации и браузерных таймеров'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 5 - via setTimeout loop
  (() => {
    const rect = new RectTransition({
      containerId,
    });
    rect.runAnimationsViaSetTimeoutLoop();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 5: цель - такая же, как в примере 2, но с использованием двух таймеров c задержкой',
      subtitle: 'используемый подход: создаём бесконечную петлю с помощью setTimeout. Вызываем перерисовку снова и снова с минимальной асинхронной задержкой'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();
};

initApp();
