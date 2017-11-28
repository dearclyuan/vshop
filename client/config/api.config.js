const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://maxzh.itnote.cn/api/' : 'api/'
}