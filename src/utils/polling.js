// 轮询，默认5min(300000ms)
export function polling(func, time = 300000) {
  time = this.$bus.on()
  func() // 在 setInterval 前先执行一次
  let timer = setInterval(() => {
    func()
  }, time)
  return timer // 返回timer给你们clearInterval()
}
