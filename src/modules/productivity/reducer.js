const initialState = {
    productivities: []
}
const productivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCTIVITY": {
            return {
                ...state,
                productivities: [...action.playload]
            }
        }
        case "UPDATE_PRODUCTIVITY": {
            return {
                ...state,
                productivities: state.productivities.map(productivity => {
                    if (productivity.id === action.playload.id) {
                        return action.playload;
                    } else {
                        return productivity;
                    }
                })
            }
        }
        case "ADD_PRODUCTIVITY": {
            return {
                ...state,
                productivities: [...state.productivities, action.playload]
            }
        }


        default :
            return state;
    }
}

export default productivitiesReducer;
