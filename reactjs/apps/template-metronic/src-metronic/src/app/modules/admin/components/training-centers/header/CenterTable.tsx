import { useEffect, useMemo, useState } from 'react'
import { ColumnInstance, Row, useTable } from 'react-table'
import { KTCardBody } from '../../../../../../_metronic/helpers'
import { getAllTrainingCenter } from '../../../redux/TrainingCenterCRUD'
import { Center } from '../../../models/TrainingCenterModel'
import { centerColumns } from './columns/CenterColumns'
import { CustomCenterRow } from './columns/CustomCenterRow'
import { CustomHeaderCenterColumn } from './columns/CustomHeaderCenterColumn'

const CenterTable = () => {
  const [initData, setInitData] = useState<Array<Center>>([])
  useEffect(() => {
    getAllTrainingCenter().then((res) => {
      setInitData(res.data.data)
    })
  }, [])
  const data = useMemo(() => initData, [initData])
  const columns = useMemo(() => centerColumns, [])
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
              {headers.map((column: ColumnInstance<Center>) => {
                return <CustomHeaderCenterColumn key={column.id} column={column} />
              })}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Center>, i) => {
                prepareRow(row)
                return <CustomCenterRow row={row} key={`row-${i}-${row.id}`} />
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

export default CenterTable
