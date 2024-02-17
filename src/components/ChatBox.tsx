"use client"

import { ChangeEvent, useState } from "react"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"

import Inputs from "./Input"
import { MdEmail } from 'react-icons/md'
import { MdSend } from 'react-icons/md'
import Messages from "./Messages"
import { db } from "@/lib/firebase"
import { useSelector } from "react-redux"
import { v4 } from 'uuid'

interface RootEmail {
    user: {
        email: string,
        uid: string
    }
}

interface RootuId {
    chatId: string
}

interface RootActualyEmail {
    actualyUser: string,
}

interface RootActualyId {
    actualyUid: string,
}

const ChatBox = () => {

    const [sendMessage, setSendMessage] = useState<string>('')
    const emailContact = useSelector((state: RootEmail) => state.user)
    const chatID = useSelector((state: RootuId) => state.chatId)
    const actualyUser = useSelector((state: RootActualyEmail) => state.actualyUser)
    const actualyId = useSelector((state: RootActualyId) => state.actualyUid)

    console.log(chatID)

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSendMessage(event.target.value)
    }

    const onSendMessages = async () => {
        try {
            await updateDoc(doc(db, "chats", chatID), {
                messages: arrayUnion({
                    id: v4(),
                    sender: actualyUser,
                    senderId: actualyId,
                    text: sendMessage,
                })
            })
            setSendMessage('')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex-col h-[35rem]  bg-slate-800 w-[50%] p-2 rounded-xl justify-beetwen">
            {emailContact.email &&
                <section className='flex justify-center items-center w-[20rem] rounded-xl p-3 mb-5  bg-slate-300 gap-1 text-black'>
                    <MdEmail />
                    <h2>Destinatario:</h2>
                    <h3>{emailContact.email}</h3>
                </section>
            }
            <div className='flex-col  h-[70%] bg-slate-300 w-full rounded-xl mb-2 overflow-y-scroll'>
                <Messages />
            </div>

            <div className=' w-full'>
                <Inputs name="chat" type="text" placeholder="Escribe un mensaje" value={sendMessage} className="w-full break-all" endContent={<button onClick={onSendMessages} ><MdSend /></button>} onChange={(event) => onHandleChange(event)} />
            </div>
        </div>
    )
}

export default ChatBox