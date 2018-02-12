var $sql = require('./movieSqlMapping');
const { querySql } = require('../util.js')

module.exports = {
	add: function (param) {
		// const param = ctx.request.body;
		console.log(param, 'parma')
		querySql($sql.insert, [param.doubanId, param.rate, param.text, param.poster])
		// return new Promise((reslove, reject) => {
		// 	querySql($sql.insert, [param.doubanId, param.rate, param.text, param.poster]).then(result => {
		// 		if (result) {
		// 			reslove({code: 1, msg: '电影添加成功'})
		// 		} else {
		// 			reject({code: 0, msg: '电影添加失败'})
		// 		}
		// 	})
		// })
	}
}