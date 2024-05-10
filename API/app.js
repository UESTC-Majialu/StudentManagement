//导入express
const express = require('express')
//导入cors解决跨域
const cors = require('cors')
//导入数据库
const db = require('./db')
//创建服务器实例
const app = express()
//配置跨域
app.use(cors())
//解析表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//设置端口号为3007
const PORT = 3007


//获取所有学生成绩
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM score'
  db.query(sql, (err, result) => {
    if (err) return res.send({ status: 500, message: err.message })
    res.send({ status: 200, message: 'success', data: result })
  })
})

//添加学生信息
app.post('/add', (req, res) => {
  //使用对象解构从请求体中获取学生信息
  const { student_id, name, age, gender, chinese, math, english } = req.body
  // 构建一个对象，包含学生信息
  const studentData = {
    create_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    student_id,
    name,
    age,
    gender: gender === true ? 1 : 0,
    chinese,
    math,
    english
  }

  // 构建SQL插入语句并执行
  const sql = 'INSERT INTO score SET ?'

  // 使用db.query执行SQL语句，将studentData作为参数传递
  db.query(sql, studentData, (err, result) => {
    if (err) {
      // 如果发生错误，返回错误状态和消息
      return res.send({ status: 500, message: err.message });
    }

    // 如果插入成功，返回成功的状态和消息，可以根据实际情况返回插入的ID或其他信息
    res.send({ status: 200, message: '添加成功', data: result.insertId });
  })
})

//修改学生信息
app.put('/edit', (req, res) => {
  const { id, student_id, name, age, gender, chinese, math, english } = req.body
  //构建一个对象，包含学生信息
  const studentData = {
    create_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    student_id,
    name,
    age,
    gender: gender === true ? 1 : 0,
    chinese,
    math,
    english
  }
  //更新对应id的学生信息
  const sql = 'UPDATE score SET ? WHERE id = ?'
  db.query(sql, [studentData, id], (err, result) => {
    if (err) return res.send({ status: 500, message: err.message })
    res.send({ status: 200, message: '更新成功', data: result })
  })
})

//删除学生信息
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM score WHERE id = ?'
  db.query(sql, id, (err, result) => {
    if (err) return res.send({ status: 500, message: err.message })
    res.send({ status: 200, message: '删除成功', data: result })
  })
})

//监听端口，启动服务
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})