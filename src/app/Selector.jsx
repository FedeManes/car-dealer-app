'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineManageSearch } from 'react-icons/md'
import Image from 'next/image'
import carBanner from '../../public/images/carBanner.jpg'

const Selector = ({ vehicles }) => {
  const router = useRouter()

  const { vehiclesData, vehiclesYearModel } = vehicles
  const [inputValueVehicleName, setInputValueVehicleName] = useState('')
  const [selectedVehicleName, setSelectedVehicleName] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [openVehicleName, setOpenVehicleName] = useState(false)
  const toggleDropdownVehicleName = () => {
    setOpenVehicleName((openVehicleName) => !openVehicleName)
  }

  const [inputValueVehicleYearModel, setInputValueVehicleYearModel] =
    useState('')
  const [selectedVehicleYearModel, setSelectedVehicleYearModel] = useState('')
  const [openVehicleYearModel, setOpenVehicleYearModel] = useState(false)
  const toggleDropdownVehicleYearModel = () => {
    setOpenVehicleYearModel((openVehicleYearModel) => !openVehicleYearModel)
  }

  const processSearch = () => {
    if (selectedVehicleYearModel && selectedVehicleName) {
      router.push(`/result/${selectedVehicleId}/${selectedVehicleYearModel}`)
    }
  }

  return (
    <div>
      <div className="my-2 smaller:w-full lg:w-1/2">
        <button
          disabled={
            selectedVehicleYearModel && selectedVehicleName ? false : true
          }
          className="bg-cyan-700 hover:bg-cyan-800 flex p-4 rounded-lg items-center text-l text-white px-6"
          onClick={processSearch}
        >
          <span className="flex items-center space-x-2">
            <span>Next</span>
            <MdOutlineManageSearch className="w-6 h-6" />
          </span>
        </button>
      </div>
      <div className="w-full flex smaller:justify-end flex-col-reverse md:flex-row font-medium h-80">
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:space-x-2">
          <div className="w-full md:w-1/2">
            <div
              onClick={toggleDropdownVehicleName}
              className={`w-full p-2 flex items-center justify-between rounded ${
                !selectedVehicleName && 'text-gray-700'
              } ${selectedVehicleName && 'bg-cyan-900 text-gray-100'}`}
            >
              {selectedVehicleName
                ? selectedVehicleName?.length > 25
                  ? selectedVehicleName?.substring(0, 25) + '...'
                  : selectedVehicleName
                : 'Select vehicle name'}
              <BiChevronDown
                size={20}
                className={`${openVehicleName && 'rotate-180'}`}
              />
            </div>
            <ul
              className={`bg-gray-100 border-2 mt-2 overflow-y-auto ${
                openVehicleName ? 'max-h-60' : 'max-h-0'
              } `}
            >
              <div className="flex items-center px-2 sticky top-0 bg-white">
                <AiOutlineSearch size={18} className="text-gray-700" />
                <input
                  type="text"
                  value={inputValueVehicleName}
                  onChange={(e) =>
                    setInputValueVehicleName(e.target.value.toLowerCase())
                  }
                  placeholder="Enter vehicle type"
                  className="placeholder:text-gray-700 p-2 outline-none"
                />
              </div>
              {vehiclesData?.map((vehicle) => (
                <li
                  key={vehicle.MakeName}
                  className={`p-2 text-sm border-2 border-white hover:bg-cyan-600 hover:text-white
                ${
                  vehicle.MakeName.toLowerCase() ===
                    selectedVehicleName?.toLowerCase() &&
                  'bg-cyan-800 text-white'
                }
                ${
                  vehicle.MakeName.toLowerCase().startsWith(
                    inputValueVehicleName
                  )
                    ? 'block'
                    : 'hidden'
                }`}
                  onClick={() => {
                    if (
                      vehicle.MakeName.toLowerCase() !==
                      selectedVehicleName.toLowerCase()
                    ) {
                      setSelectedVehicleName(vehicle.MakeName)
                      setSelectedVehicleId(vehicle.MakeId)
                      setOpenVehicleName(false)
                      setInputValueVehicleName('')
                    }
                  }}
                >
                  {vehicle.MakeName}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div
              onClick={toggleDropdownVehicleYearModel}
              className={`w-full p-2 flex items-center justify-between rounded ${
                !selectedVehicleYearModel && 'text-gray-700'
              } ${selectedVehicleYearModel && 'bg-cyan-900 text-gray-100'}`}
            >
              {selectedVehicleYearModel
                ? selectedVehicleYearModel
                : 'Select vehicle model Year'}
              <BiChevronDown
                size={20}
                className={`${openVehicleYearModel && 'rotate-180'}`}
              />
            </div>
            <ul
              className={`bg-gray-100 border-2 mt-2 overflow-y-auto ${
                openVehicleYearModel ? 'max-h-60' : 'max-h-0'
              } `}
            >
              <div className="flex items-center px-2 sticky top-0 bg-white">
                <AiOutlineSearch size={18} className="text-gray-700" />
                <input
                  type="number"
                  value={inputValueVehicleYearModel}
                  onChange={(e) =>
                    setInputValueVehicleYearModel(e.target.value)
                  }
                  placeholder="Enter year model"
                  className="placeholder:text-gray-700 p-2 outline-none"
                />
              </div>
              {vehiclesYearModel?.map((model) => (
                <li
                  key={model}
                  className={`p-2 text-sm hover:bg-cyan-600 hover:text-white
                    ${model === selectedVehicleYearModel && 'bg-cyan-800 text-white'}
                    ${
                      model.toString().startsWith(inputValueVehicleYearModel)
                        ? 'block'
                        : 'hidden'
                    }`}
                  onClick={() => {
                    if (model !== selectedVehicleYearModel) {
                      setSelectedVehicleYearModel(model)
                      setOpenVehicleYearModel(false)
                      setInputValueVehicleYearModel('')
                    }
                  }}
                >
                  {model}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex ml-1 justify-center items-center">
          <Image
            src={carBanner}
            className="object-contain w-full h-auto"
          ></Image>
        </div>
      </div>
    </div>
  )
}

export default Selector
