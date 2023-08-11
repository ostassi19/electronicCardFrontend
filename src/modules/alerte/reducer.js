const initialState = {
    alertes: []
}
const alertesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALERTE": {
            return {
                ...state,
                alertes: [...action.playload]
            }
        }
        case "UPDATE_ALERTE": {
            return {
                ...state,
                alertes: state.alertes.map(alerte => {
                    if (alerte.id === action.playload.id) {
                        return action.playload;
                    } else {
                        return alerte;
                    }
                })
            }
        }
        case "ADD_ALERTE": {
            return {
                ...state,
                alertes: [...state.alertes, action.playload]
            }
        }


        default :
            return state;
    }
}

export default alertesReducer;
