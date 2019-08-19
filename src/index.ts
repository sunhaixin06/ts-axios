import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'

const axios = (config: AxiosRequestConfig): void => {
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
}

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
