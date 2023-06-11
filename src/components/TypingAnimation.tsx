

const TypingAnimation = () => {
  return (
    <div className='flex items-center space-x-2'>
      <div className='h-1 md:h-2 w-2 md:w-2 rounded-full bg-gradient-to-r from-zinc-100 to-[#33A1FD] animate-pulse'></div>
      <div className='h-1 md:h-2 w-2 md:w-2 rounded-full bg-gradient-to-r from-zinc-100 to-[#33A1FD] animate-pulse delay-75'></div>
      <div className='h-1 md:h-2 w-2 md:w-2 rounded-full bg-gradient-to-r from-zinc-100 to-[#33A1FD] animate-pulse delay-150'></div>
    </div>
  )
}

export default TypingAnimation