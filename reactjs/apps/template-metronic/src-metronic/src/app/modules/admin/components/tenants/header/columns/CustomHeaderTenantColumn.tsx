import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Tenant } from '../../../../models/TenantModel'

type Props = {
  column: ColumnInstance<Tenant>
}

const CustomHeaderTenantColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderTenantColumn}
