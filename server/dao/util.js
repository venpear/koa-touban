var $conf = require('./config');
var mysql = require('mysql');
// 使用连接池，提升性能
var pool = mysql.createPool($conf);

/**
 * 执行sql语句，返回执行结果的promise对象
 * @param  {[type]} sql   [执行sql模板语句]
 * @param  {[type]} param [sql语句参数]
 * @return {[type]}       [promise]
 */
function querySql(sql, param) {
	return new Promise((reslove, reject) => {
		pool.getConnection(function(err, connection) {
			if (err) reject({
				code: 1,
				msg: `数据库链接失败:${err}`
			})
			connection.query(sql, param, function(err, result) {
				if (err) reject({
					code: 1,
					msg: `数据库查询失败:${err}`
				})
				if (result) reslove(result)
				connection.release()
			})
		})
	})
}

function querySqlNoPromise(sql, param) {
	pool.getConnection(function (err, connection) {
		if (err) return {msg: `数据库链接失败:${err}`}
		connection.query(sql, param, function (err, result) {
			if (err) return `数据库查询失败:${err}`
			return result
		})
	})
}

module.exports = {
	pool, querySql, querySqlNoPromise
}