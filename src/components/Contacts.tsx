"use client"

import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { chatId, userChat } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { Avatar } from "@nextui-org/react";
import { db } from '@/lib/firebase'

interface RootState {
    actualyUid: string,
}

interface userProp { 
    user:{
        email:string,
        uid:string
    }
}

const Contacts = () => {

    const actualyId = useSelector((state: RootState) => state.actualyUid)
    const [chats, setChats] = useState<DocumentData>([])
    const dispatch = useDispatch()



    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "userChats", actualyId), (doc) => {
            const data = doc.data();
            if (data) {
                setChats(data);
            }
        })

        return () => {
            actualyId && unsubscribe()
        }
    }, [actualyId])


    const handleSelect = (user: userProp) => {
        dispatch(userChat({ user }))
    }

    const handleUidSelect = (uid: string) => {
        console.log(uid)
        dispatch(chatId({ chatId: uid }))
    }




    return (
        <div className="flex-col  bg-slate-800   rounded-xl justify-beetwen overflow-y-scroll mt-3">
            <section className='flex-col'>
                {Object.entries(chats).map((chat) => (
                    <div  key={chat[0]} onClick={() => handleSelect(chat[1].userData)}>
                        <div className="flex items-center gap-5 mb-10 mt-3 cursor-pointer" onClick={() => handleUidSelect(chat[0])}>
                            <Avatar name={chat[1]?.userData?.email?.slice(0, 2).toUpperCase()} />
                            <h2>{chat[1].userData.email}</h2>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Contacts