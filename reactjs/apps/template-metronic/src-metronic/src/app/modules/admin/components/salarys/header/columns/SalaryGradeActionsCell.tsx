import React from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteSalaryGrades} from '../../../../redux/SalaryGradesCRUD'
import {useSalaryGradeContext} from '../../SalaryGradeContext'
// import {deleteSalaryGrade} from '../../../../redux/SalaryGradeCRUD'
interface Props {
  index: number
}
const SalaryGradeActionsCell: React.FC<Props> = ({index}) => {
  const navigate = useNavigate()
  const salaryGradeContext = useSalaryGradeContext()
  const removeSalaryGrade = (data: any) => {
    deleteSalaryGrades(data?.id).then((res) => salaryGradeContext?.getSalaryGrades())
  }
  return (
    <div className='table-actions-cell d-flex justify-content-center'>
      <i
        className='fas fa-edit mx-3'
        onClick={() => {
          navigate(`/admin/salaryGradeForm`, {
            state: {isCreate: false, data: salaryGradeContext?.salaryGrades[index]},
          })
        }}
      ></i>
      <i
        className='fa fa-trash'
        onClick={() => removeSalaryGrade(salaryGradeContext?.salaryGrades[index])}
      ></i>
    </div>
  )
}

export default SalaryGradeActionsCell
