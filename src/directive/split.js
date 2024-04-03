const split = {
    mounted: (el, binding = "horizontal", vnode, prevNode) => {
        console.log(binding)
        el.style.position = "relative"
        el.style.display = "flex"
        const splitLine = document.createElement("div")
        splitLine.style.position = "absolute"
        splitLine.style.left = "50%"
        splitLine.style.top = "50%"
        splitLine.style.transform = "translate(-50%, -50%)"
        splitLine.style.backgroundColor = "#5555"
        splitLine.style.backgroundClip = "content-box"
        if(binding.value === "horizontal") {
            el.style.flexDirection = "row"
            splitLine.style.height = "100%"
            splitLine.style.width = "2px"
            splitLine.style.cursor = "col-resize"
            splitLine.style.padding = "0 5px"
        } else if(binding.value === "vertical") {
            el.style.flexDirection = "column"
            splitLine.style.width = "100%"
            splitLine.style.height = "2px"
            splitLine.style.cursor = "row-resize"
            splitLine.style.padding = "5px 0"
        }
        el.appendChild(splitLine)
    }
}

export default split