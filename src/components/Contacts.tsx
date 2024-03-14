"use client"

import { Avatar, Divider } from "@nextui-org/react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { RootActualyId, RootUser } from "@/lib/definitions";
import { chatBoxView, chatId, userChat } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { db } from '@/lib/firebase'

const Contacts = () => {

    const actualyId = useSelector((state: RootActualyId) => state.actualyUid)
    const [chats, setChats] = useState<DocumentData>([])
    const [chatView, setChatView] = useState<boolean>(false)
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


    const handleSelect = (user: RootUser) => {
        dispatch(userChat({ user }))
    }

    const handleUidSelect = (uid: string) => {
        dispatch(chatId({ chatId: uid }))
    }

    const chatBox = () => {
        setChatView(true)
        dispatch(chatBoxView({ isView: chatView }))
    }



    return (
        <div className="flex-col  bg-[#18181d]   rounded-xl justify-beetwen  mt-3">
            <div  className='flex-col overflow-y-scroll h-[23rem]'>
                {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div key={chat[0]} onClick={() => {handleSelect(chat[1].userData),chatBox()}}>
                        <div className="flex items-center gap-5  mt-3 cursor-pointer" onClick={() => handleUidSelect(chat[0])}>
                            {chat[1]?.userData?.photoURL ? <Avatar src={chat[1]?.userData?.photoURL} size="lg" /> : <Avatar name={chat[1]?.userData?.email?.slice(0, 2).toUpperCase()} />}
                            <div className='flex-col'>
                                <h2>{chat[1]?.userData?.email}</h2>
                                {chat[1].lastMessage &&
                                    <div className='flex justify-between w-64'>
                                        <h2 className='text-slate-400'>{chat[1]?.lastMessage?.sendMessage.slice(0, 20)}</h2>
                                        <h4>{new Date(chat[1]?.date?.seconds * 1000).getHours()}:{
                                            new Date(chat[1]?.date?.seconds * 1000).getMinutes() < 10 ? <span>0{new Date(chat[1]?.date?.seconds * 1000).getMinutes()}</span> : <span>{new Date(chat[1]?.date?.seconds * 1000).getMinutes()}</span>
                                        }</h4>
                                    </div>
                                }
                            </div>
                        </div>
                        <Divider className="my-3 w-[98%] bg-white" />
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Contacts