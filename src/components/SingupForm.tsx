"use client"

import React, { ChangeEvent, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

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
        }
    }

    return (
        <div className='flex-col items-center justify-center'>
            <form className='bg-slate-800 rounded-xl h-96 w-auto flex flex-col items-center justify-center p-10 gap-10 border-white border-2 m-2' onSubmit={createUser}>
                <Input label='Email' name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Input label='Password' name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                <Button type='submit'>Registrarse</Button>
            </form>
        </div>
    )
}

export default SingupForm;