export const getCountryList = async () => {
  const response = await fetch('http://localhost:4000/countrys')
  const data = await response.json()
  return data
}
