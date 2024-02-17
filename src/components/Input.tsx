import { Input } from "@nextui-org/react";
import { InputProps } from '@/lib/definitions'
import React from 'react'

const Inputs = ({ name, type, placeholder, value, onChange, className, label, endContent,onKeyDown }: InputProps) => {
    return (
        <div>
            <Input
                
                endContent={
                    endContent
                }
                label={label}
                placeholder={placeholder}
                variant="bordered"
                className={`w-96 text-white ${className}`}
                value={value}
                name={name}
                type={type}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default Inputs