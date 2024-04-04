import request from "@/utils/request.js";

/**
 * 课堂学生Id查询
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classUserClassUsersQueryServer = (classId) => {
    const params = new URLSearchParams
    params.append("classId", classId)
    params.append("roleId", "1")
    return request.post("/class-user/class-users-query", params)
}

/**
 * 删除指定课堂学生
 * @param classId
 * @param studentIds
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classUserClassStudentDelServer = (classId, ...studentIds) => {
    return request.post("/class-user/class-student-del", studentIds, {
        params: {
            classId
        }
    })
}