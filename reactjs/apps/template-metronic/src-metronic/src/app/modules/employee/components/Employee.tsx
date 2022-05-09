import React from 'react'
import EmployeeProvider from './EmployeeContext'
import {KTCard} from '../../../../_metronic/helpers'
import EmployeeTable from './EmployeeTable'
import EmployeeHeader from './header/EmployeeHeader'

const Employee: React.FC = () => {
  return (
    <EmployeeProvider>
      <KTCard>
        <EmployeeHeader />
        <EmployeeTable />
      </KTCard>
    </EmployeeProvider>
  )
}

export default Employee
