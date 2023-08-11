const setMaintenances = (maintenances) => {
    return {
        type: "SET_MAINTENANCE",
        playload: maintenances
    }
}

const updateMaintenance = (maintenance) => {
    return {
        type: "UPDATE_MAINTENANCE",
        playload: maintenance
    }
}
const addMaintenance = (maintenance) => {
    return {
        type: "ADD_MAINTENANCE",
        playload: maintenance
    }
}



export {setMaintenances,updateMaintenance,addMaintenance};
