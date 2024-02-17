import SearchContact from '@/components/SearchContact'
import Contacts from '@/components/Contacts'

const SideBar = () => {

    
    return (
        <div className="flex-col h-[35rem]  bg-slate-800 w-[20%] p-2 rounded-xl justify-beetwen">
            <SearchContact/>
            <Contacts/>
        </div>
    )
}

export default SideBar