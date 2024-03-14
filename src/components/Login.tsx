"use client"
import { Button, Card, CardBody, Spinner, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { credentialsLogin, credentialsSingup } from '@/lib/definitions'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { resetState, userData } from '@/redux/actions'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { Image } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
    const [selected, setSelected] = React.useState<string | number>("login");
    const [credentialsSingup, setCredentialsSingup] = useState<credentialsSingup>({
        email: '',
        password: '',
        name: '',
        photoURL: ''
    })
    const [credentialsLogin, setCredentialsLogin] = useState<credentialsLogin>({
        email: '',
        password: '',
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const [loadingPhoto, setLoadingPhoto] = useState(false)

    const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setCredentialsLogin({
            ...credentialsLogin,
            [name]: value
        })
    }

    const onChangeSingup = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setCredentialsSingup({
            ...credentialsSingup,
            [name]: value
        })
    }

    const getUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        try {
            const getUser = await signInWithEmailAndPassword(auth, credentialsLogin.email, credentialsLogin.password)

            dispatch(userData({ email: getUser.user.email, uid: getUser.user.uid, photoUrl: getUser.user.photoURL, displayName: getUser.user.displayName }))

            setIsLoading(true)

            if (getUser.operationType === 'signIn') router.push('/Home')

            setCredentialsLogin({
                email: '',
                password: ''
            })


        } catch (error: any) {
            console.log(error)

            switch (error.code) {
                case 'auth/invalid-email':
                    return toast.error('Email Invalido', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });

                case 'auth/invalid-credential':
                    return toast.error('Revisa tu email o contraseña', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });

                case 'auth/missing-password':
                    return toast.error('Ingresa una contraseña', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });
                case 'auth/wrong-password':
                    return toast.error('Contraseña Incorrecta', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });
                default: break
            }
        }
    }

    useEffect(() => {
        if (window.location.pathname === "/") {
            typeof window !== 'undefined' && localStorage.clear()
            dispatch(resetState());
        }
    }, [])

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingPhoto(true)
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

        setCredentialsSingup({ ...credentialsSingup, photoURL: data.secure_url })

        setTimeout(() => {
            setLoadingPhoto(false)
        }, 300)

    }

    const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        setIsLoading(true)

        try {
            const NewUser = await createUserWithEmailAndPassword(auth, credentialsSingup?.email, credentialsSingup?.password)


            updateProfile(NewUser.user, {
                displayName: credentialsSingup.name,
                photoURL: credentialsSingup.photoURL
            })

            await setDoc(doc(db, "users", NewUser.user.uid), {
                email: NewUser.user.email,
                uid: NewUser.user.uid,
                displayName: credentialsSingup.name,
                photoURL: credentialsSingup.photoURL
            })

            await setDoc(doc(db, "userChats", NewUser.user.uid), {});
            if (NewUser.operationType === 'signIn') {
                setIsLoading(false)
                return toast.success(`${credentialsSingup.name} Bienvenido a TalkTime`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Zoom,
                });
            }

            setCredentialsSingup({
                email: '',
                name: '',
                password: '',
                photoURL: ''
            })

        } catch (error: any) {
            setIsLoading(false)
            console.log({ error: error.code })
            switch (error.code) {
                case 'auth/invalid-email':
                    return toast.error('Email Invalido', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });

                case 'auth/missing-password':
                    return toast.error('Ingresa una contraseña', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });

                case 'auth/weak-password':
                    return toast.error('La contraseña debe tener mas de 6 caracteres', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });

                case "auth/email-already-in-use":
                    return toast.error('Email en uso', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                    });
                default: break
            }
        }
    }

    console.log(credentialsSingup)
    console.log(credentialsLogin)

    return (
        <div className="flex  w-full justify-center items-center">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Zoom}
            />
            <Card id='ImageDesktop' className='bg-[#18181d] rounded-l-2xl rounded-r-none z-10' shadow="sm">
                <Image
                    src='/MessagingLogin.png'
                    alt='Image Login'
                    width={425}
                    height={425}
                    isBlurred
                />
            </Card>

            <Card id='LoginMobile' className=" bg-[#18181d] dark max-w-full w-[340px] h-[425px] border-none rounded-l-none" isBlurred >
                <CardBody className="overflow-hidden dark">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        color='default'
                        variant="bordered"
                    >
                        <Tab key="login" title="Login">
                            <form onSubmit={getUser} className="flex flex-col gap-4">
                                <Input isRequired label="Email" placeholder="Ingresa tu email" type="email" name='email' onChange={onChangeLogin} value={credentialsLogin.email} variant="bordered" />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Ingresa tu contraseña"
                                    type="password"
                                    name="password"
                                    value={credentialsLogin?.password}
                                    onChange={onChangeLogin}
                                    variant="bordered"
                                />
                                <p className="text-center text-small text-white">
                                    No tenes cuenta?{" "}
                                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button isLoading={isLoading} isDisabled={!credentialsLogin.email || !credentialsLogin.password} type="submit" fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form onSubmit={createUser} className="flex flex-col gap-4 h-[300px]">
                                <Input isRequired label="Name" placeholder="Ingresa tu nombre" type="text" name="name" value={credentialsSingup.name} onChange={onChangeSingup} variant="bordered" />
                                <Input isRequired label="Email" placeholder="Ingresa tu email" type="email" name="email" value={credentialsSingup.email} onChange={
                                    onChangeSingup
                                } variant="bordered" />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Ingresa tu contraseña"
                                    type="password"
                                    name='password'
                                    value={credentialsSingup.password}
                                    onChange={onChangeSingup}
                                    variant="bordered"
                                />
                                <label htmlFor="inputFile">
                                    {credentialsSingup.photoURL === '' ? loadingPhoto ?
                                        <div className='flex items-center gap-2'>
                                            <Spinner />
                                            <h4>Cargando Foto</h4>
                                        </div>
                                        :
                                        <div className='flex gap-3 items-center'>
                                            <MdAddPhotoAlternate size={40} color='black' className='bg-slate-100 p-2 rounded-md cursor-pointer' />
                                            <h4>Añadir foto de perfil</h4>
                                        </div>
                                        :
                                        <div className='flex gap-3 items-center'>
                                            <FaCheck size={40} color='black' className='bg-slate-100 p-2 rounded-md' />
                                            <h4>Foto de perfil lista</h4>
                                        </div>
                                    }
                                    <input
                                        type="file"
                                        id="inputFile"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleUpload}
                                    />
                                </label>
                                <p className="text-center text-small">
                                    Ya tenes una cuenta?{" "}
                                    <Link size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button isLoading={isLoading} type="submit" isDisabled={!credentialsSingup.email || !credentialsSingup.name || !credentialsSingup.password || !credentialsSingup.photoURL} fullWidth color="primary">
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}
