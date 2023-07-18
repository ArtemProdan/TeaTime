import { auth } from './auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

export type InitialStateType = {
    initialized: boolean
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }

        default: return state
    }
}

const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(auth())
    // dispatch(somethingElse())
    Promise.all([promise])
        .then(() => { 
            dispatch(initializedSuccess()) 
        })
}

export default appReducer