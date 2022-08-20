import service from './request.js'

export const performanceGET = () => {
  return service({
    url: '/performance',
    method: 'get',
  })
}
