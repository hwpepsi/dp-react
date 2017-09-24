const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

//首页 超值特惠
const homeAdData = require('./home/ad')
router.get('/api/homead',(ctx,next) => {
    ctx.body = homeAdData
})

//首页 猜你喜欢
const homeListData = require('./home/list')
router.get('/api/homelist/:city/:page',(ctx,next) => {
    //获取参数
    const params = ctx.params
    const city = params.city
    const page = params.page
    ctx.body = homeListData
})

// 搜索结果页 - 搜索结果 - 三个参数
const searchListData = require('./search/list')
router.get('/api/search/:page/:city/:category/:keyword', (ctx,next) => {
    //console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = ctx.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
    console.log('关键字：' + paramsKeyword)

    ctx.body = searchListData
})
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', (ctx,next) => {
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = ctx.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)

    ctx.body = searchListData
})


//详情页面
const detailData = require('./detail/info')
router.get('/api/detail/info/:id',(ctx,next) => {
    //获取参数
    const params = ctx.params
    const id = params.id
    ctx.body = detailData
})
//详情页面 --评价列表
const commentData = require('./detail/comment')
router.get('/api/detail/comment/:id',(ctx,next) => {
    const params = ctx.params
    const id = params.id
    ctx.body = commentData
})
//User界面中 订单列表
const orderList = require('./orderlist/orderlist')
router.get('/api/user/orderlist',(ctx,next) => {
    ctx.body = orderList
})

// 开始服务并生产路由
app.use(router.routes())
    .use(router.allowedMethods)
app.listen(3000)
console.log("app run at http://localhost:3000")