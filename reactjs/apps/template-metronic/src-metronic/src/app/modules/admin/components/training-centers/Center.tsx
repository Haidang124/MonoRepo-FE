import {KTCard} from '../../../../../_metronic/helpers'
import {CenterProvider} from './CenterContext'
import CenterListHeader from './header/CenterListHeader'
import CenterTable from './header/CenterTable'

const CenterPage = () => {
  return (
    <KTCard>
      <CenterProvider>
        <CenterListHeader />
        <CenterTable />
      </CenterProvider>
    </KTCard>
  )
}

export default CenterPage
