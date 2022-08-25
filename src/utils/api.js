import service from './request.js'

export const performanceGET = () => {
  return service({
    url: '/data/performance',
    method: 'get',
  })
}
export const whiteScreenErrorGET = () => {
  return service({
    url: '/white/ts/getError/whiteScreenError',
    method: 'get',
  })
}

export const JSErrorGET = () => {
  return service({
    url: '/js/ts/getError/JSError',
    method: 'get',
  })
}
export const InterfaceErrorGet = () => {
  return service({
    url: '/port/ts/getError/interfaceError',
    method: 'get',
  })
}
export const getUvOrPv = () => service({ url: "/user/performance", method: 'get' })
export const getPageStopTime = () => service({ url: "/page/getPagesTime", method: 'get' })
