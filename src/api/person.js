import request from "@/utils/request";
import {useUserInfoStore} from "@/stores/userInfo.js";

const userInfoStore = useUserInfoStore()

/**
 * 用户登录
 * @param {Object} userLoginDTO {email, password}
 */
export const personLoginServer = (userLoginDTO) => {
  return request.post('/person/login', userLoginDTO)
}

/**
 * 用户注册
 * @param {Object} userLoginDTO {email, password, userName, profession, code}
 */
export const personRegisterServer = (userRegisterDTO) => {
  return request.post('/person/register', userRegisterDTO)
}

/**
 * 注册获取验证码
 * @param {String} userLoginDTO email
 */
export const personRegisterCodeServer = (email) => {
  return request.post('/person/registerCode', {email})
}

/**
 * 根据用户ID查找学生或教师其加入的课堂信息
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personClassServer = () => {
  let {userId, roleId} = userInfoStore.userInfo
  if(roleId === 1) {
    return request.get('/person/view/' + userId)
  } else if(roleId === 2) {
    const params = new URLSearchParams()
    params.append("createUserId", userId)
    return request.post("/classes/getByCreateUserId", params)
  }
}

/**
 * 根据用户ID查找用户信息
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personGetByIdServer = (userId) => {
  return request.get("/person/getById", {
    params: {
      userId
    }
  })
}

/**
 * 用户ID数组查询用户信息
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personUserListServer = (...ids) => {
  return request.post("/person/UserList", ids)
}