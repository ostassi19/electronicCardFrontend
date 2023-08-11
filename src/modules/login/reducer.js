const initialState = {
    isLogged: localStorage.getItem('token') ? true : false,
    error: false,
}
const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ERROR": {
            return {
                ...state,
                error: action.playload
            }
        }
        case "SUCCES": {
            return {
                isLogged: true,
                error: false
            }
        }
        case "DECONNEXION": {
            return {
                isLogged: false,
            }
        }
        default :
            return state
    }
}
export default LoginReducer;
