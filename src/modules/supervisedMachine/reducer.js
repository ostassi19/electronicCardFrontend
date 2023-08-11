const initialState = {
    supervisedMachines: []
}
const supervisedMachinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SUPERVISED_MACHINE": {
            return {
                ...state,
                supervisedMachines: [...action.playload]
            }
        }
        case "UPDATE_SUPERVISED_MACHINE": {
            return {
                ...state,
                supervisedMachines: state.supervisedMachines.map(supervisedMachine => {
                    if (supervisedMachine.id === action.playload.id) {
                        return action.playload;
                    } else {
                        return supervisedMachine;
                    }
                })
            }
        }
        case "ADD_SUPERVISED_MACHINE": {
            return {
                ...state,
                supervisedMachines: [...state.supervisedMachines, action.playload]
            }
        }


        default :
            return state;
    }
}

export default supervisedMachinesReducer;
