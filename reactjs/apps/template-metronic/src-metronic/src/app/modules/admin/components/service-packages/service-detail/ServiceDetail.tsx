import React from 'react'
import './style/style.scss'
import {ServiceDetailProvider} from './ServiceDetailContext'
import ServiceInfo from './ServiceInfo'
import InfoDetail from './InfoDetail'

const ServiceDetailUnit: React.FC = () => {
  return (
    <>
      <div className='ServiceDetailUnit'>
        <ServiceDetailProvider>
          <div className='row'>
            <div className="col-xl-8 col-12">
              <ServiceInfo />
            </div>
            <div className="col-xl-4 col-12">
              <InfoDetail />
            </div>
          </div>
        </ServiceDetailProvider>
      </div>
    </>
  )
}

export default ServiceDetailUnit
