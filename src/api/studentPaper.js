import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

/**
 * 学生提交考卷保存数据
 * @param examId
 * @param paper
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const studentPaperSaveServer = (examId, paper) => {
    const userInfoStore = useUserInfoStore()
    return request.post("/student-paper/save", {
        userId: userInfoStore.userInfo.userId,
        examId,
        paper
    })
}


export const studentPaperPageServer = (examId) => {
    const userInfoStore = useUserInfoStore()
    return request.post("/student-paper/page", {
        userId: userInfoStore.userInfo.userId,
        examId,
        pageNum: 1,
        pageSize: 1
    })
}