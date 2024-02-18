import Contacts from '@/components/Contacts'
import SearchContact from '@/components/SearchContact'

const SideBar = () => {

    
    return (
        <div className="flex-col h-[35rem]  bg-slate-800 w-[30%] p-2 rounded-xl justify-beetwen">
            <SearchContact/>
            <Contacts/>
        </div>
    )
}

export default SideBar