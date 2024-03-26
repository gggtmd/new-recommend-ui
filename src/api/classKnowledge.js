import request from "@/utils/request.js";

/**
 * 课堂所有阶段查询
 * @param classIds
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classKnowledgeQueryClassStageServer = (classIds) => {
    return request.post("/class-knowledge/queryClassStage", [classIds])
}