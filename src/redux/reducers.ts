import { CHATS, CHATS_ID, RECIVE_MESSAGE, SEND_MESSAGE, USER_DATA, ALL_MESSAGES } from "./actions";

import { Actions } from "@/lib/definitions";

const initialState = {
    actualyUser: '',
    actualyUid: '',
    message: [],
    chatId: '',
    user: {},
    messages: []
}

const rootReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                actualyUser: action.payload.email,
                actualyUid: action.payload.uid
            }
        case RECIVE_MESSAGE:
            return {
                ...state,
                message: [...state.message, action.payload]
            }
        case SEND_MESSAGE:
            return {
                ...state,
                message: [...state.message, action.payload]
            }
        case CHATS_ID:
            return {
                ...state,
                chatId: action.payload,
            }
        case CHATS:
            return {
                ...state,
                user: action.payload
            }
        case ALL_MESSAGES:
            return {
                ...state,
                message:[...state.message,action.payload]
            }
        default:
            return state;
    }
}

export default rootReducer