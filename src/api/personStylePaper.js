import request from "@/utils/request.js";

import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()
const userId = userInfoStore.userInfo.userId
/**
 * 用户风格测试数据存储信息查询
 * @param userId 用户ID
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personStylePaperPageServer = (userId) => {
    return request.post("/person-style-paper/page", {
        pageNum: 1,
        pageSize: 1,
        userId
    })
}

/**
 * 用户提交测试卷保存数据
 * @param answers 用户问题答案
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personStylePaperSaveServer = (answers) => {
    return request.post("/person-style-paper/save", {
        answers,
        userId
    })
}

/**
 * 获取学习资源推荐
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personStylePaperResourceRecommendServer = () => {
    const params = new URLSearchParams()
    params.append("userId",userId)
    return request.post("/person-style-paper/resource-recommend", params)
}

/**
 * 获取试题资源推荐
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personStylePaperQuestionRecommendServer = () => {
    const params = new URLSearchParams()
    params.append("userId",userId)
    return request.post("/person-style-paper/question-recommend", params)
}


export const personStylePaperPersonResourceStyleServer = (...userIds) => {
    const params = new URLSearchParams()
    params.append("userIds",userIds)
    return request.post("/person-style-paper/person-resource-style", params)
}