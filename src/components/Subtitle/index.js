import styles from './styles.scss';

export default class Subtitle {
  constructor({subtitle}){
    this.props = { subtitle };
    this.initialize();
  }
  initialize() {
    this.node = document.createElement('div');
    this.node.innerText = this.props.subtitle;
    this.node.classList.add(styles.component);
  }
  getTemplate() {
    return this.node;
  }
};
