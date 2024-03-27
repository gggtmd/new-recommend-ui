import roleJudge  from '@/directive/roleJudge.js'

const directives = {
    roleJudge
}

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}