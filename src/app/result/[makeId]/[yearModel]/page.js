import { stringify } from 'postcss'

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
    <div className="bg-sky-900">
      <h1>This are your results:</h1>
      <div>
        {searchResults?.map((vehicle) => (
          <div>
            <ul>
              <li key={`${vehicle.Model_ID}-${yearModel}`}>
                Year: {yearModel}
              </li>
              <li key={`${vehicle.Model_ID}-${vehicle.Make_Name}`}>
                Company: {vehicle.Make_Name}
              </li>
            </ul>
            <ul>
              <li key={`${vehicle.Model_ID}-${vehicle.Model_Name}`}>
                Car Model: {vehicle.Model_Name}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
