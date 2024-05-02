import request from "@/utils/request.js";

/**
 * 字形学习列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const glyphListServer = () => {
    return request.get("/glyph/list")
}

export const glyphPageServer = (glyphChinese, pageNum, pageSize = 30) => {
    return request.post("/glyph/page", {
        glyphChinese,
        pageNum,
        pageSize
    })
}