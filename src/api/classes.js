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

/**
 * 新增课堂
 * @param classes
 * @param image
 * @returns {*}
 */
export const classesSaveServer = (classes, image) => {
    return request({
        transformRequest: [function(data, headers) {
            // 去除post请求默认的Content-Type
            delete headers['Content-Type']
            return data
        }],
        url: '/classes/save',
        method: 'post',
        data: image,
        params: classes
    })
}

/**
 * 获取课堂知识图谱（可按阶段分）
 * @param classId
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classesGetClassKnowledgeGraphServer = (classId, stage = "") => {
    const params = new URLSearchParams()
    classId && params.append("classId", classId)
    params.append("stage", stage)
    return request.post("/classes/getClassKnowledgeGraph", params)
}