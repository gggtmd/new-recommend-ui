import request from "@/utils/request.js";


export const questionBankListServer = () => {
    return request.get("/question-bank/list")
}