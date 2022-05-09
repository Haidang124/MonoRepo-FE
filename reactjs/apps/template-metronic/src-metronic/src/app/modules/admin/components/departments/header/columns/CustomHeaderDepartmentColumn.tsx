import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {DepartmentModel} from '../../../../models/DepartmentModel'

type Props = {
  column: ColumnInstance<DepartmentModel>
}

const CustomHeaderDepartmentColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderDepartmentColumn}
