// 重写XMLHttpRequest方法
let xhr = window.XMLHttpRequest
if (xhr._myxhr_flag === true) {
    return
}
xhr._myxhr_flag = true

let _originOpen = xhr.prototype.open
xhr.prototype.open = function (method, url, async, user, password) {
    // TODO myxhr url check
    this._myxhr_xhr_info = {
        url: url,
        method: method,
        status: null
    }
    return _originOpen.apply(this, arguments)
}

let _originSend = xhr.prototype.send
xhr.prototype.send = function (value) {
    let _self = this
    this._myxhr_start_time = Date.now()

    let ajaxEnd = event => () => {
        if (_self.response) {
            let responseSize = null
            switch (_self.responseType) {
                case 'json':
                    responseSize = JSON && JSON.stringify(_this.response).length
                    break
                case 'blob':
                case 'moz-blob':
                    responseSize = _self.response.size
                    break
                case 'arraybuffer':
                    responseSize = _self.response.byteLength
                case 'document':
                    responseSize =
                        _self.response.documentElement &&
                        _self.response.documentElement.innerHTML &&
                        _self.response.documentElement.innerHTML.length + 28
                    break
                default:
                    responseSize = _self.response.length
            }
            _self._myxhr_xhr_info.event = event
            _self._myxhr_xhr_info.status = _self.status
            _self._myxhr_xhr_info.success =
                (_self.status >= 200 && _self.status <= 206) || _self.status === 304
            _self._myxhr_xhr_info.duration = Date.now() - _self._myxhr_start_time
            _self._myxhr_xhr_info.responseSize = responseSize
            _self._myxhr_xhr_info.requestSize = value ? value.length : 0
            _self._myxhr_xhr_info.type = 'xhr'
            cb(this._myxhr_xhr_info)
        }
    }

    // TODO myxhr url check
    this.addEventListener('load', ajaxEnd('load'), false)
    this.addEventListener('error', ajaxEnd('error'), false)
    this.addEventListener('abort', ajaxEnd('abort'), false)

    return _originSend.apply(this, arguments)
}