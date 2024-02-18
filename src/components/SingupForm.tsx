"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

import { Bounce } from 'react-toastify';
import Button from './Button'
import Input from './Input'
import { LockIcon } from '@/components/LockIcon'
import { MailIcon } from '@/components/MailIcon'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { credentials } from '@/lib/definitions'
import { useRouter } from 'next/navigation'

const SingupForm = () => {

    const [credentials, setCredentials] = useState<credentials>({
        email: '',
        password: ''
    })
    const [errPass, setErrPass] = useState<string>('')
    const [errEmail, setErrEmail] = useState<string>('')

    const router = useRouter();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        setErrEmail('')
        setErrPass('')

        try {
            const NewUser = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)

            await setDoc(doc(db, "users", NewUser.user.uid), {
                email: NewUser.user.email,
                uid: NewUser.user.uid
            })

            await setDoc(doc(db, "userChats", NewUser.user.uid), {});
            if (NewUser.operationType === 'signIn') router.push('/')
        } catch (error: any) {
            console.log({ error: error.code })
            switch (error.code) {
                case 'auth/invalid-email':
                    return setErrEmail('Email Invalido')


                case 'auth/missing-password':
                    return setErrPass('Ingresa una contraseña')

                case 'auth/weak-password':
                    return setErrPass('La contraseña debe tener mas de 6 caracteres')

                default: break
            }
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <form className='bg-slate-800 rounded-xl h-full w-full flex flex-col items-center p-5 gap-4border-white border-2 my-20 gap-10' onSubmit={createUser}>
                <Input label='Email' name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Input label='Password' name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Button type='submit'>Registrarse</Button>
                {errEmail && <h2 className='text-red-900'>{errEmail}</h2>}
                {errPass && <h2 className='text-red-900'>{errPass}</h2>}
            </form>
        </div>
    )

}

export default SingupForm;