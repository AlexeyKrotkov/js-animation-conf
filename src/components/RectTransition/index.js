import styles from './styles.scss';

export default class RectTransition {
  constructor({ containerId }) {
    this.props = { containerId };
    this.render();
    this.rectNode = document.getElementById('rect');
    this.parentNode = document.getElementById('parent');
  }

  getTemplate() {
    return `<div id="parent" class="${styles.wrapper}">
                <div id="rect" class="${styles.rect}"></div>
            </div>`;
  }

  runAnimationsViaCSSTransition = () => {
    this.rectNode.classList.add(styles.animatedTransition);
  };

  stopAnimationViaCSSTransition = () => {
    this.rectNode.classList.remove(styles.animatedTransition);
  };

  runAnimationsViaCSSAnimationKeyframes = () => {
    this.rectNode.classList.add(styles.animatedKeyframes);
  };

  stopAnimationsViaCSSAnimationKeyframes = () => {
    this.rectNode.classList.add(styles.animatedKeyframes);
  };

  runAnimationsViaTransitionEndCallback() {
    this.rectNode.addEventListener('transitionend', e => {
      // if (this.rectNode)
    })
  }

  runAnimationsViaSetTimeout() {

  }

  runAnimationsViaRaf() {

  }

  getParentNode = () => this.parentNode;

  render() {
    const { containerId } = this.props;
    const rootNode = document.getElementById(containerId);
    rootNode.innerHTML = this.getTemplate();
  }
}
