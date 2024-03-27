import request from "@/utils/request.js";

/**
 * 根据资源id查询单个资源
 * @param resourceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const resourcesFindResourceServer = (resourceId) => {
    const params = new URLSearchParams()
    params.append("resourceId", resourceId)
    return request.post("/resources/findResource", params)
}


export const resourcesAssessResourcesServer = (resourceId, assess) => {
    const params = new URLSearchParams()
    params.append("resourceId", resourceId)
    params.append("assess", assess)
    return request.post("/resources/assessResources", params)
}