import roleJudge  from '@/directive/roleJudge.js'
import split from "@/directive/split.js";

const directives = {
    roleJudge,
    split
}

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}