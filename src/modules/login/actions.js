const fail = () => {
    return {
        type: "ERROR",
        playload: true
    }
}

const succes = () => {
    return {
        type: "SUCCES",
        playload: ""
    }
}
const deconnexion = () => {
    return {
        type: "DECONNEXION",
        playload: "",
    }
}

export {fail, succes, deconnexion};
