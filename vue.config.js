module.exports = {
    devServer: {
        host: '127.0.0.1', // 本地地址
        port: 8080, // 端口号
        open: true, // 配置项目在启动时自动在浏览器打开
        proxy: {
            '/api' : { // '/api'是代理标识，一般是每个接口前的相同部分
                target: "http://175.178.236.203:8080", // 请求地址，一般是服务器地址
                changeOrigin: true, // 是否进行跨域
            }
        }
    }
}