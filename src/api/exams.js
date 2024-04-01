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


export const examsSaveServer = (classId, examTitle, startTime, endTime, stage) => {
    return request.post("/exams/save", {
        classId,
        examTitle,
        startTime,
        endTime,
        stage
    })
}