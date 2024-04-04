import request from "@/utils/request.js";

/**
 * 根据课堂ID查找试卷ID及其标题
 * @param classId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersGetByClassId = (classId) => {
  return request.get("/papers/getByClassId", {
      params: {
        classId
      }
  })
}

/**
 * 根据试卷ID查找其包含的试题信息
 * @param paperId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersViewPaperIdServer = (paperId) => {
    return request.get(`/papers/view/${paperId}`)
}

/**
 * 课堂试卷分页查询
 * @param classId
 * @param pageNum
 * @param pageSize
 * @param paperTitle
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersPageServer = (classId, pageNum, pageSize = 20, paperTitle = "") => {
    return request.post("/papers/page", {
        classId,
        pageNum,
        pageSize,
        paperTitle
    })
}

/**
 * 自动生成试卷
 * @param bankId
 * @param paperId
 * @param typeChoice
 * @param typeEssay
 * @param typeGap
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersAutoTakePaperServer = (bankId, paperId, typeChoice = 20, typeEssay = 0, typeGap = 0) => {
    return request.post("/papers/autoTakePaper", {
        bankId,
        paperId,
        typeChoice,
        typeEssay,
        typeGap
    })
}

/**
 * 手动编写试卷
 * @param paperId
 * @param handleQuestionIds 提交题目ID数组
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersHandPaperServer = (paperId, handleQuestionIds = []) => {
    return request.post("/papers/handPaper", {
        paperId,
        handleQuestionIds
    })
}

/**
 * 试卷数据保存或更新
 * @param classId
 * @param paperTitle
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const papersSaveServer = (classId, paperTitle) => {
    return request.post("/papers/save", {
        classId,
        paperTitle
    })
}


export const papersDelBatchServer = (...ids) => {
    return request.post("/papers/delBatch", ids)
}