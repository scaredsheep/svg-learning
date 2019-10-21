/**
 * 四则运算函数，修复js中的计算精度问题
 * @date    2019-10-21 10:48:06
 * @version 1.0.0
 */

/**
 * 计算两数相加
 * @param {Number|String} arg1 数字1
 * @param {Number|String} arg2 数字2
 * @returns {Number}
 */
const add = (arg1, arg2) => {
  let r1 = 0;
  let r2 = 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  const c = Math.abs(r1 - r2);
  const m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

/**
 * 计算数值小数部分位数
 * @param {Number|String} value 数值
 * @returns {Number}
 */
const getDecimalLength = value => {
  const list = value.toString().split('.');
  let result = 0;
  if (list[1] !== undefined && list[1].length > 0) {
    result = list[1].length;
  }
  return result;
}

/**
 * 计算两数相减结果
 * @param {Number|String} arg1 参数1
 * @param {Number|String} arg2 参数2
 * @returns {Number}
 */
const subtract = (arg1, arg2) => {
  const max = Math.max(getDecimalLength(arg1), getDecimalLength(arg2));
  const k = Math.pow(10, max);
  return (multiply(arg1, k) - multiply(arg2, k)) / k;
}

/**
 * 计算两数相乘结果
 * @param {Number|String} arg1 参数1
 * @param {Number|String} arg2 参数2
 * @returns {Number}
 */
const multiply = (arg1, arg2) => {
  const intArg1 = +(arg1 + '').replace('.', '');
  const intArg2 = +(arg2 + '').replace('.', '');
  const decimalLength = getDecimalLength(arg1) + getDecimalLength(arg2);
  return (intArg1 * intArg2) / Math.pow(10, decimalLength);
}

/**
 * 计算两数相除结果，arg1 / arg2
 * @param {Number|String} arg1 参数1
 * @param {Number|String} arg2 参数2
 * @returns {Number}
 */
const division = (arg1, arg2) => {
  let r1 = 0;
  let r2 = 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  const t1 = Number(arg1.toString().replace('.', ''));
  const t2 = Number(arg2.toString().replace('.', ''));
  return (t1 / t2) * Math.pow(10, r2 - r1);
}

export { add, subtract, multiply, division };