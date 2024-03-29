import request from "@/utils/request.js";

/**
 * 课堂所有阶段查询
 * @param classIds
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classKnowledgeQueryClassStageServer = (classIds) => {
    return request.post("/class-knowledge/queryClassStage", [classIds])
}

/**
 * 课堂阶段知识点关联查询
 * @param classId
 * @param stage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classKnowledgePageServer = (classId, stage) => {
    return request.post("/class-knowledge/page", {
        classId,
        stage
    })
}

/**
 * 设置课堂阶段状态
 * @param classId
 * @param stage
 * @param statue
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classKnowledgeClassStageStatusServer = (classId, stage, statue) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    params.append("stage", stage)
    params.append("statue", statue)
    return request.post("/class-knowledge/class-stage-status", params)
}

/**
 * 课堂知识点关联的新增/修改
 * @param classKnowledgeList
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classKnowledgeSaveServer = (classKnowledgeList) => {
    return request.post("/class-knowledge/save", classKnowledgeList)
}