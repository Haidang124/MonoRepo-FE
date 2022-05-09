import React from 'react'
interface Props {
  index: number
  data: any
}
const SalaryGradeInfo: React.FC<Props> = ({index, data}) => {
  return (
    <div className='d-flex flex-column align-items-start justify-content-center mx-3'>
      <div>{data.salaryGrades[index].salaryGradeRate.toFixed()}</div>
      <div>{data.salaryGrades[index].basicSalary.toFixed()}</div>
      <div>{data.salaryGrades[index].dutyAllowance.toFixed()}</div>
      <div>{data.salaryGrades[index].otherAllowance.toFixed()}</div>
      <div>{data.salaryGrades[index].totalSalary.toFixed()}</div>
    </div>
  )
}

export default SalaryGradeInfo
