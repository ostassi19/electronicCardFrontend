const setAlertes = (alertes) => {
    return {
        type: "SET_ALERTE",
        playload: alertes
    }
}

const updateAlerte = (alerte) => {
    return {
        type: "UPDATE_ALERTE",
        playload: alerte
    }
}
const addAlerte = (alerte) => {
    return {
        type: "ADD_ALERTE",
        playload: alerte
    }
}



export {setAlertes,updateAlerte,addAlerte};
