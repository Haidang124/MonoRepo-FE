import React from 'react'
import {KTCard} from '../../../../../_metronic/helpers'
import {ClassProvider} from './ClassContext'
import ClassListHeader from './header/ClassListHeader'
import ClassTable from './header/ClassTable'

const ClassDetail: React.FC = () => {
  return (
    <KTCard>
      <ClassProvider>
        <ClassListHeader />
        <ClassTable />
      </ClassProvider>
    </KTCard>
  )
}

export default ClassDetail
