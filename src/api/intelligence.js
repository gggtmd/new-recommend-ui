import request from "@/utils/request.js";


export const intelligenceSendQuestionServer = (question) => {
    return request.get("/intelligence/sendQuestion", {
        params: {
            question
        }
    })
}