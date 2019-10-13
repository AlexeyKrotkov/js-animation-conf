
export default function withTitleWrapperView({ classNames }) {
  return childrenNode => {
    const parentNode = document.createElement('div');
    parentNode.classList.add('wrapper');
    parentNode.appendChild(childrenNode);
    classNames.forEach(className => {
      parentNode.classList.add(className);
    });
    return parentNode;
  };
}
