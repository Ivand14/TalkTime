import { doc, onSnapshot } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"

import { AllMessages } from '@/redux/actions'
import { db } from "@/lib/firebase"
import { useEffect } from "react"

interface RootState {
    chatId: string
}

interface actualyUser {
    actualyUser: string
}

interface messagesProps {
    messagesSaved: {
        id: string,
        sender: string,
        senderId: string,
        text: string
    }[]
}


const Messages = () => {
    const chatId = useSelector((state: RootState) => state.chatId)
    const actualyUser = useSelector((state: actualyUser) => state.actualyUser)
    const messageSaved = useSelector((state: messagesProps) => state.messagesSaved)
    const dispatch = useDispatch()
    console.log(messageSaved)

    useEffect(() => {

        if (chatId) {
            const unSubscription = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && dispatch(AllMessages({ message: doc?.data()?.messages }))
            })


            return () => unSubscription()
        }

    }, [chatId,dispatch])



    return (
        <div>
            {messageSaved && messageSaved?.map((mess: { id: string, senderId: string, sender: string, text: string }, index:number) => (
                <div className='flex-col' key={index}>
                    {
                        mess.sender === actualyUser ?
                            <div className='bg-teal-600 m-3 h-auto rounded-lg rounded-tr-none w-[15rem] flex items-end flex-wrap ml-auto text-start overflow-hidden align-items: flex-end;'>
                                <h3 className='max-w-[15rem] p-4 h-auto break-all'>{mess.text}</h3>
                            </div>
                            :
                            <div className='bg-gray-500 m-3 rounded-lg rounded-tl-none w-[15rem] flex items-end flex-wrap mr-auto text-left'>
                                <h3 className='max-w-[15rem] p-4 h-auto break-all'>{mess.text}</h3>
                            </div>
                    }
                </div>
            ))}

        </div>

    )
}

export default Messages