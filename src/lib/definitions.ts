import { ButtonHTMLAttributes, ChangeEvent, KeyboardEventHandler, ReactNode } from "react"

export interface Actions {
    type: string,
    payload?: any
}

export interface InputProps {
    name: string,
    type: string,
    placeholder: string,
    value: string,
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

export interface credentials {
    email: string,
    password: string
}

export interface userDataProps {
    email: string | null,
    uid: string
}

export interface messagesProps { 
    id:string,
    sender:string,
    senderId:string,
    text:string
}