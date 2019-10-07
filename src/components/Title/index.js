import styles from './styles.scss';

export default class Title {
  constructor({title}){
    this.props = { title };
    this.initialize();
  }
  initialize() {
    this.node = document.createElement('div');
    this.node.innerText = this.props.title;
    this.node.classList.add(styles.component);
  }
  getTemplate() {
    return this.node;
  }
};
