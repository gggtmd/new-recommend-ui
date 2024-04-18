import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

/**
 * 浏览记录的新增/修改
 * @param resourceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const browseRecordsSaveServer = (resourceId) => {
    const userInfoStore = useUserInfoStore()
    const userInfo = userInfoStore.userInfo
    return request.post("/browse-records/save", {
        resourceId,
        userId: userInfo.userId
    })
}