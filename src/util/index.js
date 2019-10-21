import * as arithmetic from './arithmetic';

/**
 * 创建svg元素方法
 * @param {String} tagName 标签名
 * @param {Object} attrs 属性对象
 * @return element
 */
const createElement = (tagName, attrs) => {
  const ns = 'http://www.w3.org/2000/svg';
  const element = document.createElementNS(ns, tagName);
  if (tagName === 'svg') {
    element.setAttribute('xmlns', ns);
  }
  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }
  return element;
};

export { createElement, arithmetic };
