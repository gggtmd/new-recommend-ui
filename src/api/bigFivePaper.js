import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()

/**
 * 用户风格测试试卷列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const bigFivePaperListServer = () => {
    return request.get("/big-five-paper/list")
}

/**
 * 用户提交测试卷保存数据
 * @param answers 用户问题答案
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const bigFivePaperSaveServer = (answers) => {
    const userId = userInfoStore.userInfo.userId
    return request.post("/big-five-paper/save", {
        answers,
        userId
    })
}