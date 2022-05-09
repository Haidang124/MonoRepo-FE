import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {Center} from '../../../../models/TrainingCenterModel'

type Props = {
  column: ColumnInstance<Center>
}

const CustomHeaderCenterColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderCenterColumn}
