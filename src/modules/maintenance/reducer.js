const initialState = {
    maintenances: []
}
const maintenancesReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_MAINTENANCE": {
            return {
                ...state,
                maintenances: [...action.playload]
            }
        }
        case "UPDATE_MAINTENANCE": {
            return {
                ...state,
                maintenances: state.maintenances.map(maintenance => {
                    if (maintenance.id === action.playload.id) {
                        return action.playload;
                    } else {
                        return maintenance;
                    }
                })
            }
        }
        case "ADD_MAINTENANCE": {
            return {
                ...state,
                maintenances: [...state.maintenances, action.playload]
            }
        }


        default :
            return state;
    }
}

export default maintenancesReducer;
