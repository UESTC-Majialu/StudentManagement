<script setup>
import {
  Management,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  DataLine,
  Notebook
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/layout/total">
          <el-icon><Management /></el-icon>
          <span>成绩总表</span>
        </el-menu-item>
        <el-sub-menu index="/layout">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>各科情况</span>
          </template>
          <el-menu-item index="/layout/chinese">
            <el-icon><Notebook /></el-icon>
            <span>语文</span>
          </el-menu-item>
          <el-menu-item index="/layout/math">
            <el-icon><Crop /></el-icon>
            <span>数学</span>
          </el-menu-item>
          <el-menu-item index="/layout/english">
            <el-icon><EditPen /></el-icon>
            <span>英语</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>欢迎进入学生成绩管理系统：<strong>X老师</strong></div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>学生成绩管理系统 ©2024 Created by UESTC-Majialu</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/image.png') no-repeat center / 230px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
