import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
})

const appId = 'ebbf5f1d676d479b2fc1eb8dd318add2'

export async function getActualWeatherForPlace(place: string) {
  try {
    const {data} = await axiosClient.get(`/weather?q=${place}&appid=${appId}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export async function getNextDays(lat: number, lon: number) {
  try {
    const {data} = await axiosClient.get(`/onecall?lat=${lat}&lon=${lon}&appid=${appId}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}