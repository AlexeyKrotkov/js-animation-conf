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
      title: 'Пример 3: цель - переместить квадрат при наведении на блок слева направо и обратно с использованием JS и transitionend',
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
      title: 'Пример 4: цель - переместить квадрат при наведении на блок слева направо и обратно, но с использованием двух таймеров c задержкой',
      subtitle: 'используемый подход: используем два setTimeout browser callbacks, чтобы изменить направления движения и установить окончание анимации, стараемся точно синхронизировать скорость CSS анимации и браузерных таймеров'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();

  // example 5 - via setTimeout loop
  (() => {
    const rect = new RectTransition({
      containerId,
      isDisableTransition: true
    });
    rect.runAnimationsViaSetTimeoutLoop();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 5: цель - переместить квадрат при наведении на блок слева направо используя цикл вызовов через setTimeout',
      subtitle: 'используемый подход: создаём бесконечную петлю с помощью setTimeout. Планируем событие и выполняем его..'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();
  // example 6 - via raf
  (() => {
    const rect = new RectTransition({
      containerId,
      isDisableTransition: true
    });
    rect.runAnimationsViaRafLoop();
    const rectNode = rect.getTemplate();
    const rectWithTitleNode = withTitleWrapperView({
      title: 'Пример 6: цель - переместить квадрат при наведении на блок слева направо используя цикл вызовов через requestAnimationFrame',
      subtitle: 'используемый подход: создаём бесконечную петлю с помощью requestAnimationFrame. Вызываем перерисовку каждый раз, когда браузер может её обеспечить'
    })(rectNode);

    rootContainer.appendChild(rectWithTitleNode);
    rootContainer.appendChild(new Separator().getTemplate());
  })();
};

initApp();
