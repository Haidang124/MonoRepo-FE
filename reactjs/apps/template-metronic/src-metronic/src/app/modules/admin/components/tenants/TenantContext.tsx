import React, {createContext, useContext, useEffect, useState} from 'react'
import {getAllTenant} from '../../redux/TenantCRUD'
import {Tenant} from '../../models/TenantModel'

export const initTenantValue: Tenant = {
  name: '',
  provinceId: '',
  phoneNumber: '',
  email: '',
  address: '',
  tenantInfos: {
    managerId: '',
    serviceStateId: '',
    managerPositionId: '',
  },
}
export interface ITenantContext {
  tenants: Tenant[]
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>
  getTenants: () => void
}
const TenantContext = createContext<ITenantContext | null>(null)

export const useTenantContext = () => {
  return useContext(TenantContext)
}

export const TenantConsumer = TenantContext.Consumer

export const TenantProvider: React.FC = ({children}) => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  useEffect(() => {
    getTenants()
  }, [])
  const getTenants = () => {
    getAllTenant().then((res) => {
      setTenants(res.data.data)
    })
  }
  const value = {
    tenants,
    setTenants,
    getTenants,
  }
  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}
