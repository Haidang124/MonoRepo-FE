import React, {createContext, useContext, useEffect, useState} from 'react'
import {getServicePackage, getUnits} from '../../../redux/ServiceCRUD'
import {PackageType, ServiceInfoModel} from '../../../models/ServicePackageModel'
import {Unit} from '../../service-unit/UnitContext'
import {useLocation} from 'react-router-dom'

export interface ServiceDetailContextModel {
  units: Unit[]
  setUnits: (units: Unit[]) => void
  serviceInfo: ServiceInfoModel
  setServiceInfo: (serviceInfo: ServiceInfoModel) => void
}

const ServiceDetailContext = createContext<ServiceDetailContextModel>({} as ServiceDetailContextModel)

export const useServiceDetailContext = () => {
  return useContext(ServiceDetailContext)
}

export const ServiceDetailConsumer = ServiceDetailContext.Consumer

export const ServiceDetailProvider: React.FC = ({children}) => {
  const [units, setUnits] = useState<Unit[]>([])
  const [serviceInfo, setServiceInfo] = useState<ServiceInfoModel>({
    name: '',
    description: '',
    price: '',
    serviceUnitId: '',
    active: 0,
    packageType: PackageType.Other,
    userTypes: [],
    functionIds: [],
  })
  const {state} = useLocation()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getData().then((r) => {
      if (state)
        getServicePackage(state).then((value) => {
          setServiceInfo(value.data.data)
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const getData = async () => {
    getUnits().then((value) => {
      setUnits(value.data)
    })
  }

  const value = {
    units,
    setUnits,
    serviceInfo,
    setServiceInfo,
  }
  return <ServiceDetailContext.Provider value={value}>{children}</ServiceDetailContext.Provider>
}
