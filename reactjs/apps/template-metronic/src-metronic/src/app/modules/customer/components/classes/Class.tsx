import React from 'react'
import {KTCard} from '../../../../../_metronic/helpers'
import {ClassProvider} from './ClassContext'
import ClassListHeader from './header/ClassListHeader'
import ClassTable from './header/ClassTable'

const ClassPage: React.FC = () => {
  return (
    <KTCard>
      <ClassProvider>
        <ClassListHeader />
        <ClassTable />
      </ClassProvider>
    </KTCard>
  )
}

export default ClassPage
