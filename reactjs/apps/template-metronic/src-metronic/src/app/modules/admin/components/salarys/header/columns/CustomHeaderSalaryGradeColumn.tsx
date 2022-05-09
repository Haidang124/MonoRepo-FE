import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {SalaryGradeModel} from '../../../../models/SalaryModel'

type Props = {
  column: ColumnInstance<SalaryGradeModel>
}

const CustomHeaderSalaryGradeColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderSalaryGradeColumn}
