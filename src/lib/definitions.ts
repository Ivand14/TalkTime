import { ButtonHTMLAttributes, ChangeEvent, KeyboardEventHandler, ReactNode } from "react"

export interface Actions {
    type: string,
    payload?: any
}

export interface InputProps {
    name?: string,
    type: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
    label?: string,
    endContent?: ReactNode,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface ButtonProps {
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: React.ReactNode
}

export interface credentialsSingup {
    email: string,
    password: string,
    name: string,
    photoURL: string
}

export interface credentialsLogin {
    email: string,
    password: string,
}

export interface credentialsUpdate { 
    email: string,
    name: string,
    photoURL: string
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface userDataProps {
    email?: string | null,
    uid?: string,
    photoUrl?: string | null,
    displayName?: string | null
}

export interface messagesProps {
    id: string,
    sender: string,
    senderId: string,
    text: string
}

export interface RootUser {
    user: {
        email?: string,
        uid?: string,
        photoUrl?: string,
        displayName?: string
    }
}

export interface RootChatId {
    chatId: string
}

export interface RootActualyEmail {
    actualyUser: string,
}

export interface RootActualyId {
    actualyUid: string,
}

export interface RootActualyPhoto {
    actualyPhoto: string,
}

export interface RootActualyName {
    actualyName: string,
}

export interface messagesProps {
    messagesSaved: {
        id: string,
        sender: string,
        senderId: string,
        text: string
    }[]
}

export interface isMobile {
    chatBox: boolean
}