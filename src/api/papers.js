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