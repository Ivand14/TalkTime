"use client"

import { ChangeEvent, useState } from "react"
import { RootActualyEmail, RootActualyId, RootChatId, RootUser, isMobile } from '@/lib/definitions'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"

import { BsBoxArrowInLeft } from "react-icons/bs";
import Image from "next/image"
import Inputs from "./Input"
import { MdEmail } from 'react-icons/md'
import { MdSend } from 'react-icons/md'
import Messages from "./Messages"
import {chatBoxView} from '@/redux/actions'
import { db } from "@/lib/firebase"
import { v4 } from 'uuid'

const ChatBox = () => {

    const [sendMessage, setSendMessage] = useState<string>('')
    const emailContact = useSelector((state: RootUser) => state.user)
    const chatID = useSelector((state: RootChatId) => state.chatId)
    const actualyUser = useSelector((state: RootActualyEmail) => state.actualyUser)
    const actualyId = useSelector((state: RootActualyId) => state.actualyUid)
    const user = useSelector((state: any) => state.user)
    const isMobile = useSelector((state: isMobile) => state.chatBox)
    const dispatch = useDispatch()

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
                    date: Timestamp.now(),
                })
            })


            await updateDoc(doc(db, "userChats", actualyId), {
                [chatID + ".lastMessage"]: { sendMessage },
                [chatID + ".lastSender"]: { actualyUser },
                [chatID + ".date"]: serverTimestamp()
            })

            await updateDoc(doc(db, "userChats", user.uid), {
                [chatID + ".lastMessage"]: { sendMessage },
                [chatID + ".lastSender"]: { actualyUser },
                [chatID + ".date"]: serverTimestamp()
            })


            setSendMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    const contactsBack = () => { 
        dispatch(chatBoxView({isView:false}))
    }



    return (
        <div id={isMobile ? 'chatMobile' : 'chat'} className="flex-col lg:h-[35rem] md:w-[55%]   bg-slate-800 w-[50%] p-2 rounded-xl justify-beetwen md:h-[30rem]">
            {isMobile && <BsBoxArrowInLeft size={30} className="m-2" onClick={contactsBack} />}
            {emailContact.email &&
                <section className='flex justify-center items-center w-auto rounded-xl p-3 mb-5  bg-slate-300 gap-1 text-black'>
                    <MdEmail />
                    <h2>Destinatario:</h2>
                    <h3>{emailContact.email}</h3>
                </section>
            }
            {
                emailContact.email ?
                    <>
                        <div className='flex-col  h-[70%] bg-slate-300 w-full rounded-xl mb-2 overflow-y-scroll'>
                            <Messages />
                        </div>

                        <div className=' w-full'>
                            <Inputs name="chat" type="text" placeholder="Escribe un mensaje" value={sendMessage} className="w-full break-all lg:w-full md:w-full" endContent={<button onClick={onSendMessages} ><MdSend /></button>} onChange={(event) => onHandleChange(event)} />
                        </div>
                    </>
                    :
                    <div className='flex flex-col justify-center items-center'>
                        <Image
                            src="/noChats.png"
                            alt="noChats"
                            width={460}
                            height={460}
                        />
                        <h2 className='font-bold italic text-xl'>Selecciona un contacto para comenzar a chatear</h2>
                    </div>
            }
        </div>
    )
}

export default ChatBox