import request from "@/utils/request.js";

/**
 * 课堂中学生知识点掌握程度查询
 * @param classId
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const personKnowledgeQueryStudentKnowledgeComprehensionServer = (classId, userId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("userId", userId)
    return request.post("/person-knowledge/query-student-knowledge-comprehension", params)
}