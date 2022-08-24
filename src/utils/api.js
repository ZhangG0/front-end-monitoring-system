import service from './request.js'

export const performanceGET = () => {
  return service({
    url: '/performance',
    method: 'get',
  })
}
export const whiteScreenErrorGET = () => {
  return service({
    url: '/white/getError/whiteScreenError',
    method: 'get',
  })
}