export enum PackageType {
  Other,
  Main,
}

export enum PackageUserType {
  Employee,
  Parent,
  Student,
}

export interface ServiceInfoModel {
  name: string
  description: string
  price: string
  active: number
  serviceUnitId: string
  packageType: PackageType
  userTypes: PackageUserType[]
  functionIds: string[]
}

// export interface UserType {
//   id: string
//   name: string
// }

export interface ServicePackage {
  id: string
  name: string
  description: string
  price: string
  serviceUnitId: string
  active: number
  packageType: PackageType
  createDate: Date
  userTypes: PackageUserType[]
}

export const status = [
  {label: 'Tạm dừng', value: 0},
  {label: 'Hoạt động', value: 1},
]

export const packageTypes = [
  {label: 'Khác', value: PackageType.Other},
  {label: 'Chính', value: PackageType.Main},
]

export const packageUserTypes = [
  {label: 'Nhân viên', value: PackageUserType.Employee},
  {label: 'Phụ huynh', value: PackageUserType.Parent},
  {label: 'Học sinh', value: PackageUserType.Student},
]
