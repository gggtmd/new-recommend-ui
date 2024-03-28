import request from "@/utils/request.js";

/**
 * 题库试题数组查询
 * @param bankId
 * @param pageNum
 * @param pageSize
 * @param questionStatement 题目名
 * @param type
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const questionsQuestionAndOptionsServer = (bankId, pageNum, pageSize = 16, questionStatement = "", type = "") => {
    return request.post("/questions/questionAndOptions", {
        bankId,
        pageNum,
        pageSize,
        questionStatement,
        type
    })
}

/**
 * 分页查询
 * @param bankId
 * @param pageNum
 * @param pageSize
 * @param questionStatement
 * @param type
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const questionsPageServer = (bankId, pageNum, pageSize = 24, questionStatement = "", type = "") => {
    return request.post("/questions/page", {
        bankId,
        pageNum,
        pageSize,
        questionStatement,
        type
    })
}

/**
 * 根据id查询单个试题选项
 * @param questionId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const questionsFindQuestionOptionsServer = (questionId) => {
    let params = new URLSearchParams()
    params.append("questionId", questionId)
    return request.post("/questions/findQuestionOptions", params)
}

/**
 * 根据试题id查询单个试题
 * @param questionId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const questionsFindQuestionServer = (questionId) => {
    let params = new URLSearchParams()
    params.append("questionId", questionId)
    return request.post("/questions/findQuestion", params)
}