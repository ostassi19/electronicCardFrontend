const setSupervisedMachines = (supervisedMachines) => {
    return {
        type: "SET_SUPERVISED_MACHINE",
        playload: supervisedMachines
    }
}

const updateSupervisedMachine = (supervisedMachine) => {
    return {
        type: "UPDATE_SUPERVISED_MACHINE",
        playload: supervisedMachine
    }
}
const addSupervisedMachine = (supervisedMachine) => {
    return {
        type: "ADD_SUPERVISED_MACHINE",
        playload: supervisedMachine
    }
}



export {setSupervisedMachines,updateSupervisedMachine,addSupervisedMachine};
