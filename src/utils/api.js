import service from './request.js'

export const performanceGET = () => {
  return service({
    url: '/data/performance',
    method: 'get',
  })
}
export const whiteScreenErrorGET = () => {
  return service({
    url: '/white/getError/whiteScreenError',
    method: 'get',
  })
}

export const JSErrorGET = () => {
  return service({
    url: '/js/getError/JSError',
    method: 'get',
  })
}
