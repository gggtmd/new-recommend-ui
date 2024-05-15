import request from "@/utils/request.js";

/**
 * 课程查询
 * @param pageNum
 * @param pageSize
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const lessonPageServer = (pageNum, pageSize = 8) => {
    return request.post("/lesson/page",{
        pageNum,
        pageSize,
    })
}

/**
 * 课程列表查询
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const lessonListServer = () => {
    return request.get("/lesson/list")
}
