//导入mysql2
const mysql = require('mysql2')
//创建数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mjl123456',
    database: 'student'
})
//导出连接
module.exports = connection