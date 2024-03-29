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