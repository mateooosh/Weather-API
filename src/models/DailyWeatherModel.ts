import {NextDayModel} from '@/models/NextDayModel'
import _ from 'lodash'
import {getDate, getNameOfDay} from '@/common/utils'

export class DailyWeatherModel {
  daily: Array<NextDayModel>

  static fromJson(json) {
    let day = new Date()
    for (let i = 1; i < 8; i++) {
      day.setDate(day.getDate() + 1)
      json.daily[i].day = getNameOfDay(day)
      json.daily[i].date = getDate(day)
    }

    const result = new DailyWeatherModel()
    result.daily = _.map(json.daily, day => NextDayModel.fromJson(day))
    return result
  }
}
