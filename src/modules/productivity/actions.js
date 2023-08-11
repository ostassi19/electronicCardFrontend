const setProductivities = (productivities) => {
    return {
        type: "SET_PRODUCTIVITY",
        playload: productivities
    }
}

const updateProductivity = (productivity) => {
    return {
        type: "UPDATE_PRODUCTIVITY",
        playload: productivity
    }
}
const addProductivity = (productivity) => {
    return {
        type: "ADD_PRODUCTIVITY",
        playload: productivity
    }
}



export {setProductivities,updateProductivity,addProductivity};
