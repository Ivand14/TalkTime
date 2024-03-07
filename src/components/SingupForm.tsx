"use client"

import React, { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import ButtonLoading from '@/components/ButtonLoading'
import ButtonR from './ButtonR'
import { FaCheck } from "react-icons/fa";
import Input from './Input'
import { LockIcon } from '@/components/LockIcon'
import { MailIcon } from '@/components/MailIcon'
import { MdContacts } from "react-icons/md";
import { Progress } from "@nextui-org/react";
import { credentials } from '@/lib/definitions'
import { useRouter } from 'next/navigation'

const SingupForm = () => {

    const [credentials, setCredentials] = useState<credentials>({
        email: '',
        password: '',
        name: '',
        photoURL: ''
    })
    const [errPass, setErrPass] = useState<string>('')
    const [errEmail, setErrEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)


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
        setIsLoading(true)

        try {
            const NewUser = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)

            
            updateProfile(NewUser.user, {
                displayName: credentials.name,
                photoURL: credentials.photoURL
            })

            await setDoc(doc(db, "users", NewUser.user.uid), {
                email: NewUser.user.email,
                uid: NewUser.user.uid,
                displayName: credentials.name,
                photoURL: credentials.photoURL
            })

            await setDoc(doc(db, "userChats", NewUser.user.uid), {});
            if (NewUser.operationType === 'signIn') router.push('/')

        } catch (error: any) {
            setIsLoading(false)
            console.log({ error: error.code })
            switch (error.code) {
                case 'auth/invalid-email':
                    return setErrEmail('Email Invalido')

                case 'auth/missing-password':
                    return setErrPass('Ingresa una contraseña')

                case 'auth/weak-password':
                    return setErrPass('La contraseña debe tener mas de 6 caracteres')

                case "auth/email-already-in-use":
                    return setErrEmail('Email Existente')
                default: break
            }
        }
    }

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        const file = event.target.files && event.target.files[0]
        const formData = new FormData()

        if (file !== null) {
            formData.append("file", file)
            formData.append("upload_preset", "chatApp")
        }

        const response = await fetch('https://api.cloudinary.com/v1_1/dpygvdozn/image/upload',
            {
                method: 'POST',
                body: formData
            }
        )

        const data = await response.json()

        setCredentials({ ...credentials, photoURL: data.secure_url })

        setTimeout(() => {
            setIsUploading(false)
        }, 300)

    }




    return (
        <div className='flex flex-col items-center'>
            <form className=' bg-slate-800 rounded-xl  w-auto flex flex-col items-center justify-center p-10 gap-10 border-white border-2' onSubmit={createUser}>
                <Input label='Nombre' name='name' type='text' placeholder='Ingresa tu nombre' value={credentials.name} onChange={onChange} endContent={<MdContacts className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />

                <Input label='Email' name='email' type='email' placeholder='Ingresa tu email' value={credentials.email} onChange={onChange} endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />

                <Input label='Contraseña' name='password' type='password' placeholder='Ingresa tu contraseña' value={credentials.password} onChange={onChange} endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />

                <div className='flex flex-col gap-2 '>
                    <label>Foto de perfil</label>
                    {credentials.photoURL === '' ?
                        <input type='file' onChange={handleUpload} className='w-[15rem] rounded-lg' />
                        :
                        <div className='flex items-center gap-2 w-[15rem]'>
                            <FaCheck />
                            <h3 className='text-lime-700'>Foto de perfil lista</h3>
                        </div>}
                    {isUploading && <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />}
                </div>


                {!isLoading ? <ButtonR type='submit'>Registrarse</ButtonR> : <ButtonLoading />}
                {errEmail && <h2 className='text-red-900'>{errEmail}</h2>}
                {errPass && <h2 className='text-red-900'>{errPass}</h2>}
            </form>
        </div>
    )

}

export default SingupForm;