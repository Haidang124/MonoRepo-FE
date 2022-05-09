import {UserModel} from '../../auth/models/UserModel'
import {ServicePackage} from './ServicePackageModel'
export interface District {
  name: string
  provinceId: string
  id: string
}
export interface CenterType {
  name: string
  id: string
}
export interface SaleChannel {
  name: string
  id: string
}
export interface ServiceState {
  name: string
  id: string
}
export interface Subject {
  name: string
  id: string
}
export interface Position {
  name: string
  id: string
}
export interface Representative {
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  gender?: number
  doB?: string
  position?: Position
}
export interface Center {
  id?: string
  name?: string
  abbreviation?: string
  companyName?: string
  taxCode?: string
  phoneNumber?: string
  email?: string
  district?: District
  address?: string
  centerType?: CenterType
  subject?: Subject
  representative?: Representative
  serviceInfo?: {
    saleChannel?: SaleChannel
    serviceState?: ServiceState
    userAssign?: UserModel
    createdBy?: UserModel
    servicePackage?: ServicePackage
  }
  user?: UserModel
}
