import {KTSVG} from '../../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import ExaminationFilter from './ExaminationFilter'
import { useExaminationContext } from '../ExaminationContext'
import { useState } from 'react'
import { getExaminationsFromParams } from '../../../redux/ExaminationCRUD'

const ExaminationHeader = () => {
  const{setExaminations} = useExaminationContext()
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const handleKeydown = (e : any) => {
   
      const data = {
        "Keyword":keyword,
      }
      console.log(data);

      getExaminationsFromParams(data).then(res => setExaminations(res.data.data))

  }
  return (
    <div className='d-flex align-items-center justify-content-between mx-6 pt-6'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Tìm kiếm kì'
          value={keyword}
          onChange={(e) => {setKeyword(e.target.value)}}
          onKeyUp={(e) => handleKeydown(e)}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <ExaminationFilter/>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            navigate(`/admin/examinationForm`)
          }}
        >
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Thêm mới
        </button>
      </div>
    </div>
  )
}

export default ExaminationHeader
