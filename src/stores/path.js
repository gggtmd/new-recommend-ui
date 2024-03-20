import { defineStore } from "pinia";
import { ref } from "vue";

export const usePathStore = defineStore(
    'path',
    ()=>{
        const path = ref('');
        const setPath = (value)=>{
            path.value = value;
        }
        const removePath = ()=>{
            path.value = '';
        }
        return {
            path,setPath,removePath
        }
    },
    {persist:true}
);