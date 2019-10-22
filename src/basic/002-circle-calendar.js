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
    // 数字28, lightness = (1 * 100 - 64.9) * 0.8，这样就达到了alphe通道预留20%透明度的效果
    // 乘以100是百分数操作，其实与alphe通道计算透明度原理一样
    const delta = 28 / len;
    return new Array(len).fill(0).map((_, i) => {
      const c = [...color];
      c[2] += i * delta;
      c[1] += '%';
      c[2] += '%';
      return `hsl(${c.join()})`;
    })
  }
  createCircle() {
    const circle = createElement('circle', {
      cx: this.width / 2,
      cy: this.height / 2,
      r: Math.min(this.width, this.height) / 2,
      fill: 'blue'
    });
    this.svg.appendChild(circle);
  }
  render() {
    this.createCircle();
    this.wrapper.appendChild(this.svg);
  }
}

export default Calendar;