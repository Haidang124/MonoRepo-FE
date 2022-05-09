import {useEffect, useMemo, useState} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import { DepartmentModel } from '../../../models/DepartmentModel'
import {useDepartmentContext} from '../DepartmentContext'
import {CustomDepartmentRow} from './columns/CustomDepartmentRow'
import {CustomHeaderDepartmentColumn} from './columns/CustomHeaderDepartmentColumn'
import {departmentColumns} from './columns/DepartmentColumns'

const DepartmentTable = () => {
  const departmentContex = useDepartmentContext()
  const [initData, setInitData] = useState<any>(departmentContex?.departments)
  useEffect(() => {
    setInitData(departmentContex?.departments)
  }, [departmentContex?.departments])
  const data = useMemo(() => initData, [initData])
  const columns = useMemo(() => departmentColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<DepartmentModel>) => {
                return <CustomHeaderDepartmentColumn key={column.id} column={column} />
              })}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<DepartmentModel>, i) => {
                prepareRow(row)
                return <CustomDepartmentRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
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
  )
}

export default DepartmentTable
