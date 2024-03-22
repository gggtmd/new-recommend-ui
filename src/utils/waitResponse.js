export const waitResponse = (fn) => {
    let isRequesting = false
    return async function () {
        if (!isRequesting) {
            isRequesting = true
            await fn()
            isRequesting = false
        }
    }
}