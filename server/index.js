const Koa = require('koa');
const views = require('koa-views');
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyParser')
const app = new Koa();



app.use(bodyParser())

// console.log(path.resolve(__dirname, './views'))

//用户路由
const user = require('./router/user.js')




// // 加载模板引擎
// app.use(views(path.resolve(__dirname, '../views'), {
//   extension: 'pug'
// }))

// app.use( async ( ctx, next ) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title,
//   })
//   await next()
// })

// 装载所有子路由
// let router = new Router()
// router.use('/user', user.routes(), user.allowedMethods())

// 加载路由中间件
app.use(user.routes()).use(user.allowedMethods())
//

app.listen(3000)