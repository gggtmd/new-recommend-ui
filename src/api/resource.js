import request from "@/utils/request.js";


export const resourcesFindResourceServer = (resourceId) => {
    const params = new URLSearchParams()
    params.append("resourceId", resourceId)
    return request.post("/resources/findResource", params)
}