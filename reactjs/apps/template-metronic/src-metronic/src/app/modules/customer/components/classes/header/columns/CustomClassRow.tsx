import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {ClassModel} from '../../../../models/ClassModel'

type Props = {
  row: Row<ClassModel>
}

const CustomClassRow: FC<Props> = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomClassRow}
