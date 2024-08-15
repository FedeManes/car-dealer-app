'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineManageSearch } from 'react-icons/md'

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
    <div className="w-72 font-medium h-80">
      <div
        onClick={toggleDropdownVehicleName}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selectedVehicleName && 'text-gray-700'
        }`}
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
        className={`bg-white mt-2 overflow-y-auto ${
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
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              vehicle.MakeName.toLowerCase() ===
                selectedVehicleName?.toLowerCase() && 'bg-sky-600 text-white'
            }
            ${
              vehicle.MakeName.toLowerCase().startsWith(inputValueVehicleName)
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

      <div
        onClick={toggleDropdownVehicleYearModel}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selectedVehicleYearModel && 'text-gray-700'
        }`}
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
        className={`bg-white mt-2 overflow-y-auto ${
          openVehicleYearModel ? 'max-h-60' : 'max-h-0'
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="number"
            value={inputValueVehicleYearModel}
            onChange={(e) => setInputValueVehicleYearModel(e.target.value)}
            placeholder="Enter year model"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {vehiclesYearModel?.map((model) => (
          <li
            key={model}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                ${model === selectedVehicleYearModel && 'bg-sky-600 text-white'}
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

      <button
        disabled={
          selectedVehicleYearModel && selectedVehicleName ? false : true
        }
        className="bg-red-700 hover:bg-red-300"
        onClick={processSearch}
      >
        Next
        {/* <a href={`/result/${selectedVehicleId}/${selectedVehicleYearModel}`}>
          Next
        </a> */}
        <MdOutlineManageSearch />
      </button>
    </div>
  )
}

export default Selector
