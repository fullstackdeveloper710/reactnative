const initialState = {
    loginData: {}
}
const loginDetail = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGDETAIL': {
            return { ...state, loginData: action.payload }
        }
    }
}

export default loginDetail;