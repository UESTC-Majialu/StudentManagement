import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// 学生模块
export const useStudentStore = defineStore(
  'student',
  () => {
    const studentInfo = ref([])
    //获取学生信息
    const getStudentInfo = async () => {
      await axios.get('http://localhost:3007').then((res) => {
        studentInfo.value = res.data.data
      })
    }
    // 添加学生信息
    const addStudentInfo = async (data) => {
      await axios.post('http://localhost:3007', data).then((res) => {
        console.log(res)
        getStudentInfo()
      })
    }
    // 修改学生信息
    const editStudentInfo = async (data) => {
      await axios.put('http://localhost:3007', data).then((res) => {
        console.log(res)
        getStudentInfo()
      })
    }
    //删除学生信息
    const deleteStudentInfo = async (id) => {
      await axios.delete(`http://localhost:3007/delete/${id}`).then(() => {
        getStudentInfo()
      })
    }
    return {
      studentInfo,
      getStudentInfo,
      addStudentInfo,
      editStudentInfo,
      deleteStudentInfo
    }
  },
  {
    persist: true // 持久化
  }
)
