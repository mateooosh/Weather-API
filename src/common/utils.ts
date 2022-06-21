import {DAYS} from '../../common/DAYS'

export const getIcon = (str: string) => {
  return str[0] + str[1]
}

export const getNameOfDay = (date: Date) => {
  return date && DAYS[date.getDay()]
}

export const getDate = (date: Date) => {
  return `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}`
}

export const getTodayDateFormatted = () => {
  let now = new Date()
  let day = DAYS[now.getDay()]
  return day + ', ' + ((now.getDate() > 9) ? now.getDate() : '0' + now.getDate()) + '.' +
    ((now.getMonth() + 1) > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) + '.' + now.getFullYear()
}

export const firstLetterToUppercase = (str: string) => {
  return str.length > 1 ? str.charAt(0).toUpperCase() + str.slice(1) : str.toUpperCase()
}