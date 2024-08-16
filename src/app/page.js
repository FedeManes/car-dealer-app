import Selector from '@/components/Selector/Selector'
import { FaCar } from 'react-icons/fa6'

async function getVehicles() {
  const res = await fetch(process.env.CAR_DEALER_API, { cache: 'no-store' })
  const vehicles = await res.json()
  const cleanedYearString = process.env.YEAR.replace(/,\s*]$/, ']')
  const vehiclesYearModel = JSON.parse(cleanedYearString)

  const vehiclesforSearch = {
    vehiclesData: vehicles.Results,
    vehiclesYearModel,
  }
  return vehiclesforSearch
}

export default async function Home() {
  const vehicles = await getVehicles()

  return (
    <div>
      <h1 className="text-3xl bg-cyan-800 text-gray-200 p-2 rounded-lg">
        <span className="flex items-center space-x-2">
          <span>Search your car</span>
          <FaCar className="w-6 h-6" />
        </span>
      </h1>
      <Selector vehicles={vehicles}></Selector>
    </div>
  )
}
