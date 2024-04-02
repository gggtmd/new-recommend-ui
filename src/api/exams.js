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