import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {ClassModel} from '../../../../models/ClassModel'

type Props = {
  column: ColumnInstance<ClassModel>
}

const CustomHeaderClassColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderClassColumn}
