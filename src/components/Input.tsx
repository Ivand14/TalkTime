import { InputProps } from '@/lib/definitions'
import React from 'react'
import { Input } from "@nextui-org/react";

const Inputs = ({ name, type, placeholder, value, onChange, className, label, endContent }: InputProps) => {
    return (
        <div>
            <Input
                
                endContent={
                    endContent
                }
                label={label}
                placeholder={placeholder}
                variant="bordered"
                className=" w-96 text-white"
                value={value}
                name={name}
                type={type}
                onChange={onChange}
            />
        </div>
    )
}

export default Inputs