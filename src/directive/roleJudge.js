import {useUserInfoStore} from "@/stores/userInfo.js";

const roleJudge = {
    mounted: (el, binding, vnode, prevNode) => {
        const userInfoStore = useUserInfoStore()
        const userInfo = userInfoStore.userInfo
        const roleId = userInfo.roleId
        if(binding.value > roleId) {
            el.remove()
        }
    }
}

export default roleJudge