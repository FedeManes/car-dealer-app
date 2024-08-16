import notFoundImage from '@public/images/notFoundImage.jpg'
import { FaHome } from 'react-icons/fa'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="relative w-auto m-2 flex flex-wrap">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full flex justify-between items-center p-10">
          <h1 className="text-3xl text-gray-100">
            .... Sorry, page not found{' '}
          </h1>
          <a href="/">
            <FaHome className="w-6 h-6 text-gray-100" />
          </a>
        </div>
      </div>
      <div className="h-auto w-auto">
        <Image
          src={notFoundImage}
          alt="notFound"
          className="object-contain w-full h-auto lg:max-h-120"
        ></Image>
      </div>
    </div>
  )
}
