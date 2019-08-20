import { isPlainObject } from './util'

// 通过执行 XMLHttpRequest 对象实例的 send 方法来发送请求
// 我们需要把data传给send函数时 需要把它转换成 JSON 字符串。
export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformResponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
