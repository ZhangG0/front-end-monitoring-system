import request from './request.js'

export const performanceGET = () => {
  return request({
    url: '/performance',
    method: 'get',
  })
}
export const getUvOrPv = () => request({ url: "/user/performance", method: 'get' })
export const getPageStopTime = () => request({ url: "/page/getPagesTime", method: 'get' })
