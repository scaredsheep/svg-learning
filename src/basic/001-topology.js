/**
 * 绘制一个简单的拓扑图
 * @author  scared sheep
 * @date    2019-10-16 14:45:37
 * @version 1.0.0
 */
import { createElement } from '@/util';

class Topology {
  constructor(wrapper, data) {
    this.wrapper = wrapper;
    this.data = data;
    this.centerX = wrapper.offsetWidth / 2;
    this.centerY = wrapper.offsetHeight / 2;
  }
  /**
   * 创建连接线组
   */
  createLineGroup(otherAttr, centerX, centerY) {
    const group = createElement('g', {
      style: 'cursor: pointer',
      'class': 'lineStyle'
    });
    const line1 = createElement('line', {
      x1: otherAttr.x,
      y1: otherAttr.y,
      x2: centerX,
      y2: centerY,
      stroke: '#ccc'
    });
    const line2 = createElement('line', {
      x1: otherAttr.x,
      y1: otherAttr.y,
      x2: centerX,
      y2: centerY,
      stroke: 'transparent',
      'stroke-width': 10
    });
    const rect = createElement('rect', {
      x: (otherAttr.x + centerX) / 2 - 10,
      y: (otherAttr.y + centerY) / 2 - 10,
      fill: '#999',
      width: 20,
      height: 20,
      rx: 5
    });
    const text = createElement('text', {
      x: (otherAttr.x + centerX) / 2,
      y: (otherAttr.y + centerY) / 2 + 8,
      fill: 'white',
      'font-size': 20,
      'text-anchor': 'middle'
    });
    text.innerHTML = '?';

    group.appendChild(line1);
    group.appendChild(line2);
    group.appendChild(rect);
    group.appendChild(text);

    return group;
  }
  /**
   * 创建中心圆
   */
  createCenterCircle(centerX, centerY, nodeText) {
    const group = createElement('g', {
      style: 'cursor: pointer'
    });
    const cirle = createElement('circle', {
      cx: centerX,
      cy: centerY,
      r: 48,
      fill: 'white',
      stroke: 'red',
      'stroke-width': 3
    });
    const text = createElement('text', {
      x: centerX,
      y: centerY + 8,
      'font-size': 20,
      'text-anchor': 'middle'
    });
    text.innerHTML = nodeText;

    group.appendChild(cirle);
    group.appendChild(text);

    return group;
  }
  /**
   * 创建小圆组
   * @param {Object} otherAttr 单个小圆组数据
   */
  createLittleCirle(otherAttr) {
    const group = createElement('g', { style: 'cursor: pointer', 'class': 'circleStyle' });
    const cirle = createElement('circle', {
      cx: otherAttr.x,
      cy: otherAttr.y,
      r: 36,
      fill: 'white',
      stroke: 'red',
      'stroke-width': 3,
    });
    const text = createElement('text', {
      x: otherAttr.x,
      y: otherAttr.y + 8,
      'font-size': 20,
      'text-anchor': 'middle'
    });
    text.innerHTML = otherAttr.text;

    group.appendChild(cirle);
    group.appendChild(text);

    return group;
  }
  render() {
    const otherNode = this.data.otherNode;
    const circleNum = otherNode.length;
    const angle = 360 / circleNum;
    const centerR = 150;
    otherNode.map((item, index) => {
      const _angel = index * angle * Math.PI / 180;
      item.x = Math.cos(_angel) * centerR + this.centerX;
      item.y = Math.sin(_angel) * centerR + this.centerY;
      return item;
    });

    const svg = createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      height: '100%'
    });

    otherNode.forEach(attrs => {
      svg.appendChild(this.createLineGroup(attrs, this.centerX, this.centerY));
    });

    otherNode.forEach(attrs => {
      svg.appendChild(this.createLittleCirle(attrs));
    });

    const centerGroup = this.createCenterCircle(this.centerX, this.centerY, this.data.centerNode.text);
    svg.appendChild(centerGroup);

    this.wrapper.appendChild(svg);
  }
}

export default Topology;
