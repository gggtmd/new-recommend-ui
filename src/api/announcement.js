import request from "@/utils/request.js";

/**
 * 根据课程ID查询公告
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const announcementQueryClassAnnouncementsServer = (classId) => {
    const params = new URLSearchParams();
    params.append("classId", classId)
    return request.post("/announcement/queryClassAnnouncements", params)
}