/**
 * @desc 时间格式处理
 * @param time
 * @returns {string} e.g. 2019-11-20 08:50:01
 */
export const timeFormat = time => {
  const _f = num => num < 10 ? "0" + num : num;
  let _s = new Date(time),
    Y = _s.getFullYear(),
    M = _s.getMonth() + 1,
    D = _s.getDate(),
    h = _s.getHours(),
    m = _s.getMinutes(),
    s = _s.getSeconds();
  return `${Y}-${_f(M)}-${_f(D)} ${_f(h)}:${_f(m)}:${_f(s)}`;
};