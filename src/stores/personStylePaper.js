import { defineStore } from "pinia";
import { ref } from "vue";

export const usePersonStylePaperStore = defineStore(
    'personStylePaper',
    ()=>{
        const personStylePaper = ref({});
        const setPersonStylePaper = (value)=>{
            personStylePaper.value = value;
        }
        const removePersonStylePaper = ()=>{
            personStylePaper.value = '';
        }
        return {
            personStylePaper,setPersonStylePaper,removePersonStylePaper
        }
    },
    {persist:true}
);