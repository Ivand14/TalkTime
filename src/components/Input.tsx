import { InputProps } from '@/lib/definitions'
import React from 'react'

const Input = ({ name, type, placeholder, value, onChange, className }: InputProps) => {
    return (
        <div>
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className='rounded-md p-3 w-96 text-center text-black' />
        </div>
    )
}

export default Input