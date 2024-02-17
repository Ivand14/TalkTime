import { DocumentData, doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"


import { db } from "@/lib/firebase"
import { useSelector,useDispatch } from "react-redux"
import{AllMessages} from '@/redux/actions'

interface RootState {
    chatId: string
}

interface actualyUser {
    actualyUser: string
}


const Messages = () => {

    const [messages, setMessages] = useState<DocumentData>([])
    const chatId = useSelector((state: RootState) => state.chatId)
    const actualyUser = useSelector((state: actualyUser) => state.actualyUser)
    const dispatch = useDispatch()


    useEffect(() => {

        if (chatId) {
            const unSubscription = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages)
                dispatch(AllMessages({message:doc?.data()?.messages}))
            })


            return () => unSubscription()
        }

    }, [chatId])



    return (
        <div>
            {messages && Object?.entries(messages)?.map((mess, index) => (
                <div className='flex-col' key={index}>
                    {
                        mess[1].sender === actualyUser ?
                            <div className='bg-teal-600 m-3 h-auto rounded-lg rounded-tr-none w-[15rem] flex items-end flex-wrap ml-auto text-start overflow-hidden align-items: flex-end;'>
                                <h3 className='max-w-[15rem] p-4 h-auto break-all'>{mess[1].text}</h3>
                            </div>
                            :

                            <div className='bg-gray-500 m-3 rounded-lg rounded-tl-none w-[15rem] flex items-end flex-wrap mr-auto text-left'>
                                <h3 className='max-w-[15rem] p-4 h-auto break-all'>{mess[1].text}</h3>
                            </div>
                    }
                </div>
            ))}
        </div>

    )
}

export default Messages