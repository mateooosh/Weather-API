import {NextDayModel} from '@/models/NextDayModel'
import _ from 'lodash'
import {getNameOfDay} from '@/common/utils'

export class DailyWeatherModel {
  daily: Array<NextDayModel>

  static fromJson(json) {
    let day = new Date()
    for (let i = 1; i < 8; i++) {
      day.setDate(day.getDate() + 1)
      json.daily[i].day = getNameOfDay(day)
      json.daily[i].date = `${day.getDate() > 9 ? day.getDate() : '0' + day.getDate()}.${day.getMonth() + 1 > 9 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)}`
    }

    const result = new DailyWeatherModel()
    result.daily = _.map(json.daily, day => NextDayModel.fromJSON(day))
    return result
  }

}