import request from "@/utils/request.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

const userInfoStore = useUserInfoStore()

export const recordsSaveServer = (questionId, answer) => {
    const userId = userInfoStore.userInfo.userId
    return request.post("/records/save", {
        userId,
        questionId,
        answer
    })
}