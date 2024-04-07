import request from "@/utils/request.js";

/**
 * 分页查询课堂考试
 * @param classId
 * @param pageNum
 * @param examTitle
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const examsPageServer = (classId, pageNum, examTitle) => {
    return request.post("/exams/page", {
        classId,
        examTitle,
        pageNum,
        pageSize: 20
    })
}


/**
 * 新增考试
 * @param classId
 * @param examTitle
 * @param startTime
 * @param endTime
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const examsSaveServer = (classId, examTitle, startTime, endTime, stage) => {
    return request.post("/exams/save", {
        classId,
        examTitle,
        startTime,
        endTime,
        stage
    })
}

/**
 * 更新考试
 * @param classId
 * @param examId
 * @param paperId
 * @param examTitle
 * @param startTime
 * @param endTime
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const examsUpdateServer = (classId, examId, paperId, examTitle, startTime, endTime, stage) => {
    return request.post("/exams/save", {
        classId,
        examId,
        paperId,
        examTitle,
        startTime,
        endTime,
        stage
    })
}

/**
 * 根据考试ID查找考试信息
 * @param examId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const examsGetByIdServer = (examId) => {
    return request.get("/exams/getById", {
        params: {
            examId
        }
    })
}

/**
 * 数据根据id批量删除考试
 * @param examIds
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const examsDelBatchServer = (...examIds) => {
    return request.post("/exams/delBatch", examIds)
}