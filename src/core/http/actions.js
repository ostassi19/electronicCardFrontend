const showLoader = () => {
    return {
        type: "SHOW_LOADER",
        playload: true
    }
}

const hideLoader = () => {
    return {
        type: "HIDE_LOADER",
        playload: false
    }
}

export {showLoader, hideLoader};
