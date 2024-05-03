import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

/**
 * 查询资源评论
 * @param resourceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const resourceCommentQueryResourceCommentServer = (resourceId) => {
    const params = new URLSearchParams();
    params.append("resourceId", resourceId)
    return request.post("/resource-comment/query-resource-comment", params)
}

/**
 * 发送资源评论
 * @param resourceId
 * @param content
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const resourceCommentSaveServer = (resourceId, content) => {
    const userId = useUserInfoStore().userInfo.userId
    return request.post("/resource-comment/save", {
        userId,
        resourceId,
        content
    })
}