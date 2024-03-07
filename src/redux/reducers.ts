import { ALL_MESSAGES, CHATS, CHATS_ID, USER_DATA, CHATBOX_VIEW } from "./actions";

import { Actions } from "@/lib/definitions";

const initialState = {
    actualyUser: typeof window !== 'undefined' && localStorage.getItem('actualyUser') || '',
    actualyUid: typeof window !== 'undefined' && localStorage.getItem('actualyUid') || '',
    actualyName: typeof window !== 'undefined' && localStorage.getItem('actualyName') || '',
    actualyPhoto: typeof window !== 'undefined' && localStorage.getItem('actualyPhoto') || '',
    message: [],
    chatId: '',
    user: {},
    messagesSaved: [],
    chatBox: false
}

const rootReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case USER_DATA:
            if (typeof window !== 'undefined') {
                localStorage.setItem('actualyUser', action.payload.email);
                localStorage.setItem('actualyUid', action.payload.uid);
                localStorage.setItem('actualyPhoto', action.payload.photoUrl);
                localStorage.setItem('actualyName', action.payload.displayName);
            }
            return {
                ...state,
                actualyUser: action.payload.email,
                actualyUid: action.payload.uid,
                actualyName: action.payload.displayName,
                actualyPhoto: action.payload.photoUrl
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
        case CHATBOX_VIEW:
            return {
                ...state,
                chatBox: action.payload
            }
        default:
            return state;
    }
}


export default rootReducer;
