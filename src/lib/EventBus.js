export default class EventBus {
    constructor() {
        this.events = {}
    }
    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(fn)
    }
    off(evenName, fn) {
        if(this.events[evenName]){
            for (let i = 0; i < this.events[evenName].length; i++) {
                if(this.events[evenName][i] === fn) {
                    this.events[evenName].splice(i, 1)
                    break
                }
            }
        }
    }
    emit(evenName, ...args) {
        if(this.events[evenName]) {
            this.events[evenName].forEach((fn) => {
                fn(...args)
            })
        }
    }
}