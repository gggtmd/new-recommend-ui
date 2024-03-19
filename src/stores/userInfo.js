import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore(
    'userInfo',
    ()=>{
        const userInfo = ref({
            avatar: '',
            roleId: '',
            token: '',
            userId: '',
            userName: ''
        });
        const setUserInfo = (value)=>{
            userInfo.value = value;
        }
        const removeUserInfo = ()=>{
            userInfo.value = '';
        }
        return {
            userInfo,setUserInfo,removeUserInfo
        }
    },
    {persist:true}
);