import request from "@/utils/request.js";

/**
 * 语音分页查询
 * @param chinese
 * @param pageNum
 * @param pageSize
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const pronunciationPageServer = (chinese = "", pageNum, pageSize = 30) => {
    return request.post("/pronunciation/page", {
        chinese,
        pageNum,
        pageSize
    })
}