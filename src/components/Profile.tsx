"use client"

import 'react-toastify/dist/ReactToastify.css';

import { Avatar, Spinner } from "@nextui-org/react";
import { RootActualyEmail, RootActualyId, RootActualyName, RootActualyPhoto, credentialsUpdate } from '@/lib/definitions'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { updateEmail, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"

import { BsBoxArrowInLeft } from "react-icons/bs";
import ButtonLoading from '@/components/ButtonLoading'
import ButtonR from './ButtonR'
import { FaCheck } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import ReAuth from '@/components/ReAuth'
import { RiPencilFill } from "react-icons/ri";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { userData } from '@/redux/actions';

const Profile = () => {

    const actualyPhoto = useSelector((state: RootActualyPhoto) => state.actualyPhoto)
    const [newData, setNewData] = useState<credentialsUpdate>({
        email: '',
        photoURL: '',
        name: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false)
    const dispatch = useDispatch()
    const actualyUser = useSelector((state: RootActualyEmail) => state.actualyUser)
    const actualyName = useSelector((state: RootActualyName) => state.actualyName)
    const actualyUid = useSelector((state: RootActualyId) => state.actualyUid)
    const router = useRouter()



    const handleUpdatePhoto = async (event: any) => {
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

        console.log(data)

        setNewData({ ...newData, photoURL: data.secure_url })
    }

    const handleUpdateUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const property = event.target.name

        setNewData({
            ...newData,
            [property]: value
        }
        )
    }


    const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        setIsLoading(true)

        if (auth.currentUser) {

            newData.photoURL && updateProfile(auth.currentUser, {
                photoURL: newData.photoURL
            }).then(() => {
                setLoadingPhoto(true)
                toast.success('Foto actualizada', {
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
                dispatch(userData({ email: actualyUser, uid: actualyUid, photoUrl: newData.photoURL, displayName: actualyName }))
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
                toast.error('Ocurrio un error, vuelve a intentarlo', {
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
            })

            newData.name && updateProfile(auth.currentUser, {
                displayName: newData.name
            }).then(() => {
                toast.success('Nombre Actualizado', {
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
                dispatch(userData({ email: actualyUser, uid: actualyUid, photoUrl: actualyPhoto, displayName: newData.name }))
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
                toast.error(error, {
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
            })

            newData.email && updateEmail(auth.currentUser, newData.email).then(() => {
                toast.success('Email actualizado', {
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
                dispatch(userData({ email: newData.email, uid: actualyUid, photoUrl: actualyPhoto, displayName: actualyName }))
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
                toast.error('Debes re autenticarte', {
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
            })

        }

        setNewData({
            name:'',
            email:'',
            photoURL:'',
        })

    }


    return (
        <div className="h-screen w-screen p-4 flex justify-center items-center">
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

            <form onSubmit={updateUser} className="flex flex-col h-auto bg-slate-800 w-[50%] rounded-xl justify-start items-center gap-5 p-2">
                <div className='relative flex'>
                    <BsBoxArrowInLeft size={30} className="absolute top-0 left-[-13rem] cursor-pointer" onClick={() => router.push('/Home')} />
                    <Avatar src={actualyPhoto} className="w-48 h-48 text-large m-2" />
                    <label htmlFor="inputFile" className="absolute top-0 right-0 transform translate-x-[-1rem] translate-y-[10rem] cursor-pointer">
                        {newData.photoURL === '' ? loadingPhoto ? <Spinner /> : <RiPencilFill size={40} color='black' className='bg-slate-100 p-2 rounded-md' /> : <FaCheck size={40} color='black' className='bg-slate-100 p-2 rounded-md' />}
                        <input
                            type="file"
                            id="inputFile"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleUpdatePhoto}
                        />
                    </label>
                </div>
                <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    placeholder="Nuevo email"
                    name="email"
                    className="max-w-xs flex items-center"
                    description="Si mantuviste la sesión abierta o llevas mucho tiempo logueado debes re autenticarte."
                    value={newData.email}
                    onChange={(event) => handleUpdateUser(event)}
                    endContent={<ReAuth />}
                />

                <Input
                    type="text"
                    label="Nombre"
                    variant="bordered"
                    placeholder="Nuevo nombre"
                    className="max-w-xs"
                    name="name"
                    value={newData.name}
                    onChange={handleUpdateUser}
                />
                {!isLoading ? <ButtonR type='submit'>Actualizar</ButtonR> : <ButtonLoading />}
            </form>
        </div>
    )
}

export default Profile