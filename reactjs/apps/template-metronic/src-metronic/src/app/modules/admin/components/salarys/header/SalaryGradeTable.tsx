import {useEffect, useMemo, useState} from 'react'
import {Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import {SalaryGradeModel} from '../../../models/SalaryModel'
import {useSalaryGradeContext} from '../SalaryGradeContext'
import '../styles/salaryTable.scss'
import {CustomSalaryGradeRow} from './columns/CustomSalaryGradeRow'
import {salaryGradesColumns} from './columns/SalaryGradeColumns'
const SalaryGradeTable = () => {
  const salaryGradeContext = useSalaryGradeContext()
  const [initData, setInitData] = useState<any>(salaryGradeContext?.salaryGrades)
  useEffect(() => {
    setInitData(salaryGradeContext?.salaryGrades)
  }, [salaryGradeContext?.salaryGrades])
  const data = useMemo(() => initData, [initData])
  const columns = useMemo(() => salaryGradesColumns, [])
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
  })
  return (
    <div>
      <KTCardBody className='py-4 salary-table'>
        <div className='table-responsive'>
          <table className='table' {...getTableProps()}>
            <thead className='text-gray-600 fw-bold'>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='salary-table-body text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<SalaryGradeModel>, i) => {
                  prepareRow(row)
                  return <CustomSalaryGradeRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td className='py-5 border-0' colSpan={9}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      Chưa có dữ liệu !
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </div>
  )
}

export default SalaryGradeTable
