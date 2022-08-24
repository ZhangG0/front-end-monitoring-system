// 轮询，默认5min(300000ms)
export function polling(func, time = 300000) {
  func() // 在 setInterval 前先执行一次
  setInterval(() => {
    func()
  }, time)
}
