// 重写 fetch 方法
if (window.fetch) {
    let _origin_fetch = window.fetch;
    window.fetch = function () {
      let startTime = Date.now();
      let args = [].slice.call(arguments);

      let fetchInput = args[0];
      let method = "GET";
      let url;

      if (typeof fetchInput === "string") {
        url = fetchInput;
      } else if (
        "Request" in window &&
        fetchInput instanceof window.Request
      ) {
        url = fetchInput.url;
        if (fetchInput.method) {
          method = fetchInput.method;
        }
      } else {
        url = "" + fetchInput;
      }

      if (args[1] && args[1].method) {
        method = args[1].method;
      }

      // TODO eagle check
      let fetchData = {
        method: method,
        url: url,
        status: null,
      };

      return _origin_fetch.apply(this, args).then(function (response) {
        fetchData.status = response.status;
        fetchData.type = "fetch";
        fetchData.duration = Date.now() - startTime;
        response = fetchData;
        return response;
      });
    };
  }
  //发送后的请求可以监控到
  fetch("https://autumnfish.cn/api/joke/")
    .then((response) => console.log(response))
    .then((data) => console.log(data));