import { ButtonHTMLAttributes, ChangeEvent, ReactNode } from "react"

export interface Actions {
    type: string,
    payload?: any
}

export interface InputProps {
    name:string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?:string
    label?:string,
    endContent?:ReactNode
}

export interface ButtonProps {
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children:React.ReactNode
}

export interface credentials {
    email:string,
    password:string
}
