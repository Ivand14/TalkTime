import ChatBox from '@/components/ChatBox'
import SideBar from '@/components/SideBar'

const Home = () => {
    return (
        <div className='h-screen w-screen'>
            <div className='flex justify-center p-4  gap-9'>
                <SideBar />
                <ChatBox />
            </div>
        </div>
    )
}

export default Home