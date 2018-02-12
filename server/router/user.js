
const Router = require('koa-router')
const UserDao = require('../dao/user/user.js')

//--------user 路由---------------
let user = new Router()
user.post('/add', async (ctx, next) => {
	const result = await UserDao.add(ctx, next);
	ctx.body = result
})

user.get('/list', async (ctx, next) => {
	const result = await UserDao.list(ctx)
	ctx.body = result
})
user.post('/remove', async (ctx, next) => {
	//TODO 应该在这处理 参数
	const result = await UserDao.remove(ctx)
	ctx.body = result
})
user.post('/get', async (ctx, next) => {
	const result = await UserDao.get(ctx)
	ctx.body = result
})
user.post('/update', async (ctx, next) => {
	const result = await UserDao.update(ctx)
	console.log(result, 'update')
	ctx.body = result
})
//----------user--------------
module.exports = user