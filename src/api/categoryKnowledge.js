import request from "@/utils/request.js";

/**
 * 类别知识点名关联查询
 * @param categoryKnowledgeQuery
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const categoryKnowledgeQueryServer = (categoryKnowledgeQuery) => {
    return request.post("/category-knowledge/query", categoryKnowledgeQuery)
}