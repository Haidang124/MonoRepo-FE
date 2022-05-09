import React, {useEffect, useState} from 'react'
import {PositionModel, positionStatuses} from '../../models/PositionModel'
import edit from '../../../../../assets/images/edit.png'
import remove from '../../../../../assets/images/delete.png'
import {Table} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {usePositionContext} from './PositionContext'
import {deletePosition, findPositions} from '../../redux/PositionCRUD'

const PositionTable = () => {
  const {params, departments} = usePositionContext()
  const navigate = useNavigate()

  const [positions, setPositions] = useState<PositionModel[]>([])

  useEffect(() => {
    findPositions(params).then((value) => {
      setPositions(value.data.items)
    })
  }, [params])
  const removePosition = (id: string) => {
    deletePosition(id).then((value) => {
      findPositions(params).then((value) => {
        setPositions(value.data.items)
      })
    })
  }
  return (
    <Table striped bordered hover>
      <thead className='text-center' style={{backgroundColor: '#f2f2f2'}}>
        <tr>
          <th style={{width: '5%'}}>STT</th>
          <th style={{width: '23%'}}>CHỨC VỤ</th>
          <th style={{width: '12%'}}>TRẠNG THÁI</th>
          <th style={{width: '12%'}}>PHÒNG BAN TRỰC THUỘC</th>
          <th style={{width: '12%'}}>QUẢN LÝ PHÒNG BAN</th>
          <th style={{width: '12%'}}>NHÂN SỰ</th>
          <th style={{width: '12%'}}>TÁC VỤ</th>
        </tr>
      </thead>
      <tbody>
        {positions?.length > 0 ? (
          positions.map((s, i: number) => (
            <tr key={i}>
              <td className='text-center'>{i + 1}</td>
              <td>{s.name}</td>
              <td className='text-center'>
                {positionStatuses.find((ps) => ps.value === s.status)?.label}
              </td>
              <td className='text-center'>
                {departments.find((d) => d.id === s.departmentId)?.name}đ
              </td>
              <td className='text-center'>{s.isManagerDepartment ? 'Có' : 'Không'}</td>
              <td className='text-center'>{s.employeeNumber}</td>
              <td className='text-center'>
                <div>
                  <img
                    src={edit}
                    alt='edit'
                    onClick={() => {
                      navigate(`/admin/positionDetail`, {state: s.id})
                    }}
                  />
                  <img src={remove} alt='remove' onClick={() => removePosition(s.id as string)} />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr className='text-center'>
            <td colSpan={8}>Chưa có dữ liệu!</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default PositionTable
