const setWorkPlanifications = (workPlanifications) => {
    return {
        type: "SET_WORK_PLANIFICATION",
        playload: workPlanifications
    }
}

const updateWorkPlanification = (workPlanification) => {
    return {
        type: "UPDATE_WORK_PLANIFICATION",
        playload: workPlanification
    }
}
const addWorkPlanification = (workPlanification) => {
    return {
        type: "ADD_WORK_PLANIFICATION",
        playload: workPlanification
    }
}



export {setWorkPlanifications,updateWorkPlanification,addWorkPlanification};
