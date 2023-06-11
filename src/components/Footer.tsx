import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";


const Footer = () => {
    const { lightTheme } = useStoreContext();

    const Navigate = useNavigate()
    
    return (
        <div className={`mx-auto ${lightTheme ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-700'} max-w-6xl py-5 border-t  px-5`}>
            <div className="mx-auto max-w-5xl py-6 block md:flex items-center md:gap-3 w-full">
                <div className="flex items-center gap-7 w-full justify-center md:justify-start">
                    <p className={`${lightTheme ? 'text-zinc-800' : 'text-zinc-200'} text-zinc-200 font-medium text-xs cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-300`} onClick={()=> Navigate('/about')}>About</p>
                    <p className={`${lightTheme ? 'text-zinc-800' : 'text-zinc-200'} text-zinc-200 font-medium text-xs cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-300`} onClick={()=> Navigate('/articles')}>Articles</p>
                    <p className={`${lightTheme ? 'text-zinc-800' : 'text-zinc-200'} text-zinc-200 font-medium text-xs cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-300`} onClick={()=> Navigate('/projects')}>Projects</p>
                    <p className={`${lightTheme ? 'text-zinc-800' : 'text-zinc-200'} text-zinc-200 font-medium text-xs cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-300`} onClick={()=> Navigate('/skills')}>Skillset</p>
                    <p className={`${lightTheme ? 'text-zinc-800' : 'text-zinc-200'} text-zinc-200 font-medium text-xs cursor-pointer hover:text-[#33A1FD] transition-all ease-in-out duration-300`} onClick={()=> Navigate('/uses')}>Uses</p>
                </div>
                <div className={`flex items-center justify-center md:justify-end ${lightTheme ? 'text-zinc-400' : 'text-zinc-500'} text-sm font-medium w-full mt-5 md:mt-0`}>
                     @ {new Date().getFullYear()} Gridhouse inc, All right reserved
                </div>
            </div>
        </div>
    )
}

export default Footer