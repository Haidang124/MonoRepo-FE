import {KTCard} from '../../../../../_metronic/helpers'
import TenantListHeader from './header/TenantListHeader'
import TenantTable from './header/TenantTable'
import {TenantProvider} from './TenantContext'

const TenantPage = () => {
  return (
    <KTCard>
      <TenantProvider>
        <TenantListHeader />
        <TenantTable />
      </TenantProvider>
    </KTCard>
  )
}

export default TenantPage
