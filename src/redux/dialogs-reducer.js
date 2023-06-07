const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    Messages: [
        { id: 1, message: 'Hi', sender: 'my' },
        { id: 2, message: 'It\'s Joseph' },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Let\'s hang out' },
        { id: 5, message: 'Skyler Asser' },
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            // alert(action.newMessageBody)
            let body = action.newMessageBody
            return { ...state, Messages: [...state.Messages, { id: 6, message: body }] }
            default: return state
    }
}

export const sendMessage = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer