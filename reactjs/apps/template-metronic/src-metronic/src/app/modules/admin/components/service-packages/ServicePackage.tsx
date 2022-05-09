import React from 'react'
import {ServicePackageProvider} from './ServicePackageContext'
import ServicePackageTable from './ServicePackageTable'
import './style/style.scss'
import {Link} from 'react-router-dom'
import ServicePackageFilter from './ServicePackageFilter'

const ServicePackageView: React.FC = () => {
  return (
    <div className='service-package'>
      <ServicePackageProvider>
        <div className='btn-input'>
          <ServicePackageFilter />
          <div>
            <Link className='btn btn-primary btn-sm' to='/admin/ServiceUnit'>
              ĐƠN VỊ TÍNH
            </Link>
            <Link className='btn btn-primary btn-sm' to='/admin/serviceDetail'>
              TẠO MỚI
            </Link>
          </div>
        </div>
        <ServicePackageTable />
      </ServicePackageProvider>
    </div>
  )
}

export default ServicePackageView
