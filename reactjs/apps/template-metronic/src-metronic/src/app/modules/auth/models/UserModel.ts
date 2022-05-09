import {AuthModel} from './AuthModel'

export interface UserModel {
  id: string
  username: string
  password: string | undefined
  email: string
  representativeEmail: string
  representativeName: string
  representativePhoneNumber: string
  roleIds: string[]
  taxCode: string
  unitAddress: string
  unitName: string
  first_name: string
  language?: 'en' | 'vi'
  auth?: AuthModel
  fullName: string
  phoneNumber: string
  gender: number
  dob: string
  address: string
  idNumber: string
  maritalStatus: number
  note?: string
}

export const GenderOptions = [
  {value: 0, label: 'Male'},
  {value: 1, label: 'Female'},
  {value: 2, label: 'Other'},
]

export const MaritalStatus = [
  {value: 0, label: 'Single'},
  {value: 1, label: 'Married'},
  {value: 2, label: 'Divorce'},
]
