import request from "@/utils/request";

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