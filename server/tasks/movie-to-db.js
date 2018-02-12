const cp = require('child_process')
const {
	resolve
} = require('path')
const MovieDao = require('../dao/movie/movie.js')
const {querySqlNoPromise, querySql} = require('../dao/util.js')

;
(async () => {
	const script = resolve(__dirname, '../../conndb/crawler.js')
	const child = cp.fork(script, [])
	let invoked = false

	child.on('error', err => {
		if (invoked) return
		invoked = true
		console.log(err)
	})

	child.on('exit', code => {
		if (invoked) return
		invoked = true
		let err = code === 0 ? null : new Error('进程执行失败 exit code' + code)
		console.log(code)
	})

	child.on('message', data => {
		let result = data.result
		// console.log(result)
		const insert = `INSERT INTO movie(doubanId, rate, text, poster) VALUES(?,?,?,?)`
		result.forEach(m => {
			const param = [m.doubanId, m.rate, m.text, m.poster]
			// console.log(param, '000')
		 //  const res = querySqlNoPromise(insert, param)
		 //  console.log(res)
			pool.getConnection(function(err, connection) {
				if (err) console.log('数据库连接失败')
				connection.query(insert, param, function(err, result) {
					if (err) console.log('添加失败', err)
					if (result) console.log(result, '添加成功')
					connection.release()
				})
			})
		})
	})
})()