import xhr from './xhr'
import { buildURL } from './helpers/url'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig, AxiosPromise } from './types'
import { transformRequest, transformResponse } from './helpers/data'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

const transformHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}

export default axios
