const movie = {
	insert: 'INSERT INTO movie(doubanId, rate, text, poster) VALUES(?,?,?,?)',
	update: 'update user set `name`=?, `age`=?, `address`=? where `id`=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
}

module.exports = movie;