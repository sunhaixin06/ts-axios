import { isPlainObject } from './util'

// 当我们传入的 data 为普通对象的时候，headers 如果没有配置 Content-Type 属性
// 需要自动设置请求 header 的 Content-Type 字段为：application/json;charset=utf-8
const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// parseHeaders 下一段字符串

// {
//   date: 'Fri, 05 Apr 2019 12:40:49 GMT'
//   etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
//   connection: 'keep-alive',
//   'x-powered-by': 'Express',
//   'content-length': '13'
//   'content-type': 'application/json; charset=utf-8'
// }
export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
