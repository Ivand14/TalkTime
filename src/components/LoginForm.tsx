"use client"

import React, { useState } from 'react'

import Button from './Button'
import ForgotPass from './ForgotPass'
import Inputs from '@/components/Input'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { credentials } from '@/lib/definitions'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { MailIcon } from './MailIcon'
import { LockIcon } from './LockIcon'

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
            if (getUser.operationType === 'signIn') router.push('/Home')
            setCredentials({
                email:'',
                password:''
            })
        } catch (error: any) {
            console.log({ error: error.code })
        }
    }



    return (
        <div className='flex-col items-center justify-center'>
            <form className=' bg-slate-800 rounded-xl  w-auto flex flex-col items-center justify-center p-10 gap-10 border-white border-2' onSubmit={getUser}>
                <Inputs label='Email' name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Inputs label='Password' name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Button type='submit'>Iniciar Sesion</Button>
                <h3 className='p-3 mr-5'>Olvidaste tu contraseña? <span><ForgotPass /></span></h3>
            </form>
            <h3 className='p-3'>No tenes cuenta? <Link className='text-cyan-600 underline' href={'/Register'} >Registrate</Link></h3>
        </div>
    )
}

export default LoginForm;
