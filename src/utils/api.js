import service from './request.js'

export const performanceGET = () => {
  return service({
    url: '/data/performance',
    method: 'get',
  })
}
