import { messagesProps, userDataProps } from "@/lib/definitions"

export const USER_DATA: string = 'USER_DATA'
export const RECIVE_MESSAGE: string = 'RECIVE_MESSAGE'
export const SEND_MESSAGE: string = 'SEND_MESSAGE'
export const CHATS: string = "CHATS"
export const CHATS_ID: string = "CHATS_ID"
export const ALL_MESSAGES: string = "ALL_MESSAGES"
export const RESET_STATE: string = 'RESET_STATE'
export const CHATBOX_VIEW: string = 'CHATBOX_VIEW'

export const userData = ({ email, uid, photoUrl, displayName }: userDataProps) => {
    return {
        type: USER_DATA,
        payload: {
            email,
            uid,
            photoUrl,
            displayName
        }
    }
}


export const AllMessages = ({ message }: { message: messagesProps[] }) => {
    return {
        type: ALL_MESSAGES,
        payload: message
    }
}


export const chatId = ({ chatId }: { chatId: string }) => {
    return {
        type: CHATS_ID,
        payload: chatId
    }
}

export const userChat = ({ user }: { user: any }) => {
    return {
        type: CHATS,
        payload: user
    }
}


export const chatBoxView = ({ isView }: { isView: boolean }) => {

    return {
        type: CHATBOX_VIEW,
        payload: isView
    }
}

export const resetState = () => ({
    type: 'RESET_STATE'
});
