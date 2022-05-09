import {KTCard} from '../../../../../_metronic/helpers'
import SalaryGradeTable from './header/SalaryGradeTable'
import SalaryListHeader from './header/SalaryListHeader'
import {SalaryGradeProvider} from './SalaryGradeContext'
const SalaryGradePage: React.FC = () => {
  return (
    <KTCard>
      <SalaryGradeProvider>
        <SalaryListHeader />
        <SalaryGradeTable  />
      </SalaryGradeProvider>
    </KTCard>
  )
}

export default SalaryGradePage
