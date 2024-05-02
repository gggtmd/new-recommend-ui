import request from "@/utils/request.js";

/**
 * 文字转语音
 * @param text
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const xunFeiTextToAudioServer = (text) => {
    return request.post("/xunfei/textToAudio", {}, {
        params: {
            text
        },
        headers: {
            "Content-Type": 'application/octet-stream'
        },
        responseType: 'blob'
    })
}