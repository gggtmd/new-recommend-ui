import request from "@/utils/request.js";

/**\
 * 根据课堂ID查找课堂信息
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classesGetByIdServer = (classId) => {
    return request.get("/classes/getById", {
        params: {
            classId
        }
    })
}