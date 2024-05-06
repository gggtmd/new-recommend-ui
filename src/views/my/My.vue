<script setup>
import UserInfoEditDialog from '@/views/my/UserInfoEditDialog.vue'
import FooterLink from "@/views/my/FooterLink.vue";
import {useUserInfoStore} from "@/stores/userInfo.js";
import {computed, onMounted, ref} from "vue";
const userInfoStore = useUserInfoStore()

onMounted(() => {
  getUserInfo()
})

import {personGetByIdServer} from "@/api/person.js";
const userInfo = ref({})
const getUserInfo = async () => {
  let res = await personGetByIdServer(userInfoStore.userInfo.userId)
  userInfo.value = res.data
}

const getUserRole = computed(() => {
  if(userInfoStore.userInfo.roleId === 1){
    return "学 生";
  }else if(userInfoStore.userInfo.roleId === 2){
    return "教 师"
  }
})
const getUserGender = computed(() => {
  if(userInfo.value.gender === "M"){
    return "男";
  }else if(userInfo.value.gender === "F"){
    return "女";
  }else if(userInfo.value.gender === "U"){
    return "未知";
  }else{
    return "未知";
  }
})
const getUserSynopsis = computed(() => {
  if(userInfo.value.synopsis){
    return userInfo.value.synopsis;
  }else {
    return "暂无";
  }
})
const getUserBirth = computed(() => {
  if(userInfo.value.birth){
    return userInfo.value.birth.substring(0,10);
  }else {
    return "暂无";
  }
})

// 编辑操作
const userInfoEditRef = ref(null)
const handleEdit = () => {
  userInfoEditRef.value.updateForm(JSON.parse(JSON.stringify(userInfo.value)))
  userInfoEditRef.value.dialogVisible()
}

// 退出登录
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
const router = useRouter()
const signOut = () => {
  ElMessageBox.confirm("确定退出?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
  .then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <UserInfoEditDialog ref="userInfoEditRef"></UserInfoEditDialog>
  <div class="my">
    <div class="my-wrapper">
      <div class="userInfo">
        <div class="info-header">
          <div>用户个人信息</div>
          <el-button
              link
              type="primary"
              class="info-header-btn"
              @click="handleEdit"
          >
            编 辑
          </el-button>
        </div>
        <ul class="info-list">
          <li class="info-list-item">
            <span class="list-item-label">用户名:</span>
            <span class="list-item-content">{{ userInfo.userName }}</span>
          </li>
          <li class="info-list-item">
            <span class="list-item-label">邮箱:</span>
            <span class="list-item-content">{{ userInfo.email }}</span>
          </li>
          <li class="info-list-item">
            <span class="list-item-label">用户角色:</span>
            <span class="list-item-content">
            <el-tag>{{ getUserRole }}</el-tag>
          </span>
          </li>
          <li class="info-list-item">
            <span class="list-item-label">性别:</span>
            <span class="list-item-content">{{ getUserGender }}</span>
          </li>
          <li class="info-list-item">
            <span class="list-item-label">出生日期:</span>
            <span class="list-item-content">{{ getUserBirth }}</span>
          </li>
          <li class="info-list-item">
            <span class="list-item-label">简介:</span>
            <span class="list-item-content">
            {{ getUserSynopsis }}
          </span>
          </li>
        </ul>
      </div>
      <el-button
        class="sing-out-btn"
        type="danger"
        @click="signOut"
      >
        退出登录
      </el-button>
    </div>
    <footer-link class="footer"></footer-link>
  </div>
</template>

<style scoped>
.my {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.my-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userInfo{
  padding: 60px 30px 30px;
  max-width: 600px;
}
.info-header{
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #555;
}
.info-header-btn {
  font-weight: bold;
  font-size: 1rem;
}
.info-list{
  list-style: none;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
}
.info-list-item{
  margin-bottom: 30px;
  display: flex;
}
.info-list-item:last-child{
  margin-bottom: 0;
}
.list-item-label{
  min-width: 80px;
  margin-right: 30px;
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
  line-height: 30px;
}
.list-item-content{
  font-size: 1rem;
  font-weight: 300;
  line-height: 30px;
}
.sing-out-btn {
  margin-bottom: 40px;
}
.footer {
  background-color: #003c70;
  width: 100%;
}
</style>