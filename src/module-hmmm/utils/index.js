/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-14 23:56:26
 * @LastEditors: sj
 * @LastEditTime: 2022-08-15 00:18:42
 */


/**
 * 处理定义常量的格式
 * @param {*} constants 定义的常量对象
 * @param {*} val 对应值的数字形式
 * @returns
 */
export const formatConstants = (constants, val) => {
  const findItem = constants.find((item) => item.value == val)
  return findItem?.label
}
