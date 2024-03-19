import request from "@/utils/request.js";

/**
 * 用户风格测试试卷列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const studyStylePaperListServer = () => {
    return request.get("/study-style-paper/list")
}