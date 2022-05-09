import {KTCard} from '../../../../../_metronic/helpers'
import {DepartmentProvider} from './DepartmentContext'
import DepartmentListHeader from './header/DepartmentListHeader'
import DepartmentTable from './header/DepartmentTable'

const DepartmentPage = () => {
  return (
    <KTCard>
      <DepartmentProvider>
        <DepartmentListHeader />
        <DepartmentTable />
      </DepartmentProvider>
    </KTCard>
  )
}

export default DepartmentPage
