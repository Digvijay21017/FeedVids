import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
        <Image 
                src={'/loginImg.png'} 
                width={500} 
                height={500} 
                alt="Login Image" 
                className='w-full h-full object-contain'
            />
        </div>
        <div className='flex justify-center items-center h-screen'>
            <SignIn />
        </div>
    </div>
  )
}