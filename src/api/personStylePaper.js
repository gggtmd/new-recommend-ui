import request from "@/utils/request.js";

export const personStylePaperPageServer = (userId) => {
    return request.post("/person-style-paper/page", {
        pageNum: 1,
        pageSize: 1,
        userId
    })
}