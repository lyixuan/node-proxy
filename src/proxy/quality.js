const proxyHostObj = {
    production: 'http://bd.ministudy.com/apis',
    development: 'http://172.16.117.65:8086',
}
var restream = function (proxyReq, req, res, options) {  // 在代理中将body中的参数序列化一下,否则将发送解析后的参数
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        //     // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        // proxyReq.setHeader('Content-Type', 'application/json');  // if you need
        proxyReq.write(bodyData);
    }
}

const proxyConfig = {
    target: proxyHostObj[process.env.NODE_ENV],  // target host
    changeOrigin: true,               // needed for virtual hosted sites
    pathRewrite: {                     // 处理特殊需求使用,如果有特殊需求改动,否则按后端配置api路径使用
        '/proxyQuality': '/',
    },
    onProxyReq: restream,
}




module.exports = proxyConfig