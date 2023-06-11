import { useRef } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { urlFor } from "../client";
import { useStoreContext } from "../context";
import Javascript from '../assets/javascript.png'

export interface ToolsDataProps {
    data: {}[]
  }

const Carousel:React.FC<ToolsDataProps> = ({ data }) => {
    const { lightTheme } = useStoreContext();

    // const heroImagesAI = [
    //     "https://cdn.pixabay.com/photo/2023/04/11/11/21/butterfly-7916963_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2023/04/11/11/21/butterfly-7916963_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2023/04/11/11/21/butterfly-7916963_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2023/04/11/11/21/butterfly-7916963_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2023/04/11/11/21/butterfly-7916963_1280.jpg"
    // ]


    const sliderRef = useRef<HTMLDivElement>(null);

    const slideLeft = (): void => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 700;
        }
    };

    const slideRight = (): void => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 700;
        }
    };

    return (
            <section className='-mt-[30rem] ml-7 md:ml-0'>
                <div className='flex relative group'>
                    <div className='bg-black absolute left-1 top-[35%] -translate-x-0 translate-y-[50%]  p-1 rounded-full cursor-pointer hidden group-hover:block transition-all duration-300 z-[99999]'>
                        <AiFillLeftCircle onClick={() => slideLeft()} className='text-[2rem] text-[#E5E5E5]' />
                    </div>
                    <div ref={sliderRef} className='flex space-x-6 overflow-scroll scrollbar-hide scroll-smooth p-3 -ml-3'>
                        {data && data?.map((img, _i) => (
                            <div className='cursor-pointer hover:scale-105 transform transition duration-300 ease-out mt-3 h-[17rem] md:h-[17rem] w-[20rem] md:w-[25rem]' key={_i}>
                                <div className={`relative h-full w-[20rem] rounded-3xl ${lightTheme ? 'bg-white' : 'bg-black'} p-5`}>
                                    <img src={img ? urlFor(img): Javascript} loading="lazy" alt="workspace-images" className="object-contain rounded-3xl h-[100%] w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='bg-black absolute right-1 top-[35%] -translate-x-0 translate-y-[50%] z-[99999] p-1 rounded-full cursor-pointer hidden group-hover:block transition-all duration-300'>
                        <AiFillRightCircle onClick={() => slideRight()} className='text-[2rem] text-[#E5E5E5]' />
                    </div>
                </div>
            </section>
    )
}

export default Carousel