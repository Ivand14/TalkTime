"use client"

import { Avatar, Button } from "@nextui-org/react";
import { RootActualyEmail, RootActualyId, RootActualyName, RootActualyPhoto } from "@/lib/definitions";
import { auth, db } from "@/lib/firebase"
import { chatId, resetState } from "@/redux/actions";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"

import { FaSearch } from "react-icons/fa";
import Inputs from "./Input"
import { MdOutlineInput } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react"

const SearchContact = () => {

    const [userEmail, setUserEmail] = useState<string>('')
    const [user, setUser] = useState<any>(null)

    const actualyId = useSelector((state: RootActualyId) => state.actualyUid)
    const actualyEmail = useSelector((state: RootActualyEmail) => state.actualyUser)
    const actualyPhoto = useSelector((state: RootActualyPhoto) => state.actualyPhoto)
    const actualyName = useSelector((state: RootActualyName) => state.actualyName)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleSearch = async () => {
        //* Hago una query al firebase para que me busque al usuario que ingreso
        const q = query(
            collection(db, "users"),
            where("email", "==", userEmail)
        )

        try {
            //* Agarro los documentos de ese usuario y los guardo en user
            const qSnapshot = await getDocs(q)
            qSnapshot.forEach((doc) => (
                setUser(doc.data())
            ))
        } catch (error) {
            console.log(error)
        }

    }

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.code === 'Enter' && handleSearch()
    }

    const handleSelect = async () => {

        const combinedId = actualyId > user.uid ? actualyId + user.uid : user.uid + actualyId
        dispatch(chatId({ chatId: combinedId }))

        try {
            const docs = await getDoc(doc(db, "chats", combinedId))

            if (!docs.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messagess: [] })
                await updateDoc(doc(db, "userChats", actualyId), {
                    [combinedId + ".userData"]: {
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userData"]: {
                        uid: actualyId,
                        email: actualyEmail,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
            }

        } catch (error) {
            console.log(error)
        }

        setUserEmail('')
        setUser(null)

    }


    const onSingout = () => {
        signOut(auth).then(() => {
            router.push('/')
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="flex-col items-center">
            <div className="flex items-center gap-5 m-3 justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar src={actualyPhoto} size="lg" />
                    {actualyName ? <h2 className='capitalize'>{actualyName}</h2> : <h2>{actualyEmail}</h2>}
                </div>
                <div>
                    <Button className="md:h-10 md:w-7" color="danger" variant="shadow" onClick={onSingout}>
                        <MdOutlineInput size={30} />
                    </Button>
                </div>
            </div>
            <div>
                <Inputs name="search" type="text" placeholder="Agregar contacto" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} onKeyDown={keyDown} className='lg:w-full rounded-mt-none rounded-bl-none md:w-full' endContent={<FaSearch onClick={handleSearch} />} />
            </div>
            {user && (
                <div className="bg-gray-400 p-2 rounded-bl-sm rounded-br-sm cursor-pointer mx-4" onClick={handleSelect}>
                    <div>
                        <span className="p-4">{user.email ? user.email : "Usuario no encontrado"}</span>
                    </div>
                </div>
            )}
        </div>
    )
}


export default SearchContact