import { ALL_MESSAGES, CHATS, CHATS_ID, USER_DATA } from "./actions";

import { Actions } from "@/lib/definitions";

const initialState = {
    actualyUser: typeof window !== 'undefined' && localStorage.getItem('actualyUser') || '', 
    actualyUid: typeof window !== 'undefined' && localStorage.getItem('actualyUid') || '', 
    message: [],
    chatId: '',
    user: {},
    messagesSaved: [],
}

const rootReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case USER_DATA:
            if (typeof window !== 'undefined') {
                localStorage.setItem('actualyUser', action.payload.email);
                localStorage.setItem('actualyUid', action.payload.uid);
            }
            return {
                ...state,
                actualyUser: action.payload.email,
                actualyUid: action.payload.uid
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
                messagesSaved: action.payload
            }
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}


export default rootReducer;
