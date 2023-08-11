const initialState = {
    showLoader: false
}
const httpClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_LOADER": {
            return {
                ...state,
                showLoader: [...action.playload]
            }
        }
        case "HIDE_LOADER": {
            return {
                ...state,
                showLoader: [...action.playload]
            }
        }
        default :
            return state;
    }
}

export default httpClientReducer;
