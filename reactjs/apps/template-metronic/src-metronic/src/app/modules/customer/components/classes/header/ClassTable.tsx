import {useEffect, useMemo, useState} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import {useClassContext} from '../ClassContext'
import {classColumns} from './columns/ClassColumns'
import {ClassModel} from '../../../models/ClassModel'
import {CustomHeaderClassColumn} from './columns/CustomHeaderClassColumn'
import {CustomClassRow} from './columns/CustomClassRow'
const ClassTable = () => {
  const classContex = useClassContext()
  const [initData, setInitData] = useState<any>(classContex?.classes)
  useEffect(() => {
    setInitData(classContex?.classes)
  }, [classContex?.classes])
  const data = useMemo(() => initData, [initData])
  const columns = useMemo(() => classColumns, [])
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
              {headers.map((column: ColumnInstance<ClassModel>) => {
                return <CustomHeaderClassColumn key={column.id} column={column} />
              })}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<ClassModel>, i) => {
                prepareRow(row)
                return <CustomClassRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={12}>
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

export default ClassTable
