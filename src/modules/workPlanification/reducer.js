const initialState = {
    workPlanifications: []
}
const workPlanificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_WORK_PLANIFICATION": {
            return {
                ...state,
                workPlanifications: [...action.playload]
            }
        }
        case "UPDATE_WORK_PLANIFICATION": {
            return {
                ...state,
                workPlanifications: state.workPlanifications.map(workPlanification => {
                    if (workPlanification.id === action.playload.id) {
                        return action.playload;
                    } else {
                        return workPlanification;
                    }
                })
            }
        }
        case "ADD_WORK_PLANIFICATION": {
            return {
                ...state,
                workPlanifications: [...state.workPlanifications, action.playload]
            }
        }


        default :
            return state;
    }
}

export default workPlanificationsReducer;
