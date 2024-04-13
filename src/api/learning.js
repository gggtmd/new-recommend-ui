import request from "@/utils/request.js";
import {useUserInfoStore} from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore()

/**
 * 课堂整体的平均学习情况查询
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @constructor
 */
export const learningQueryAllClassLearningServer = (classId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    return request.post("/learning/query-all-class-learning", params)
}

/**
 * 查询所有学生对课堂的平均评分
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningClassWholeSummaryServer = (classId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    return request.post("/learning/class-whole-summary", params)
}

/**
 * 查询所有学生对阶段的平均评分
 * @param classId
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningStageWholeSummaryServer = (classId, stage) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("stage", stage)
    return request.post("/learning/stage-whole-summary", params)
}

/**
 * 查询学生对阶段的评价
 * @param classId
 * @param stage
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningQueryStageSummaryServer = (classId, stage, userId = "") => {
    return request.post("/learning/query-stage-summary", {
        classId,
        stage,
        userId
    })
}

/**
 * 课堂所有学生学习情况查询(不分阶段)
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningClassAllStudentLearningServer = (classId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    return request.post("/learning/class-all-student-learning", params)
}

/**
 * 学生整体的学习情况查询
 * @param classId
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningQueryStudentLearningServer = (classId, userId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("userId", userId)
    return request.post("/learning/query-student-learning", params)
}

/**
 * 课堂阶段整体的学习情况查询(按风格分类)
 * @param classId
 * @param stageList
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningQueryStageLearningServer = (classId, ...stageList) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("stageList", stageList)
    return request.post("/learning/query-stage-learning", params)
}

/**
 * 课堂阶段不同知识点整体的掌握度查询(按风格分类)
 * @param classId
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningQueryStageKnowledgeComprehensionServer = (classId, stage) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("stage", stage)
    return request.post("/learning/query-stage-knowledge-comprehension", params)
}

/**
 * 提交阶段评分评价
 * @param classId
 * @param stage
 * @param stageRating
 * @param stageComment
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const learningStageSummaryServer = (classId, stage, stageRating, stageComment) => {
    return request.post("/learning/stage-summary", {
        classId,
        stage,
        userId: userInfoStore.userInfo.userId
    }, {
        params: {
            stageRating,
            stageComment
        }
    })
}