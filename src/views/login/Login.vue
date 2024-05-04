<script setup>
import { ref, onMounted, computed } from "vue";
import { ArrowUpBold } from '@element-plus/icons-vue'
//卡片高度
const wrapperHeight = ref("")
//缓存卡片高度
const cacheHeight = ref("")
//箭头旋转度数
const deg = ref("0")
const wrapperRef = ref()
const inputDisplay = ref("none")
//表格
const formRef = ref()
onMounted(() => {
  toggleState()
})
//表格状态
const subButton = ref("Log in")
const onSubmit = () => {
  formRef.value.validate(valid => {
    if(valid){
      if(subButton.value === "Log in"){
        userLogin()
      }else {
        userRegister()
      }
    }
  })
}
function toggleState() {
  if(cacheHeight.value === ""){
    //卡片高度计算
    const firstHeight = wrapperRef.value.clientHeight - 45;
    wrapperHeight.value = firstHeight + "px";
    //缓存变换后卡片高度
    const secondHeight = wrapperRef.value.clientHeight - 45;
    cacheHeight.value = secondHeight + 200 + "px";
    setTimeout(() => {
      rules.value = rule1
      formRef.value.resetFields()
    },0)
  } else {
    //信息切换
    subButton.value = (subButton.value === "Log in"?"Register":"Log in")
    deg.value = (deg.value === "0"?"-180deg":"0")
    inputDisplay.value = (inputDisplay.value === "none"?"flex":"none")
    //高度切换
    let tempHeight = wrapperHeight.value
    wrapperHeight.value = cacheHeight.value
    cacheHeight.value = tempHeight
    // 重置表格
    rules.value = (subButton.value === "Log in"?rule1:rule2)
    setTimeout(() => {
      formRef.value.resetFields()
    },0)
  }
}
const toggleLabel = computed(() => {
  return subButton.value === "Log in"?"Register":"Log in"
})

//表单验证规则
const validateName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('用户名不能为空'));
  } else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('密码不能为空'));
  } else {
    callback();
  }
};
const validateProfession = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('职业不能为空'));
  } else {
    callback();
  }
};
const validateEmail = (rule, value, callback) => {
  const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!value) {
    return callback(new Error('邮箱不能为空'));
  } else if (regEmail.test(value)) {
    return callback();
  } else {
    callback(new Error('请输入合法邮箱'));
  }
};
const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('验证码不能为空'));
  } else {
    callback();
  }
};
const rules = ref({})
const rule1 = {
  email: [
    {validator: validateEmail, trigger: 'blur'},
  ],
  password: [
    {validator: validatePass, trigger: 'blur'},
  ],
}
const rule2 = {
  email: [
    {validator: validateEmail, trigger: 'blur'},
  ],
  password: [
    {validator: validatePass, trigger: 'blur'},
  ],
  userName: [
    {validator: validateName, trigger: 'blur'},
  ],
  profession: [
    {validator: validateProfession, trigger: 'blur'},
  ],
  code: [
    {validator: validateCode, trigger: 'blur'},
  ],
}

//登录
import { personLoginServer } from '@/api/person.js'
import {personStylePaperPageServer} from "@/api/personStylePaper.js";
import { useTokenStore } from '@/stores/token.js'
import { useUserInfoStore } from "@/stores/userInfo.js";
import {usePersonStylePaperStore} from "@/stores/personStylePaper.js";
import { useRouter } from "vue-router"
const tokenStore = useTokenStore()
const userStore = useUserInfoStore()
const personStylePaperStore = usePersonStylePaperStore()
const router = useRouter()
const loginForm = ref({
  email: "",
  password: "",
  userName: "",
  profession: "",
  code: ""
})
async function userLogin() {
  let res = await personLoginServer(loginForm.value)
  if(res.code === 200) {
    tokenStore.setToken(res.data.token)
    userStore.setUserInfo(res.data)
    //查看用户是否填写风格问卷
    let personStyleRes = await personStylePaperPageServer(res.data.userId)
    personStylePaperStore.setPersonStylePaper(personStyleRes.data.records[0])
    router.push('/')
  }
}

//注册
import { personRegisterServer, personRegisterCodeServer } from '@/api/person.js'
import { ElMessage } from 'element-plus'
async function getRegisterCode() {
  let res = await personRegisterCodeServer(loginForm.value.email)
  if(res.code === 200){
    ElMessage.success("发送成功")
  }
}
async function userRegister() {
  let res = await personRegisterServer(loginForm.value)
  if(res.code === 200) {
    await userLogin();
  }
}

</script>

<template>
  <div class="bg-content">
    <div class="main-title">汉智大学堂</div>
    <div class="wrapper" ref="wrapperRef">
      <el-form 
        ref="formRef"
        :model="loginForm" 
        :rules="rules"
      >
        <div class="title">{{ subButton }}</div>
        <el-form-item  prop="email">
          <el-input v-model="loginForm.email"  placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item  prop="userName" class="isRegister">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item  prop="profession" class="isRegister">
          <el-select
            v-model="loginForm.profession"
            placeholder="个人职业"
          >
            <el-option label="教师" value="教师" />
            <el-option label="学生" value="学生" />
          </el-select>
        </el-form-item>
        <el-form-item  prop="code" class="isRegister">
          <el-input
            class="code-input"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          >
            <template #append><el-button @click="getRegisterCode">获取验证码</el-button></template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="button-wrapper">
        <el-button class="submitBtn" type="primary" @click="onSubmit">{{ subButton }}</el-button>
        <el-button class="toggleBtn" type="primary" @click="toggleState" link><el-icon><ArrowUpBold /></el-icon>{{ toggleLabel }}</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-content {
  width: 100vw;
  height: 100vh;
  background-image: url("https://img1.baidu.com/it/u=1769119866,58028687&fm=253&fmt=auto&app=138&f=PNG?w=860&h=370");
  background-size: cover;
}
.main-title {
  font-size: 6rem;
  font-weight: bold;
  text-indent: 50px;
  letter-spacing: 50px;
  white-space: nowrap;
  //mix-blend-mode: overlay;
  color: rgba(0, 0, 0, 0.9);
  position: absolute;
  bottom: 65%;
  left: 50%;
  transform: translate(-50%, -60%);
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  padding: 20px 25px 35px;
  border-radius: 20px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
  height: v-bind(wrapperHeight);
  overflow: hidden;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.4);
}
.el-form {
  min-width: 360px;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.6rem;
  letter-spacing: 2px;
  text-indent: 2px;
  font-weight: bold;
}
.el-form-item {
  margin-bottom: 25px;
  height: 45px;
}
.el-form-item:last-of-type {
  margin-bottom: 0;
}
.el-input {
  height: 100%;
}
.el-input::v-deep(.el-input__wrapper),
.el-select::v-deep(.el-select__wrapper),
.el-input::v-deep(.el-input-group__append){
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
}
.code-input::v-deep(.el-input__wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.el-input::v-deep(.el-input-group__append) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
}
.el-select {
  height: 100%;
}
.isRegister {
  display: v-bind(inputDisplay);
}
.button-wrapper {
  width: calc(100% - 60px);
  height: 32px;
  position: absolute;
  bottom: 15px;
}
.el-button {
  font-weight: bold;
  border-radius: 8px;
}
.toggleBtn {
  float: right;
  line-height: 32px;
}
.submitBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.el-icon {
  margin-right: 3px;
  transition: 0.4s;
  transform: rotate(v-bind(deg));
}
</style>