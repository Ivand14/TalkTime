"use client"

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"

import { Avatar } from "@nextui-org/react";
import Inputs from "./Input"
import { chatId } from "@/redux/actions";
import { db } from "@/lib/firebase"
import { useState } from "react"

interface RootState {
    actualyUid: string,
}

interface RootEmail {
    actualyUser: string
}

const SearchContact = () => {

    const [userEmail, setUserEmail] = useState<string>('')
    const [user, setUser] = useState<any>(null)

    const actualyId = useSelector((state: RootState) => state.actualyUid)
    const actualyEmail = useSelector((state: RootEmail) => state.actualyUser)
    const dispatch = useDispatch()

    console.log(user)

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
        dispatch(chatId({chatId:combinedId}))

        try {
            const docs = await getDoc(doc(db, "chats", combinedId))
            
            if (!docs.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messagess: [] })
                await updateDoc(doc(db, "userChats", actualyId), {
                    [combinedId + ".userData"]: {
                        uid: user.uid,
                        email: user.email
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userData"]: {
                        uid: actualyId,
                        email: actualyEmail
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




    return (
        <div className="flex-col items-center">
            <div className="flex items-center gap-5 m-3 ">
                <Avatar name={actualyEmail?.slice(0,2).toUpperCase()} />
                <h2>{actualyEmail}</h2>
            </div>
            <div>
                <Inputs name="search" type="text" placeholder="Buscar contacto" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} onKeyDown={keyDown} className='w-full rounded-mt-none rounded-bl-none' />
            </div>
            {user && (
                <div className="bg-gray-400 p-2 rounded-bl-sm rounded-br-sm cursor-pointer mx-4" onClick={handleSelect}>
                    <div>
                        <span className="p-4">{user.email}</span>
                    </div>
                </div>
            )}
        </div>
    )
}


export default SearchContact