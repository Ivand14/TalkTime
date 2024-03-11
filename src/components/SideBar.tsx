"use client"

import Contacts from '@/components/Contacts'
import SearchContact from '@/components/SearchContact'
import { isMobile } from '@/lib/definitions'
import { useSelector } from 'react-redux'

const SideBar = () => {

    const isMobile = useSelector((state: isMobile) => state.chatBox)
    console.log(isMobile)

    return (
        <div id={isMobile ? "sidebarView" : 'sidebar'} className="flex-col  bg-slate-800 w-[30%] p-2 rounded-xl justify-beetwen">
            <SearchContact />
            <Contacts />
        </div>
    )
}

export default SideBar 