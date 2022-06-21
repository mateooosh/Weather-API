import {firstLetterToUppercase, getIcon} from '@/common/utils'

export class NextDayModel {
  day: string
  date: string
  temperature: number
  description: string
  pressure: number
  humidity: number
  sunrise: string
  sunset: string
  feels_like: number
  wind: number
  icon: string

  static fromJson(json: any) {
    const result = new NextDayModel()

    result.day = json.day || null
    result.date = json.date || null
    result.icon = getIcon(json.weather[0].icon || null)
    result.temperature = Math.round((json.temp.day - 273.15) * 10) / 10
    result.description = firstLetterToUppercase(json.weather[0].description)
    result.pressure = json.pressure
    result.humidity = json.humidity
    result.sunrise = new Date(json.sunrise * 1000).toLocaleTimeString()
    result.sunset = new Date(json.sunset * 1000).toLocaleTimeString()
    result.feels_like = Math.round((json.feels_like.day - 273.15) * 10) / 10
    result.wind = Math.round(json.wind_speed * 3.6 * 10) / 10

    return result
  }
}
