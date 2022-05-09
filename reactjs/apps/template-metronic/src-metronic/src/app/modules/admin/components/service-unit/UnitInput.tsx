import React from 'react'
import {Button} from 'react-bootstrap'
import {Unit, useUnitContext} from './UnitContext'
import {createUnits, editUnits} from '../../redux/ServiceCRUD'

const UnitInput: React.FC = () => {
  const {editUnit, setEditUnit, units, setUnits} = useUnitContext()

  function handleEdit() {
    editUnits(editUnit).then((res) => {
      // const data = units.find((u: Unit) => u.id === editUnit?.id);
      setUnits([...units])
      setEditUnit(undefined)
    })
  }

  function handleCreate() {
    const param = {
      name: editUnit?.name,
      description: editUnit?.description,
    }
    createUnits(param).then((res) => {
      units.push(res.data.createdItem)
      setUnits([...units])
      setEditUnit(undefined)
    })
  }

  const handleDataChange = (e: any) => {
    const newUnit = {...editUnit} as Unit
    newUnit.name = e.target.value
    setEditUnit(newUnit)
  }

  const handleDesChange = (e: any) => {
    const newUnit = {...editUnit} as Unit
    newUnit.description = e.target.value
    setEditUnit(newUnit)
  }

  return (
    <>
      <div className='title'>
        THÔNG TIN
        {editUnit != null && (
          <Button
            size='sm'
            onClick={() => {
              editUnit.id != null ? handleEdit() : handleCreate()
            }}
          >
            {editUnit.id != null ? 'CHỈNH SỬA' : 'TẠO MỚI'}
          </Button>
        )}
      </div>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Tên đơn vị tính</label>
        <div className='col-9'>
          <input
            key={'name'}
            className='form-control'
            value={editUnit != null ? editUnit.name : ''}
            onChange={handleDataChange}
            // onKeyPress={(event) => handleKeyPress(event)}
            placeholder='Nhập tên đơn vị tính'
          />
        </div>
      </div>
      <div className='row'>
        <label className='col-3 col-form-label'>Mô tả</label>
        <div className='col-9'>
          <input
            key={'des'}
            className='form-control'
            value={editUnit != null ? editUnit.description : ''}
            onChange={handleDesChange}
            // onKeyPress={(event) => handleKeyPress(event)}
            placeholder='Mô tả chi tiết về đơn vị tính'
          />
        </div>
      </div>
    </>
  )
}

export default UnitInput
