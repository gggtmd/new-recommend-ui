import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

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

/**
 * 课堂用户关联的新增/修改
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classUserSaveServer = (classId) => {
    const userInfoStore = useUserInfoStore()
    return request.post("/class-user/save", {
        classId,
        userId: userInfoStore.userInfo.userId
    })
}