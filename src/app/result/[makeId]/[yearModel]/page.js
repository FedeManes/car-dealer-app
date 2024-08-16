import { FaHome } from 'react-icons/fa'

export const dynamicParams = false

export async function generateStaticParams() {
  const vehicles = await fetch(process.env.CAR_DEALER_API).then((res) =>
    res.json()
  )

  const makeId = [...new Set(vehicles.Results.map((vehicle) => vehicle.MakeId))]

  const cleanedYearString = process.env.YEAR.replace(/,\s*]$/, ']')
  const yearsModel = JSON.parse(cleanedYearString)

  const slugs = []
  makeId.forEach((makeId) => {
    yearsModel.forEach((yearModel) => {
      slugs.push({
        makeId: makeId.toString(),
        yearModel: yearModel.toString(),
      })
    })
  })

  const uniqueSlugs = [
    ...new Set(slugs.map((slug) => JSON.stringify(slug))),
  ].map((slug) => JSON.parse(slug))

  return uniqueSlugs
}

async function getSearchResults(makeId, yearModel) {
  const envEndpoint = process.env.SEARCH_CARS_API
  const endpoint = process.env.SEARCH_CARS_API.replace(
    '{make-id}',
    makeId.toString()
  ).replace('{model-year}', yearModel.toString())

  const res = await fetch(endpoint, { cache: 'no-store' })
  const vehicles = await res.json()
  return vehicles.Results
}

export default async function Result({ params }) {
  const { makeId, yearModel } = params
  const searchResults = await getSearchResults(makeId, yearModel)

  return (
    <div>
      <h1 className="w-auto text-3xl bg-cyan-800 text-gray-200 p-2 rounded-lg">
        <span className="flex items-center justify-between">
          <span>
            {searchResults.length > 1
              ? 'These are your results:'
              : 'This is your result:'}
          </span>
          <a href="/">
            <FaHome className="w-6 h-6" />
          </a>
        </span>
      </h1>
      <div className="mt-2 w-auto flex flex-wrap">
        {searchResults?.map((vehicle, index) => (
          <div
            key={vehicle.Model_ID}
            className="smaller:w-1/2 sm:w-1/3 md:w-1/4 mx-1 bg-cyan-600 my-1 p-4 rounded-lg"
          >
            <ul>
              <li key={`${vehicle.Model_ID}-${yearModel}`}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Year:{' '}
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    {yearModel}
                  </span>
                </span>
              </li>
              <li key={`${vehicle.Model_ID}-${vehicle.Make_Name}`}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Company:{' '}
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    {vehicle.Make_Name}
                  </span>
                </span>
              </li>
            </ul>
            <ul>
              <li key={`${vehicle.Model_ID}-${vehicle.Model_Name}`}>
                <span className="flex items-center">
                  <span className="w-1/2 text-left font-bold underline bg-gray-100 pl-2 rounded-md m-1 text-cyan-700">
                    Car Model:
                  </span>
                  <span className="w-1/2 text-center bg-gray-100 rounded-md m-1 text-cyan-800">
                    {vehicle.Model_Name}
                  </span>
                </span>
              </li>
            </ul>
            <div className="text-right">
              <span className=" text-white font-medium">
                {index + 1}/{searchResults.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
