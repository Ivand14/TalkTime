"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Button from './Button'
import ForgotPass from './ForgotPass'
import Inputs from '@/components/Input'
import Link from 'next/link'
import { LockIcon } from '@/components/LockIcon'
import { MailIcon } from '@/components/MailIcon'
import { auth } from '@/lib/firebase'
import { credentials } from '@/lib/definitions'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { userData } from '@/redux/actions'

const LoginForm = () => {

    const [credentials, setCredentials] = useState<credentials>({
        email: '',
        password: ''
    })
    const [errPass, setErrPass] = useState<string>('')
    const [errEmail, setErrEmail] = useState<string>('')
    const router = useRouter()
    const dispatch = useDispatch()

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
        setErrPass('')
        setErrEmail('')
        try {
            const getUser = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            dispatch(userData({ email: getUser.user.email, uid: getUser.user.uid }))

            if (getUser.operationType === 'signIn') router.push('/Home')
            
            setCredentials({
                email: '',
                password: ''
            })


        } catch (error: any) {
            console.log(error)
            const errorCode = error.code
            switch (error.code) {
                case 'auth/invalid-email':
                    return setErrEmail('Email Invalido')

                case 'auth/invalid-credential':
                    return setErrPass('Revisa tu email o contraseña')

                case 'auth/missing-password':
                    return setErrPass('Ingresa una contraseña')
                default: break
            }
        }
    }



    return (
        <div className='flex-col items-center justify-center'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form className=' bg-slate-800 rounded-xl  w-auto flex flex-col items-center justify-center p-10 gap-10 border-white border-2' onSubmit={getUser}>
                <Inputs label='Email' name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Inputs label='Password' name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Button type='submit'>Iniciar Sesion</Button>
                {errEmail && <h2 className='text-red-900'>{errEmail}</h2>}
                {errPass && <h2 className='text-red-900'>{errPass}</h2>}
                <h3 className='p-3 mr-5'>Olvidaste tu contraseña? <span><ForgotPass /></span></h3>
            </form>
            <h3 className='p-3'>No tenes cuenta? <Link className='text-cyan-600 underline' href={'/Register'} >Registrate</Link></h3>
        </div>
    )
}

export default LoginForm;
