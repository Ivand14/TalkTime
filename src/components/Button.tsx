import { ButtonProps } from '@/lib/definitions'
import React from 'react'

const Input = ({ type, children }: ButtonProps) => {
    return (
        <div>
            <button className='bg-teal-700 p-3 rounded-md w-96 min-[320px]:w-[15rem]' type={type}>{children}</button>
        </div>
    )
}

export default Input