import request from "@/utils/request.js";

/**
 * 题库列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const questionBankListServer = () => {
    return request.get("/question-bank/list")
}