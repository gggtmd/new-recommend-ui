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

/**
 * 学生考试情况分页查询
 * @param examId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const studentPaperPageServer = (examId) => {
    const userInfoStore = useUserInfoStore()
    return request.post("/student-paper/page", {
        userId: userInfoStore.userInfo.userId,
        examId,
        pageNum: 1,
        pageSize: 1
    })
}

/**
 * 获取不同风格学生考试成绩
 * @param examIds
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const studentPaperStyleGradeServer = (...examIds) => {
    return request.post("/student-paper/styleGrade", examIds)
}

/**
 * 课堂中学生试卷完成情况查询
 * @param classId
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const studentPaperClassStudentPaperQueryServer = (classId, userId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("userId", userId)
    return request.post("/student-paper/class-student-paper-query", params)
}