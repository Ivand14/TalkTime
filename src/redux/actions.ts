import { userDataProps, messagesProps } from "@/lib/definitions"

export const USER_DATA: string = 'USER_DATA'
export const RECIVE_MESSAGE: string = 'RECIVE_MESSAGE'
export const SEND_MESSAGE: string = 'SEND_MESSAGE'
export const CHATS: string = "CHATS"
export const CHATS_ID: string = "CHATS_ID"
export const ALL_MESSAGES: string = "ALL_MESSAGES"

export const userData = ({ email, uid }: userDataProps) => {
    console.log(email, uid)
    return {
        type: USER_DATA,
        payload: {
            email,
            uid
        }
    }
}



export const AllMessages = ({ message }: { message: messagesProps[] }) => {
    console.log(message)
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