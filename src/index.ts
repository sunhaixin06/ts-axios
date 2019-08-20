import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config)
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

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

export default axios
