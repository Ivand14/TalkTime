"use client"

import React, { useState } from 'react'

import Button from './Button'
import Input from './Input'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { credentials } from '@/lib/definitions'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const [credentials, setCredentials] = useState<credentials>({
        email: '',
        password: ''
    })

    const router = useRouter()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const getUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        try {
            const getUser = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            console.log(getUser)
            if(getUser.operationType === 'signIn') router.push('/Home')
        } catch (error: any) {
            console.log({ error: error.code })
        }
    }



    return (
        <div className='flex-col items-center justify-center'>
            <form className='bg-neutral-300 rounded-xl h-96 w-auto flex flex-col items-center justify-center p-10 gap-10 border-white border-2' onSubmit={getUser}>
                <Input name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} />
                <Input name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} />
                <Button type='submit'>Iniciar Sesion</Button>
                <h3 className='p-3'>Olvidaste tu contraseña? <Link className='text-cyan-600 underline' href={'/Register'} >Recuperar contraseña</Link></h3>
            </form>
            <h3 className='p-3'>No tenes cuenta? <Link className='text-cyan-600 underline' href={'/Register'} >Registrate</Link></h3>
        </div>
    )
}

export default LoginForm;
