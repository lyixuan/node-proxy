const proxyHostObj={
    production: 'http://bd.ministudy.com/apis',
    development: 'http://172.16.117.65:8090',
}
const proxyConfig={
        target: proxyHostObj[process.env.NODE_ENV],  // target host
        changeOrigin: true,               // needed for virtual hosted sites
        pathRewrite:{                     // 处理特殊需求使用,如果有特殊需求改动,否则按后端配置api路径使用
                '/proxy': '/',
},       
    }



module.exports=proxyConfig;