import styles from './styles.scss';

export default class Separator {
  constructor(){
    this.initialize();
  }
  initialize() {
    this.node = document.createElement('div');
    this.node.classList.add(styles.component);
  }
  getTemplate() {
    return this.node;
  }
};
