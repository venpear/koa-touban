var $sql = require('./userSqlMapping');
const { querySql } = require('../util.js')


module.exports = {
	add: function(ctx, next) {
		return new Promise((reslove, reject) => {
			// 获取前台页面传过来的参数
			var param = ctx.request.body;
			querySql($sql.insert, [param.name, param.age, param.address]).then(res => {
				reslove({
					msg: '添加用户成功'
				})
			}).catch(() => {
				reject({
					msg: '添加用户失败'
				})
			})
		})
	},
	list: function(ctx, next) {
		const param = ctx.request.body;
		const sql = $sql.queryAll;
		return querySql(sql)
	},
	remove: function(ctx, next) {
		const param = ctx.request.body;
		//todo 验证req参数的合法性
		if (!param.id) return Promise.resolve('用户id不能为空')
		return querySql($sql.delete, [param.id])
	},
	get: function(ctx, next) {
		const param = ctx.request.body
		if (!param.id) return Promise.resolve('用户id不能为空')
		return querySql($sql.queryById, [param.id])
	},
	update: function(ctx, next) {
		const param = ctx.request.body
		console.log(param, 'upadate-param')
		if (!param.id) return Promise.resolve('用户id不能为空')
		return querySql($sql.update, [param.name, param.age, param.address, param.id])
	}
};