import React from 'react'
import ClassroomProvider from './ClassroomContext'
import ClassroomTable from './ClassroomTable'
import ClassroomHeader from './ClassroomHeader'
import {KTCard} from '../../../../../_metronic/helpers'

const ClassroomPage: React.FC = () => {
  return (
    <KTCard>
      <ClassroomProvider>
        <ClassroomHeader />
        <ClassroomTable />
      </ClassroomProvider>
    </KTCard>
  )
}

export default ClassroomPage
