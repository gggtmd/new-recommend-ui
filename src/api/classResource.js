import request from "@/utils/request.js";

/**
 * 根据课程ID查询教学资源
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const classResourceQueryClassAnnouncementsServer = (classId) => {
    const params = new URLSearchParams()
    params.append("classId", classId)
    return request.post("/class-resource/queryClassAnnouncements", params)
}