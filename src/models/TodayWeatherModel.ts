import {firstLetterToUppercase, getIcon, getTodayDateFormatted} from '@/common/utils'

export class TodayWeatherModel {
  date: string
  temperature: number
  description: string
  pressure: number
  humidity: number
  sunrise: string
  sunset: string
  feels_like: number
  wind: number
  place: string
  country: string
  icon: string
  lat: number
  lon: number

  static fromJson(json: any) {
    const result = new TodayWeatherModel()

    result.date = getTodayDateFormatted()
    result.temperature = Math.round((json.main.temp - 273.15) * 10) / 10
    result.place = json.name
    result.country = json.sys.country
    result.description = firstLetterToUppercase(json.weather[0].description)
    result.pressure = json.main.pressure
    result.humidity = json.main.humidity
    result.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString()
    result.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString()
    result.feels_like = Math.round((json.main.feels_like - 273.15) * 10) / 10
    result.wind = Math.round(json.wind.speed * 3.6 * 100) / 100
    result.icon = getIcon(json.weather[0].icon)
    result.lat = json.coord.lat
    result.lon = json.coord.lon

    return result
  }
}
