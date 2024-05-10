<script setup>
import { ref, computed } from 'vue'
import { useStudentStore } from '@/stores/student'
const searchText = ref('')
const studentStore = useStudentStore()
studentStore.getStudentInfo()
const tableData = ref([])
tableData.value = studentStore.studentInfo.map((item) => {
  return {
    id: item.id,
    student_id: item.student_id,
    name: item.name,
    age: item.age,
    gender: item.gender.data[0] === 1 ? '男' : '女',
    chinese: item.chinese,
    math: item.math,
    english: item.english,
    total: item.chinese + item.math + item.english,
    average: ((item.chinese + item.math + item.english) / 3).toFixed(2)
  }
})
const filteredData = computed(() => {
  const newData = tableData.value.filter(
    (data) => !searchText.value || data.name.includes(searchText.value)
  )
  return newData
})

const editRow = (row) => {
  console.log('Edit:', row)
  // Implement your edit logic here
}

const deleteRow = async (row) => {
  await ElMessageBox.confirm('你确定要删除该学生吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  studentStore.deleteStudentInfo(row.id)
  studentStore.getStudentInfo()
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
</script>
<template>
  <el-table :data="filteredData" style="width: 100%">
    <el-table-column label="学号" prop="student_id" />
    <el-table-column label="姓名" prop="name" />
    <el-table-column label="年龄" prop="age" />
    <el-table-column label="性别" prop="gender" />
    <el-table-column label="语文" prop="chinese" />
    <el-table-column label="数学" prop="math" />
    <el-table-column label="英语" prop="english" />
    <el-table-column label="总分" prop="total" />
    <el-table-column label="平均分" prop="average" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="searchText" placeholder="输入学生姓名搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" type="primary" @click="editRow(scope.row)">
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="deleteRow(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
