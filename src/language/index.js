import {createI18n} from "vue-i18n";
import zhCN from "@/language/zh-CN.js"
import en from "@/language/en.js";

const messages = {
  zhCN,
  en
}

const i18n = createI18n({
    messages,
    locale: 'en',
    legacy: false
})

export default i18n