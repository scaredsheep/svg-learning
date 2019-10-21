/**
 * 使用svg实现圆环日期选择器
 * @author  scared sheep
 * @date    2019-10-17 11:20:45
 * @version 1.0.0
 */
import { createElement } from '@/util';

class Calendar {
  constructor(width, height, wrapper) {
    this.width = width;
    this.height = height;
    this.wrapper = wrapper;
    this.svg = createElement('svg', {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`
    });
  }
  /**
   * 使用透明通道生成指定颜色的渐变色数组
   * @param {Number} len 渐变颜色的个数
   * @param {Array} color rgb三色数组
   * @returns {Array}
   */
  gradientColorWithAlphe(len, color) {
    color = color || [147, 112, 219];
    const delta = 0.8 / len;
    const colorTransfer = (c, o) => {
      return '#' + c.map(t => parseInt((1 - o) * 255 + o * t).toString(16)).join('');
    };
    return new Array(len).fill(0).map((_, i) => colorTransfer(color, 1 - i * delta));
  }
  /**
   * 使用HSL方式生成指定颜色的渐变色数组
   * @param {Number} len 渐变色的个数
   * @param {Array} color hsl三色数组
   * @returns {Array}
   */
  gradientColorWithHSL(len, color) {
    color = color || [260, 59.8, 64.9];
    const delta = 28 / len;
    return new Array(len).fill(0).map((_, i) => {
      const c = [...color];
      c[2] += i * delta;
      c[1] += '%';
      c[2] += '%';
      return `hsl(${c.join()})`;
    })
  }
  render() {
    // this.wrapper.appendChild(this.svg);
    const arr1 = this.gradientColorWithAlphe(4);
    const arr2 = this.gradientColorWithHSL(4);
    const wrapper1 = document.createElement('p');
    const wrapper2 = document.createElement('p');
    arr1.forEach(color => {
      const block = document.createElement('span');
      block.setAttribute('style', `display: inline-block; width: 20px; height: 20px; background: ${color}`);
      wrapper1.appendChild(block);
    });
    arr2.forEach(color => {
      const block = document.createElement('span');
      block.setAttribute('style', `display: inline-block; width: 20px; height: 20px; background: ${color}`);
      wrapper2.appendChild(block);
    });
    this.wrapper.appendChild(wrapper1);
    this.wrapper.appendChild(wrapper2);
  }
}

export default Calendar;