import Title from '../Title';
import Subtitle from '../Subtitle';
import styles from './styles.scss';

export default function withTitleWrapperView({ title, subtitle }) {
  return childrenNode => {
    const parentNode = document.createElement('div');
    parentNode.classList.add('wrapper');
    const TitleIns = new Title({ title });
    const SubtitleIns = new Subtitle({ subtitle });

    const titleRow = document.createElement('div');
    titleRow.classList.add(styles.row);
    const subtitleRow = document.createElement('div');
    subtitleRow.classList.add(styles.subRow);

    titleRow.appendChild(TitleIns.getTemplate());
    subtitleRow.appendChild(SubtitleIns.getTemplate());
    parentNode.appendChild(titleRow);
    if (subtitle) {
      parentNode.appendChild(subtitleRow);
    }
    parentNode.appendChild(childrenNode);
    return parentNode;
  };
}
