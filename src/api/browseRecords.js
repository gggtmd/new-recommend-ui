import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore;

/**
 * 浏览记录的新增/修改
 * @param resourceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const browseRecordsSaveServer = (resourceId) => {
    return request.post("/browse-records/save", {
        resourceId,
        userId: userInfoStore.userId
    })
}