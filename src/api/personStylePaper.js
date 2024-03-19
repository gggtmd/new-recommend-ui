import request from "@/utils/request.js";

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
import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()
const userId = userInfoStore.userInfo.userId
export const personStylePaperSaveServer = (answers) => {

    return request.post("/person-style-paper/save", {
        answers,
        userId
    })
}