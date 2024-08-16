import notFound from '../../../not-found'
import { FaHome } from 'react-icons/fa'

export default function NotFound() {
  const loadingResults = [1, 2, 3, 4]
  return (
    <div>
      <h1 className="bg-gradient-animate w-auto text-3xl bg-cyan-800 text-gray-200 p-2 rounded-lg">
        <span className="flex items-center justify-between">
          <span>......</span>
          <a href="/">
            <FaHome className="w-6 h-6" />
          </a>
        </span>
      </h1>
      <div className="mt-2 w-auto flex flex-wrap">
        {loadingResults?.map((load) => (
          <div className="bg-gradient-animate smaller:w-1/2 sm:w-1/3 md:w-1/4 mx-1 bg-cyan-600 my-1 p-4 rounded-lg">
            <ul>
              <li key={`${load}-year`}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Year:
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    ......
                  </span>
                </span>
              </li>
              <li key={`${load}-company`}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Company:
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    ......
                  </span>
                </span>
              </li>
            </ul>
            <ul>
              <li key={load}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Car Model:
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    ......
                  </span>
                </span>
              </li>
            </ul>
            <div className="text-right">
              <span className=" text-white font-medium">{load}/N</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
